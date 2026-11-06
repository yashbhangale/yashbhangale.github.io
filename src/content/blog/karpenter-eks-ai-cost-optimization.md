---
title: "From SageMaker to EKS: how I cut a client's model-serving bill by about 60%"
description: "Multi-model inference on shared g5.xlarge GPUs, with NVIDIA time-slicing, HTTP-driven HPA, Prometheus Adapter, and Karpenter scaling from one toward three nodes."
date: "2026-11-07"
updated: "2026-11-07"
author: "Yash Bhangale"
tags: ["Amazon EKS", "SageMaker", "Karpenter", "GPU Time-Slicing", "Prometheus", "HPA", "Cost Optimization", "MLOps"]
category: "Kubernetes Infrastructure"
pinOrder: 2
image: "/blog/images/karpenter-eks/cover.png"
imageWidth: 1600
imageHeight: 900
imageAlt: "Migration from SageMaker model instances to multi-model EKS serving with shared g5.xlarge GPUs, HTTP metrics, HPA, Prometheus Adapter, and Karpenter"
---

The biggest change in this project was where the models ran and how they shared the hardware.

The client initially used SageMaker instances to host models. I moved the serving workloads to Amazon EKS, hosted multiple models on shared GPU capacity, and connected HTTP demand to pod and node scaling. The resulting model-serving bill fell by approximately **60%**.

The EKS workers were **g5.xlarge** instances. Under normal traffic, the models usually fitted on **one GPU node**. When request demand increased, HPA created more serving pods. If those pods could not fit, they became unschedulable and Karpenter allocated another node. The intended operating range was **one warm GPU node to a maximum of three**. Two nodes were an intermediate state during increased demand, not the normal baseline or the maximum.

GPU time-slicing let multiple model-serving pods share the accelerator on a node. **HPA with Prometheus Adapter** scaled the replicas from HTTP metrics; **Karpenter** supplied the additional node capacity. Those were different parts of the same control loop.

**About the examples:** the client stays anonymous. The architecture and outcome above describe my implementation; names, manifests, sharing factors, replica limits, metric names, thresholds, and timings below are illustrative reconstructions. No client billing export, model names, account identifiers, or production configuration is included. The 60% figure describes the reported bill reduction for this model-serving setup, not an independently audited reduction in every AWS service or a saving attributable to Karpenter alone.

## 1. Understand the SageMaker baseline before replacing it

I started with the existing model-serving setup on SageMaker. The question was whether its allocation of compute matched how these models were actually used, including the periods between requests.

This is a comparison of two configurations in one engagement. SageMaker supports several hosting and scaling patterns; the result does not imply that every SageMaker deployment requires dedicated idle capacity or that EKS is inherently cheaper.

Before a migration, I want an inventory of each model's image, framework, CUDA/driver requirements, model artifacts, memory footprint, startup time, and request behavior. I also check the API contract: payloads, authentication, response format, timeouts, and how a caller handles retries. Moving a model successfully means preserving its behavior for the application, not merely starting its container.

| Previous setup | EKS implementation |
| --- | --- |
| Model hosting on SageMaker instances | Containerized multi-model serving on EKS |
| Capacity and cost tied to the previous hosting configuration | Several models share GPU worker capacity |
| Previous serving/scaling configuration | HTTP metrics → Prometheus Adapter → HPA |
| Previous instance-allocation behavior | Unschedulable pods trigger Karpenter provisioning |
| Original model-serving bill | Approximately 60% lower bill after the combined changes |

The public comparison omits invoice amounts, measurement dates, request volumes, and the exact original SageMaker endpoint configuration.

## 2. Separate the three jobs in the new design

There were three different decisions to make:

1. **GPU sharing:** how multiple model processes use the accelerator already present on a node.
2. **Pod scaling:** how many replicas each model needs for the incoming HTTP load.
3. **Node scaling:** when those replicas require another EC2 worker.

![Request-driven serving architecture: HTTP traffic generates per-model metrics, Prometheus Adapter exposes them to HPA, and unschedulable replicas create demand for Karpenter-managed GPU nodes.](/blog/images/karpenter-eks/architecture.svg)

