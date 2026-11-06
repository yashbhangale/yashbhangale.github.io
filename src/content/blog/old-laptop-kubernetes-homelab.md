---
title: "How my old gaming laptop became a single-node Kubernetes homelab"
description: "Ubuntu, K3s, GitOps, Cloudflare Tunnel, and Tailscale: the architecture behind my self-hosted storage, media, documents, monitoring, and AI playground."
date: "2026-11-07"
updated: "2026-11-07"
author: "Yash Bhangale"
tags: ["Homelab", "Kubernetes", "K3s", "Linux", "Cloudflare Tunnel", "Tailscale", "GitOps", "Self-Hosting"]
category: "Homelab"
image: "/blog/images/homelab-laptop/cover.png"
imageWidth: 1280
imageHeight: 698
imageAlt: "My single-node K3s homelab architecture with Cloudflare Tunnel, Tailscale administration, GitOps, and self-hosted application namespaces"
---

I started with an old gaming laptop and a fairly reasonable idea: install Linux and host a few services.

Then I added Kubernetes. Then storage, monitoring, media streaming, documents, and a local AI interface. At some point, the laptop stopped being spare hardware and became a small infrastructure project that I actually use.

Everything shares one physical machine. That makes the setup affordable and easy to experiment with. It also means a host failure takes the whole cluster down. This is my learning environment, with all the compromises that come with that.

The manifests and setup notes are in [My-HomeLab](https://github.com/yashbhangale/My-HomeLab).

## 1. Build a useful Linux host first

The host runs Ubuntu on a Ryzen 5 laptop with roughly 16 GB of RAM. Before thinking about applications, I needed reliable networking, persistent storage, SSH, and a machine that would stay awake when used as a server.

For someone repeating this, I would start with a DHCP reservation, stable disk mount paths, a dedicated administration account, and a deliberate update policy. Check temperatures and power behavior under sustained load, too. A laptop configured for occasional gaming needs different attention when it stays on for days.

I would also decide where backups go before moving personal files onto it. Another directory on the same disk is still the same failure domain.

## 2. Use K3s as the application platform

I chose **K3s** for a single-node Kubernetes cluster. It gave me the Kubernetes objects I wanted to learn without building a multi-machine control plane.

After installation, the first checks are ordinary ones:

```bash
kubectl get nodes -o wide
kubectl get pods -A
kubectl get storageclass
kubectl get pvc -A
```

Start with one small application and make sure it survives a restart before adding ten more. The [K3s requirements](https://docs.k3s.io/installation/requirements) describe the cluster baseline; the applications need additional resources.

My setup uses local storage and persistent volume claims. Kubernetes can restart a pod, but it cannot recover a failed physical disk just because a PVC exists. Databases, uploaded documents, media, and application configuration need their own backup and restore process.

## 3. Separate public access from administration

I use two different paths into the lab:

| Purpose | Path |
| --- | --- |
| Selected web applications | Public hostname → Cloudflare → Tunnel → application service |
| SSH and Kubernetes administration | My device → Tailscale → private host or API endpoint |

The tunnel connector establishes outbound connections, so this design does not require forwarding inbound web ports on my home router. The [Cloudflare Tunnel documentation](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/) covers that connection model.

A tunnel provides connectivity; it does not automatically decide who may use an application. Authentication still belongs in the application or an access policy in front of it. I keep the Kubernetes API and administrative access on the private path.

The architecture image is a logical overview. In the repository's documented setup, **cloudflared runs inside Kubernetes and routes hostnames directly to service DNS names**. Traefik is present in K3s, but it is not a required hop for those direct tunnel routes.

For a locally managed tunnel, a simplified routing example would look like this. The domain and service names are placeholders:

```yaml
ingress:
  - hostname: files.example.com
    service: http://filebrowser.filebrowser.svc.cluster.local:80
  - service: http_status:404
```

The namespace, service name, and port must match the deployed Service. Keep connector credentials out of public manifests. Test authentication from outside the home network before calling an app ready.

## 4. Put application configuration in Git

I added **Argo CD** to reconcile application manifests from Git. That gives configuration changes a history and makes it easier to see why a deployment changed.

I use **Sealed Secrets** for encrypted secret manifests. The important part is preserving the controller's recovery keys securely and understanding the encryption scope. Losing those keys can make the committed sealed values unusable during a rebuild; base64-encoded Kubernetes Secret data alone is not encryption. The [Sealed Secrets project](https://github.com/bitnami/sealed-secrets) documents that workflow.

Git stores the desired configuration. It does not contain the contents of my Nextcloud files or Paperless database. Restoring the lab means recovering both the configuration and the application data.

## 5. Add services according to what I actually need

The lab grew around practical uses:

| Area | Applications |
| --- | --- |
| Files and documents | Nextcloud, Paperless-ngx, Filebrowser |
| Media and reading | Jellyfin, Kavita |
| Home automation | Home Assistant |
| AI experiments | Open WebUI connected to a local model runtime |
| Observability | Prometheus and Grafana |
| Browser-based workspaces | Kasm Workspaces experiments |

These applications do not all have the same operational needs. A document service needs dependable data recovery. A media service needs clear mount permissions. An AI experiment needs resource limits so it does not starve the rest of the host.

Kasm's privileged or nested-container requirements also deserve separate consideration; I would not treat a browser workspace as an ordinary low-privilege web pod. The architecture includes my broader experiments, while the repository is the place to check which manifests are available to reproduce.

For Open WebUI, the user interface and the model runtime are separate components. Connecting the UI does not create GPU acceleration or guarantee that a model fits in memory.

## 6. Make failures visible and recovery boring

Prometheus and Grafana help me look at CPU, memory, disk consumption, and application behavior. I also need to inspect restarts, pending pods, and volume usage. A dashboard running on the laptop cannot notify me reliably if that same laptop loses power, so external reachability checks are a useful next layer.

The recovery exercise I recommend is small: restore one application's data somewhere safe, recreate its configuration, and confirm that it opens correctly. Then document the missing steps. A successful backup job is only part of that story.

## What this setup costs me

I am not renting an AWS or Azure machine for these services. I am still using electricity, home internet, storage, a domain, and hardware that can fail. The tradeoff works for my learning and personal use; it is not a zero-cost availability guarantee.

The real benefit has been having a place where storage permissions, DNS, GitOps, resource contention, and recovery all meet. When something breaks, I have to follow the request through my own stack and understand what happened.

If you are building something similar, the [repository](https://github.com/yashbhangale/My-HomeLab) is a starting point. Replace the environment-specific values, begin with one service, and make recovery part of the setup rather than a project for later.