Prometheus collects metrics. Prometheus Adapter exposes selected metrics through the Kubernetes custom metrics API. HPA reads those metrics and changes the Deployment replica count. Karpenter reacts when eligible pods cannot be scheduled; it does not read an HTTP request counter and directly decide to add a GPU node.

That separation makes failures easier to locate. If request demand increases but no replicas appear, I investigate the metrics/HPA path. If replicas appear but remain unschedulable, I investigate placement and capacity. [Kubernetes HPA](https://kubernetes.io/docs/concepts/workloads/autoscaling/horizontal-pod-autoscale/) · [Prometheus Adapter](https://github.com/kubernetes-sigs/prometheus-adapter).

## 3. Pack multiple models onto the GPU without pretending memory is unlimited

I used NVIDIA GPU time-slicing so multiple model-serving pods could share a GPU. It improves access to an underused accelerator, but it does not create additional VRAM.

In this setup, `nvidia.com/gpu: 1` can represent one advertised shared allocation rather than exclusive ownership of a physical GPU. The sharing configuration determines that meaning. This needs to be clear to the people writing the pod specifications.

Time-slicing provides neither memory isolation nor the fault isolation of MIG. Models compete for the underlying hardware, and requesting extra shared allocations does not guarantee proportional compute. I validate concurrent model loading, combined VRAM demand, and tail latency before increasing the sharing factor. [NVIDIA GPU-sharing behavior](https://github.com/NVIDIA/k8s-device-plugin).

![Two boundaries on the same node: Kubernetes sees shared allocation slots, while all model processes still compete for finite physical GPU memory and execution time.](/blog/images/karpenter-eks/workload-policy.svg)

A g5.xlarge has one NVIDIA A10G GPU with 24 GB of GPU memory, 4 vCPUs, and 16 GiB of host memory. Host memory and VRAM are separate budgets. Multiple models fitting in VRAM does not prove their CPU, RAM, and storage requirements fit too. [AWS G5 specifications](https://aws.amazon.com/ec2/instance-types/g5/).

## 4. Configure and verify the device plugin

I validate the accelerated AMI, driver/runtime compatibility, and NVIDIA device-plugin installation before enabling sharing. The following GPU Operator-style configuration is an example, with **four shared allocations per physical GPU**. Four is an explanatory value; it is not the client's disclosed sharing ratio.

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: example-time-slicing
  namespace: gpu-operator
data:
  shared: |-
    version: v1
    flags:
      migStrategy: none
    sharing:
      timeSlicing:
        renameByDefault: false
        failRequestsGreaterThanOne: true
        resources:
          - name: nvidia.com/gpu
            replicas: 4
```

Use the namespace of the actual installation. The ConfigMap must be connected to the device plugin using its supported configuration mechanism. With GPU Operator, that includes its device-plugin configuration and the appropriate node configuration labels; a standalone device-plugin installation uses its own deployment/Helm settings. Creating the ConfigMap alone changes nothing. [NVIDIA configuration procedure](https://docs.nvidia.com/datacenter/cloud-native/gpu-operator/latest/gpu-sharing.html).

After configuration, I inspect node labels and advertised capacity, then run concurrent controlled model requests. Four advertised allocations on one physical GPU do not mean four GPUs, four isolated memory partitions, or four times the throughput.

## 5. Give each model a scheduling and readiness contract

Each model-serving Deployment needs a resource profile, a route onto the shared GPU pool, and a readiness check that stays false until the model can actually serve requests.

This abbreviated example shows the scheduling contract. Replace the image and resource values with a validated model deployment; the example does not include production probes, routing, credentials, or artifact access.

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: example-model-a
  namespace: model-serving
spec:
  replicas: 1
  selector:
    matchLabels:
      app: example-model-a
  template:
    metadata:
      labels:
        app: example-model-a
    spec:
      nodeSelector:
        workload-class: shared-gpu-serving
      tolerations:
        - key: dedicated
          operator: Equal
          value: gpu
          effect: NoSchedule
      containers:
        - name: model-server
          image: registry.example.com/models/model-a:replace-me
          resources:
            requests:
              cpu: 500m
              memory: 2Gi
              nvidia.com/gpu: "1"
            limits:
              memory: 4Gi
              nvidia.com/gpu: "1"
```

I distinguish host-memory limits from GPU-memory use. Kubernetes does not enforce a separate 6 GB VRAM partition because this pod requests one of four time-sliced allocations. The serving runtime and model-loading behavior must fit the shared memory budget. [Kubernetes GPU scheduling](https://kubernetes.io/docs/tasks/manage-gpus/scheduling-gpus/).

I also separate the model's AWS permissions from the node role. Access to private model artifacts, registries, and secrets belongs in the application's workload-identity design.

## 6. Expose a useful HTTP demand signal

The implementation scaled from HTTP demand using Prometheus metrics. For an inference service, I want the signal to describe pressure on that model, not every request passing through the cluster.

This illustrative query converts a counter into a per-model request rate:

```promql
sum by (namespace, pod) (
  rate(model_http_requests_total{namespace="model-serving"}[2m])
)
```

`model_http_requests_total` is an example metric name. The application must export the counter and the scrape configuration must provide trustworthy namespace/pod labels. I exclude health checks and unrelated endpoints from the demand signal and decide how errors and retries should count. A counter's cumulative value is not a current requests-per-second measurement. [Prometheus rate functions](https://prometheus.io/docs/prometheus/latest/querying/functions/).

I check concurrency, queueing, response latency, and GPU memory alongside request rate. A short request and a long-running inference can consume very different amounts of compute even when both count as one HTTP request.

## 7. Connect Prometheus Adapter to HPA

The adapter is the bridge between the observed metric and Kubernetes' custom metrics API. A chart-values-style example is:

```yaml
rules:
  custom:
    - seriesQuery: 'model_http_requests_total{namespace!="",pod!=""}'
      resources:
        overrides:
          namespace:
            resource: namespace
          pod:
            resource: pod
      name:
        matches: '^model_http_requests_total$'
        as: model_http_requests_per_second
      metricsQuery: >-
        sum(rate(<<.Series>>{<<.LabelMatchers>>}[2m]))
        by (<<.GroupBy>>)
```

This is an adapter mapping example, not the client's configuration. Its packaging depends on the chart/deployment in use, and it requires the matching series and labels in Prometheus. [Adapter configuration](https://github.com/kubernetes-sigs/prometheus-adapter/blob/master/docs/config-walkthrough.md).

Then an HPA can target that per-pod custom metric:

```yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: example-model-a
  namespace: model-serving
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: example-model-a
  minReplicas: 1
  maxReplicas: 4
  metrics:
    - type: Pods
      pods:
        metric:
          name: model_http_requests_per_second
        target:
          type: AverageValue
          averageValue: "10"
  behavior:
    scaleDown:
      stabilizationWindowSeconds: 300
```

The **10 requests/second**, four-replica ceiling, two-minute query window, and five-minute stabilization window are illustrative. Actual values need load tests for each model. `maxReplicas` limits pods for one Deployment; it is not the maximum number of GPU nodes. [HPA API reference](https://kubernetes.io/docs/reference/kubernetes-api/autoscaling/horizontal-pod-autoscaler-v2/).

I verify the metric through the custom metrics API and inspect HPA conditions before a load test. I avoid manually editing a Deployment's replica count while expecting HPA to remain its source of truth.

## 8. Provision g5.xlarge nodes when the replicas do not fit

Normal demand usually ran on one shared GPU node. As HPA added replicas, pods that could not fit on the existing nodes became unschedulable. Karpenter then allocated eligible g5.xlarge capacity.

I keep the controller on stable capacity and configure its IAM permissions, node authentication, subnet/security-group discovery, and compatible accelerated AMI. The AWS launch configuration is an `EC2NodeClass`; scheduling and lifecycle policy belong in a `NodePool`. [Installation prerequisites](https://karpenter.sh/docs/getting-started/getting-started-with-karpenter/) · [NodeClass reference](https://karpenter.sh/docs/concepts/nodeclasses/).

An illustrative pool constrained to the instance type used in the project is:

```yaml
apiVersion: karpenter.sh/v1
kind: NodePool
metadata:
  name: example-shared-gpu-serving
spec:
  template:
    metadata:
      labels:
        workload-class: shared-gpu-serving
    spec:
      nodeClassRef:
        group: karpenter.k8s.aws
        kind: EC2NodeClass
        name: example-gpu
      taints:
        - key: dedicated
          value: gpu
          effect: NoSchedule
      requirements:
        - key: node.kubernetes.io/instance-type
          operator: In
          values: [g5.xlarge]
        - key: kubernetes.io/arch
          operator: In
          values: [amd64]
        - key: karpenter.sh/capacity-type
          operator: In
          values: [on-demand]
      expireAfter: Never
  limits:
    cpu: "12"
  disruption:
    consolidationPolicy: WhenEmpty
    consolidateAfter: 5m
    budgets:
      - nodes: "1"
```

Create a valid `example-gpu` EC2NodeClass before using this template. The On-Demand choice and lifecycle settings are explanatory values, not a disclosure of the client's purchase or disruption policy.

For this single-instance-type example, three g5.xlarge nodes correspond to **12 vCPUs**. That explains the capacity target. Dynamic NodePool limit checks are eventually consistent, so this is not a strict instantaneous three-node admission guarantee. A contractual hard ceiling needs additional enforcement and testing. I also avoid using a physical-GPU count as though it were the same thing as time-sliced allocations. [NodePool limits](https://karpenter.sh/docs/concepts/nodepools/).

A dynamic pool does not acquire a one-node minimum simply from this manifest. Warm model replicas, availability policy, and any separately reserved baseline capacity determine what stays running. HPA's minimum replica is a pod-level floor; it does not reserve a particular machine or guarantee uninterrupted readiness. The one-to-three range describes the intended operating model, with one node observed under usual demand.

## 9. Test the shared-resource scheduling boundary

Time-slicing changes what the device plugin advertises. I verify how those resources appear on existing nodes and how Karpenter models a new node before the device plugin has initialized it.

I do not assume Karpenter automatically knows the configured sharing factor or the combined VRAM footprint of the models. A burst can produce a different provisioning pattern from the steady-state packing seen after initialization. I test that interaction with the pinned controller and device-plugin versions.

The evidence I look for is:

- HTTP demand grows and the correct model's HPA changes its desired replicas.
- Existing shared slots are used where the CPU, RAM, and placement rules also permit it.
- A genuinely unschedulable pod produces a provisioning decision.
- The new node joins, initializes GPU sharing, loads the model, and passes readiness.
- The application handles the transition within its latency and error targets.

A model crashing because shared VRAM is exhausted is not the same as an unschedulable pod. Karpenter does not automatically solve an application GPU-memory failure by reading a memory graph and adding a node. [Scheduling constraints](https://karpenter.sh/docs/concepts/scheduling/) · [Troubleshooting](https://karpenter.sh/docs/troubleshooting/).

## 10. Scale back without unloading useful models too quickly

Scale-in has two stages. HPA reduces surplus replicas after the demand signal falls. Karpenter can then reclaim eligible unused node capacity, subject to the configured disruption policy and workload constraints.

I consider model-download and warmup time when selecting cooldowns. Aggressive scale-in can produce repeated unload/reload cycles that save instance time while hurting user-facing latency.

The sample above uses `WhenEmpty` for a conservative demonstration. That only removes empty eligible nodes. Repacking live pods from underutilized nodes requires a separate consolidation policy and validation. [Karpenter disruption behavior](https://karpenter.sh/docs/concepts/disruption/).

I keep enough model replicas ready for the serving requirement, inspect PDBs and placement rules, and test what happens when one shared node fails. With several models on one node, a node failure can affect several services at once. A one-node usual footprint is a cost/availability decision, not proof of redundancy.

## 11. Measure the migration and sharing benefit together

The approximately **60% reduction** came after moving the serving setup from SageMaker to EKS and combining multi-model GPU sharing with request-driven pod scaling and workload-driven node provisioning.

I do not assign that percentage to Karpenter alone. Time-slicing improved how the GPU was shared; HPA adjusted the model replicas; Karpenter adjusted node capacity. The platform migration changed both the cost structure and the operational work the team owned.

![Normalized illustration of the reported bill reduction: a baseline index of 100 becomes 40 after the combined migration and serving changes. This is not an invoice or billing time series.](/blog/images/karpenter-eks/cost-comparison.svg)

```text
reduction (%) = (baseline bill - comparison bill) / baseline bill × 100
Illustrative index: (100 - 40) / 100 × 100 = 60%
```

A defensible comparison would keep equal-length windows, comparable request volume/model mix, and a consistent cost scope. For the EKS side I include worker compute, control-plane charges, storage, network paths, observability, and any other charges included in the SageMaker baseline. Discounts, changed prices, delayed work, and operational costs also need to be understood.

I track cost per successful inference alongside error rate, p95/p99 latency, model-ready time, and GPU memory pressure. Fewer instances do not automatically mean a better service. Accelerator-aware EKS cost allocation can support that analysis when configured. [AWS cost-allocation guidance](https://aws.amazon.com/blogs/aws-cloud-financial-management/improve-cost-visibility-of-machine-learning-workloads-on-amazon-eks-with-aws-split-cost-allocation-data/).

## 12. Keep observability around each control-loop stage

```bash
kubectl get hpa -n model-serving
kubectl describe hpa example-model-a -n model-serving
kubectl get --raw '/apis/custom.metrics.k8s.io/v1beta1'
kubectl get pods -n model-serving -o wide
kubectl get nodepools
kubectl get nodeclaims
kubectl get nodes -L node.kubernetes.io/instance-type,karpenter.sh/nodepool
kubectl get events -A --sort-by=.metadata.creationTimestamp
```

These commands inspect the example environment; namespace and resource names must match the real installation. I check the installed metrics API versions and controller namespace rather than assume the same names everywhere.

| Symptom | Where I investigate first |
| --- | --- |
| Requests rise but HPA reports an unknown metric | Exporter/scrape health, adapter mapping, labels, and API availability |
| HPA stays flat despite high latency | Metric choice, saturation per model, thresholds, and replica bounds |
| Desired replicas rise but pods remain unschedulable | CPU/RAM, GPU allocations, taints, affinity, pool limits, and EC2 availability |
| Pods run but models fail to load | Shared VRAM, host memory, image/runtime compatibility, and artifact access |
| A new node arrives but traffic still fails | Device-plugin readiness, model startup, probes, and routing |
| Low traffic still leaves extra nodes | Remaining replicas, PDBs, placements, and the chosen consolidation policy |
| Nodes repeatedly appear and disappear | HPA stabilization, scrape windows, warmup delay, and scale-in policy |

For current capacity-planning context, these two real AWS reference screens are from a November 2026 walkthrough. Their CPU instances and percentages are source examples, not measurements from this project or claims that I used EC2 Capacity Manager in the original implementation.

![Public AWS capacity fulfillment screen from 2026. Workload labels are redacted; source percentages are not the client's results.](/blog/images/karpenter-eks/references/capacity-fulfillment-2026.png)

![Public AWS capacity supportability screen from 2026, retaining the source's CPU-instance examples. It is not a g5.xlarge GPU availability result.](/blog/images/karpenter-eks/references/capacity-supportability-2026.png)

## What I would repeat

I would start with the model inventory and a concurrent-load test, then connect the metrics and scaling loops one stage at a time. I would verify that each model can share the hardware before increasing the advertised GPU allocations, and that a burst leads to ready inference capacity rather than only a higher pod count.

The useful outcome was a smaller usual serving footprint with room to expand: normally one g5.xlarge node, additional capacity as replicas needed it, and an intended ceiling of three nodes. The approximately 60% bill reduction came from that complete change in how the models were hosted, shared, and scaled.

## Implementation and image notes

This article reflects the author's confirmed project description: SageMaker-to-EKS migration, multiple models sharing g5.xlarge GPUs through time-slicing, HTTP-driven HPA with Prometheus Adapter, and Karpenter node provisioning. The client and production configuration remain private. The templates use current API forms reviewed on November 7, 2026 and require version-specific validation before deployment.

The cover and three diagrams are explanatory illustrations. The two console screenshots are genuine public AWS references from 2026 with workload identifiers redacted. No client screenshots, bills, fabricated dashboard values, or visible screenshot-source link lines are included. Source and redaction details remain in the project files.
