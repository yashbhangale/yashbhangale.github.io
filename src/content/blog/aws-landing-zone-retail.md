---
title: "Building an AWS landing zone for a large Indian retailer"
description: "My approach to an AWS landing zone in Mumbai: account boundaries, Control Tower, Terraform, IAM Identity Center, SCPs, shared networking, logging, and recovery."
date: "2026-11-06"
updated: "2026-11-07"
author: "Yash Bhangale"
tags: ["AWS", "Landing Zone", "Control Tower", "Terraform", "IAM Identity Center", "Cloud Security"]
category: "Cloud Infrastructure"
image: "/blog/images/aws-landing-zone/architecture-cover.png"
imageWidth: 1280
imageHeight: 853
imageAlt: "AWS landing zone reference architecture showing organizational units, IAM Identity Center, shared networking, security, logging, backups, and isolated workloads"
---

The first decision in a landing zone is usually where to draw the boundaries. Who can touch production? Who owns the network? Where does the evidence go if a workload account is compromised?

I worked on a multi-account AWS foundation for a large Indian retail enterprise. We used AWS Organizations and Control Tower for governance, Terraform for infrastructure, IAM Identity Center for workforce access, and `ap-south-1`—Mumbai—as the primary Region. This post walks through how I approach that foundation, from the account layout to the checks I want before handing an account to an application team.

**About the examples:** this is an anonymized reconstruction based on the architecture I followed, not an export of the client environment. I have redrawn the diagrams and omitted names, account IDs, domains, network ranges, policy exceptions, and operational details. The console images are genuine screenshots downloaded from public AWS walkthroughs, with visible identifiers covered using solid redaction. They come from dated 2025–2026 AWS walkthroughs, not my client environment. Original Region selections, identity-source choices, and example status values are retained; they are not claims about this implementation. Follow the current documentation for the exact setup screens. The procedures and code below are teaching examples; optional extensions are called out separately. No client console screenshots or production Terraform are included.

![A public reconstruction of the landing zone, separating organization governance, shared foundations, and workload accounts.](/blog/images/aws-landing-zone/overview.svg)

## The order I use

There is a dependency behind this sequence: access and evidence need to exist before workloads arrive.

1. Agree on ownership, Regions, and account boundaries.
2. Establish the management account and Control Tower baseline.
3. Set up workforce access and test recovery access.
4. Centralize audit evidence and security administration.
5. Introduce SCPs through a test OU.
6. Build the network and resource-sharing model.
7. Automate account baselines with Terraform.
8. Validate monitoring, restores, cost allocation, and handover.

## 1. Start with an account contract

Before provisioning, I want an answer to five questions for every account: who owns it, what runs there, who pays for it, what data it can hold, and what happens when it is retired.

For a retail platform, I also ask about dependencies on corporate systems and business-critical operating periods. A development change should not have an easy path into production just because both teams need the same internal DNS server.

My account-request template looks like this. These are fictional values:

```yaml
account_name: retail-orders-uat
environment: uat
owner_group: orders-platform
cost_center: example-retail-engineering
data_classification: internal
primary_region: ap-south-1
network_profile: private-workload
backup_tier: standard
requested_access: application-operator
```

I keep actual email addresses, account IDs, IP allocations, and approved access groups in the private inventory. A budget owner and an operational owner are both required; they are not always the same person.

**Exit check:** the account request has named owners, an approved OU, and a network and data classification. “We will decide later” means the account is not ready for applications.

## 2. Design OUs around policy boundaries

I use accounts for isolation and OUs to apply common governance. An OU is not a network segment, and moving an account between OUs is a policy change.

This is the simplified public layout:

```text
Organization root
├── Management account
├── Security OU / service-integration OU
│   ├── Audit / Security Tooling account
│   ├── Log Archive account
│   └── Backup account, when used by the selected integration
├── Infrastructure OU
│   ├── Network / Shared Services account
│   └── Tooling / Observability account(s)
├── Workloads OU
│   ├── Non-production OU → Dev and UAT accounts
│   └── Production OU → Production accounts
├── Sandbox OU
└── Suspended OU
```

I keep production separate from non-production so that access, controls, and deployment approvals can differ. Sandboxes have their own spending limits and connectivity rules. The suspended OU is for controlled retirement; it is not the first response to a live security incident.

The reference sketch separates security and log archive into different OUs. I treat that as a logical separation of duties, not a layout to copy blindly into Control Tower. **Version matters:** current Control Tower 4.0 documentation allows a custom OU structure, but accounts used by its service integrations must sit in the same designated OU directly under root. Earlier landing-zone versions have different constraints. I check the selected version before creating or moving foundation accounts. [AWS: how Control Tower works](https://docs.aws.amazon.com/controltower/latest/userguide/how-control-tower-works.html).

## 3. Establish Control Tower without duplicating its resources

The management account is where I establish organization governance. I keep application workloads out of it, protect root access with MFA, remove root access keys if any exist, and restrict routine administrative access.

My setup sequence is:

1. Confirm organization prerequisites, account email ownership, quotas, and the billing contact.
2. Select Mumbai as the home Region and agree on the governed Regions. A home Region is a durable choice, so I settle it early.
3. Configure the required shared accounts and selected service integrations for the landing-zone version.
4. Establish the OU structure and apply the required governance/baselines to the target OUs and accounts.
5. Provision a disposable non-production account before onboarding business workloads.
6. Check Control Tower status and confirm the baseline actually exists in that account.

![Control Tower deployment dashboard from a 2025 AWS walkthrough. Counts and confirmation messages belong to the public example, not this project.](/blog/images/aws-landing-zone/references/control-tower-dashboard-2025.png)

In the console, I start at **Control Tower → Set up your landing zone**, check the Region selector, and work through the configuration before reviewing the launch permissions. The exact screens depend on the landing-zone version. [AWS: configure and launch a landing zone](https://docs.aws.amazon.com/controltower/latest/userguide/step-two.html).

I define a resource-ownership boundary for Terraform: Control Tower owns its managed resources; my modules own the additional network, access, security, and operational configuration. Two tools managing the same trail, recorder, or IAM role is an avoidable source of drift.

I use the [Control Tower shared-account documentation](https://docs.aws.amazon.com/controltower/latest/userguide/what-shared.html) to confirm each account's purpose, and its [resource-modification guidance](https://docs.aws.amazon.com/controltower/latest/userguide/getting-started-guidance.html) before adding custom controls around managed resources.

### Review centralized root access separately

For a new organization today, I also review centralized root access for member accounts as a distinct security decision. It can reduce the need to maintain long-lived root credentials in every account, but it needs its own authorization and recovery process. This is an optional current capability to assess, not a claim about the original project configuration.

![IAM centralized root access screen from a 2026 AWS walkthrough. This capability is separate from IAM Identity Center workforce access.](/blog/images/aws-landing-zone/references/root-access-management-2026.png)

**Exit check:** a newly provisioned test account appears in the intended OU, has the expected baseline, and reports healthy governance status.

## 4. Give people access through IAM Identity Center

I separate workforce access from application access. People use IAM Identity Center and temporary sessions. Applications use workload roles; a human's SSO credentials do not become an application's deployment secret.

![Workforce sign-in flows through a corporate identity provider and IAM Identity Center; group assignments select permission sets and account roles. SCPs still limit the resulting session.](/blog/images/aws-landing-zone/identity.svg)

The external identity-provider brand is deliberately unspecified here. The federation pattern is:

![IAM Identity Center dashboard from a 2026 AWS walkthrough, with instance, organization, portal, and operator details redacted. The source uses the built-in directory; the next screens show external federation.](/blog/images/aws-landing-zone/references/identity-dashboard-2026.png)

1. Enable the organization instance of IAM Identity Center in the agreed Region.
2. Configure the identity source. For an external provider, exchange SAML metadata and configure provisioning such as SCIM.
3. Provision approved users and groups before assigning account access.
4. Create permission sets by job function, then assign groups to accounts.
5. Enforce MFA and sign-in policy at the chosen identity source.
6. Test both onboarding and removal of access, including the behavior of already-issued sessions.

SAML handles sign-in; SCIM handles user/group provisioning. They solve different problems. AWS describes this flow in [External identity providers](https://docs.aws.amazon.com/singlesignon/latest/userguide/manage-your-identity-source-idp.html).

In **Settings → Identity source**, I check the authentication and provisioning methods independently. The 2025 references below come from an external-provider tutorial; its provider choice is not a statement about the retail environment. I exchange metadata through the private configuration process and keep portal URLs, issuer identifiers, and SCIM bearer tokens out of public notes.

![Identity Center Settings from a 2025 AWS walkthrough: external identity provider, SAML 2.0 authentication, and SCIM provisioning. Portal, issuer, and store identifiers are covered.](/blog/images/aws-landing-zone/references/identity-source-2025.png)

![Configure external identity provider screen from a 2025 AWS walkthrough. Portal, ACS, and issuer URL values are fully redacted.](/blog/images/aws-landing-zone/references/identity-metadata-2025.png)

| Example permission set | Intended use | Boundary I check |
| --- | --- | --- |
| SecurityAudit | Investigate configuration and findings | Read access does not automatically mean unrestricted access to business data |
| NetworkOperator | Maintain approved network resources | No blanket production application administration |
| ApplicationOperator | Operate an application in assigned accounts | Scope services, resources, and environments explicitly |
| BillingReadOnly | Review spend and allocation | No infrastructure changes |
| PlatformAdmin | Time-bound platform administration | Separate approval, short session, and audit trail |

These are role descriptions, not a recommendation to attach `AdministratorAccess` to every group. I review the actual policies, session durations, and assignment list.

![Permission-set detail from a 2026 AWS walkthrough. The name and ARN are redacted; session duration and policy-attachment areas remain visible. This is a UI reference, not a recommended permission policy.](/blog/images/aws-landing-zone/references/identity-permission-set-2026.png)

The account-access workflow is **IAM Identity Center → AWS accounts → select account → Assign users or groups**. I select the group and permission set, then review the complete assignment together. The same permission-set name in the wrong account is still the wrong access. [AWS: assign account access](https://docs.aws.amazon.com/singlesignon/latest/userguide/assignusers.html).

![AWS accounts assignment view from a 2026 AWS walkthrough. Organization, account, instance, and permission-set identifiers are redacted.](/blog/images/aws-landing-zone/references/identity-account-assignment-2026.png)

I check group membership as well as the assignment itself. For externally provisioned groups, I make membership changes at the identity source, verify SCIM synchronization, and then test the resulting account access. Removing an assignment and revoking an already-issued session are different operations.

![Identity Center group membership view from a 2026 AWS walkthrough. Group, instance, and user identity values are covered.](/blog/images/aws-landing-zone/references/identity-group-membership-2026.png)

For CLI access, a developer can use an SSO profile:

```bash
aws configure sso --profile retail-dev
aws sso login --profile retail-dev
aws sts get-caller-identity --profile retail-dev
```

The last command is a small habit that prevents expensive mistakes: I check which account and role I am using before changing anything.

![AWS access portal from a 2025 walkthrough, with account identifiers and emails redacted. The source role labels are examples and are not access recommendations.](/blog/images/aws-landing-zone/references/identity-access-portal-2025.png)

For MFA, I apply policy at the active identity source and test a fresh sign-in, not only an already authenticated browser session. I also check session duration, device changes, user disablement, and the emergency-access runbook. Application assignments and AWS account assignments are reviewed separately; granting one does not imply the other.

I also require a separately secured, monitored emergency-access path. It needs a test and an owner; a recovery document that depends on the failed identity provider is not enough. Normal access removal and emergency session revocation are separate runbooks.

## 5. Make audit evidence independent of workload administrators

I keep the place where evidence is stored separate from the place where workloads run. A workload administrator should not be able to erase the organization's audit history.

The logging baseline includes organization-level API activity, configuration history where enabled, and explicitly selected workload logs. I check the existing Control Tower integration first, then fill the gaps rather than creating a second identical trail.

For CloudTrail, the implementation checks are concrete:

1. Verify organization scope, multi-Region coverage, and the management-event settings.
2. Check delivery into the intended Log Archive S3 bucket.
3. Validate bucket and KMS permissions, including the AWS service's ability to deliver encrypted logs.
4. Enable and verify log-file validation for the trail.
5. Generate an identifiable test event in a member account and find the delivered record.
6. Select data events for sensitive resources deliberately; do not assume management events include object-level access.

An organization trail can exist while delivery fails, so the green resource icon is not my acceptance test. [AWS: creating an organization trail](https://docs.aws.amazon.com/awscloudtrail/latest/userguide/creating-trail-organization.html).

![CloudTrail trail-attributes screen from a 2025 AWS walkthrough. Names, storage path/account ID, and KMS value are covered. Organization scope is unchecked in the source; my organization-trail design requires it to be configured appropriately.](/blog/images/aws-landing-zone/references/cloudtrail-attributes-2025.png)

I treat AWS Config aggregation as a query layer, not as a substitute for recording. Recorders, delivery, supported resource types, and Region coverage still need checking in the source accounts. For VPC Flow Logs and application logs, I define destination, retention, and operational ownership separately.

For retention-sensitive archives, S3 Object Lock is an additional design choice. It requires versioning and protects specific object versions; compliance and governance modes have different implications. I would test this on a separate, approved archive design rather than alter a Control Tower-managed bucket casually. [AWS: S3 Object Lock](https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-lock.html).

## 6. Delegate security administration, then prove coverage

I want the security team to investigate without using the management account for everyday work. Delegated administration provides that separation, but each service has its own setup.

For GuardDuty, I designate the security account, configure organization membership and auto-enable behavior, and verify the required protection plans in each approved Region. It is Regional: enabling the administrator in Mumbai does not establish coverage everywhere. [AWS: GuardDuty with Organizations](https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_organizations.html).

![GuardDuty console from a 2025 AWS walkthrough. The zero counts describe that public demo, not this project or a guarantee that an environment is secure.](/blog/images/aws-landing-zone/references/guardduty-2025.png)

For Security Hub CSPM, I configure the delegated administrator, home and linked Regions, and central configuration policies. Then I check both current accounts and the onboarding behavior of new ones. Aggregating findings and centrally configuring controls are different tasks. [AWS: Security Hub CSPM central configuration](https://docs.aws.amazon.com/securityhub/latest/userguide/central-configuration-intro.html).

![Security Hub summary from a 2025 AWS walkthrough. Scores and standard versions belong to the source example and are not project results or certification evidence.](/blog/images/aws-landing-zone/references/security-hub-2025.png)

Inspector for supported workloads, Macie for selected S3 data, IAM Access Analyzer, and Firewall Manager are extensions I scope to the workload and operating model. I do not enable every service just to fill a diagram. Someone needs to own the findings, coverage gaps, recurring cost, and response process. Detective and Audit Manager can support investigation and evidence workflows where required; neither makes the environment compliant by itself.

**Exit check:** a documented test finding reaches the intended responder, and there is a runbook for what they do next.

## 7. Introduce SCPs through a policy test OU

An SCP limits permissions; it does not grant them. I still need IAM policies and resource policies. SCPs also do not constrain the management account or service-linked roles, which is another reason to keep the management account quiet. [AWS: SCP behavior and testing](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps.html).

My rollout order is test OU, a small non-production group, then the intended broader scope. I exercise account provisioning, deployments, logging, backups, and the emergency-access path before promotion.

This deliberately small example denies a member-account principal from leaving the organization. It is an illustration, not the client's policy bundle:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "DenyMemberLeavingOrganization",
      "Effect": "Deny",
      "Action": "organizations:LeaveOrganization",
      "Resource": "*"
    }
  ]
}
```

In **AWS Organizations → Policies → Service control policies**, I review the policy document and its attachment target separately. The actual attachment and negative tests happen in the test OU first. I also verify the corresponding Organizations API events in CloudTrail, including who changed the policy and when.

![CloudTrail policy-change audit screen published in a 2026 AWS walkthrough, showing 2025 Organizations events. User, key, event, request, and network identifiers are redacted. This is audit evidence from the source, not an SCP editor or this project.](/blog/images/aws-landing-zone/references/scp-cloudtrail-audit-2026.png)

Other controls I evaluate include preventing unauthorized changes to audit infrastructure, limiting unsupported Regions, and protecting backup configuration. Each has exceptions and service dependencies to test. A generic deny on all logging or KMS changes can break the very automation meant to protect the account.

For Region restrictions, I prefer the supported Control Tower Region-deny controls where appropriate. A homemade `aws:RequestedRegion` deny needs careful treatment of global services and cross-Region behavior. I also verify the inherited allow path: removing `FullAWSAccess` without a replacement allow strategy can disable much more than intended.

I do not promise that one tagging SCP enforces every resource tag. Services differ in create APIs and condition-key support. I combine IaC validation, tag policies where supported, and detective checks.

**Exit check:** prohibited actions fail in a test account while normal platform operations still succeed. I record the API action and expected denial, not just a screenshot of the attached policy.

## 8. Build networking around an explicit connectivity matrix

Before routing, I write down which environments may communicate. “Connected to the transit gateway” should never mean “reachable from every other account.”

| Source | Destination | Example policy |
| --- | --- | --- |
| Dev | Production | Denied by default |
| UAT | Production | Denied unless an approved dependency exists |
| Workloads | Shared DNS and approved platform services | Only the required destinations and ports |
| Corporate network | Private applications | Approved hybrid routes and security rules |
| Workloads | Internet | Approved egress path with inspection and logging |

![A logical Mumbai network view: isolated workload spokes attach to segmented Transit Gateway route tables, with separate hybrid access, inspected egress, DNS, and private AWS service access.](/blog/images/aws-landing-zone/network.svg)

My implementation sequence is:

1. Reserve non-overlapping VPC CIDRs through IPAM or an approved allocation register. Check corporate and recovery networks too.
2. Create the network/shared-services foundation and workload VPCs across multiple Availability Zones.
3. Create Transit Gateway with deliberate route-table association and propagation settings.
4. Attach workload VPCs and the approved hybrid connection; configure both VPC routes and TGW routes.
5. Separate production, non-production, and shared-service reachability.
6. Add the inspection and egress path, then validate return routing and failure behavior.
7. Test DNS, security groups, NACLs, and connectivity with the workload owner.

Direct Connect and Site-to-Site VPN are connectivity options, not a claim that every site has both. I choose the actual pattern with the network team, including routing, resilience, capacity, and failover requirements.

For a VPC-based stateful inspection design, appliance mode on the appropriate TGW attachment and symmetric routing matter. The public diagram is a logical path, not an AZ-by-AZ route-table specification. [AWS: Transit Gateway routing](https://docs.aws.amazon.com/vpc/latest/tgw/how-transit-gateways-work.html) and [Network Firewall routing](https://docs.aws.amazon.com/network-firewall/latest/developerguide/vpc-config-route-tables.html) explain the underlying behavior.

I trace a packet outward and back before calling the network ready. That includes a denied path. If Dev can reach Production because of route propagation, the security group is doing more work than the network design intended.

## 9. Share infrastructure deliberately with AWS RAM

I use AWS Resource Access Manager for resources that support it, such as a shared Transit Gateway and approved Resolver rules. I avoid sharing to the whole organization when a smaller set of accounts or OUs is sufficient.

The sequence is to enable organization sharing through RAM, create a Regional resource share, select the supported resource, restrict the principals, then verify consumer access. With organization sharing enabled, internal shares do not need invitation acceptance. [AWS: sharing resources with RAM](https://docs.aws.amazon.com/ram/latest/userguide/getting-started-sharing.html).

A minimal Terraform teaching example looks like this. The organization integration and the TGW already exist; the ARN inputs are supplied privately:

```hcl
variable "transit_gateway_arn" {
  type = string
}

variable "workload_ou_arn" {
  type = string
}

resource "aws_ram_resource_share" "workload_network" {
  name                      = "example-workload-transit"
  allow_external_principals = false
}

resource "aws_ram_resource_association" "transit" {
  resource_arn       = var.transit_gateway_arn
  resource_share_arn = aws_ram_resource_share.workload_network.arn
}

resource "aws_ram_principal_association" "workloads" {
  principal         = var.workload_ou_arn
  resource_share_arn = aws_ram_resource_share.workload_network.arn
}
```

Sharing the TGW does not create a VPC attachment, install routes, or authorize application traffic. Those are separate steps with separate owners.

I also avoid treating “shared services” as one mechanism. ECR commonly uses repository policies for cross-account access. S3 and KMS have their own resource policies. Private hosted-zone associations need their supported cross-account workflow. Resolver forwarding rules can be shared through RAM and associated with the consumer VPCs. [AWS: managing Resolver rules](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/resolver-rules-managing.html).

## 10. Add private endpoints and a workable DNS model

A private subnet still needs dependencies. I inventory image pulls, Systems Manager, logging, STS, secrets, and artifact access before removing internet egress.

I use S3 and DynamoDB gateway endpoints in the VPCs that need them. Interface endpoints use PrivateLink and require attention to security groups, DNS, endpoint policies, and Regional service availability. Centralizing interface endpoints is possible, but it adds routing and DNS work; it is not a free default. Gateway endpoints are not a shared hub service for spoke VPCs over TGW. [AWS: S3 gateway endpoint limitations](https://docs.aws.amazon.com/vpc/latest/privatelink/vpc-endpoints-s3.html).

For hybrid DNS, I document which domains resolve in AWS and which forward to corporate resolvers. I test from each workload environment and in both directions where required. Successful IP connectivity with broken DNS is still a broken application environment.

Systems Manager Session Manager is my preferred administrative-access pattern when the workload supports it. I verify instance roles, the SSM agent, endpoint connectivity, and session logging. It does not work merely because an SSM box appears on the architecture diagram.

## 11. Turn the baseline into a repeatable Terraform workflow

I used Terraform for the infrastructure layer. In this walkthrough, Control Tower Account Factory provides the account foundation and Terraform applies the additional baseline through reviewed automation. AFT is an alternative for a larger account-vending workflow, with its own dedicated management account and prerequisites. [AWS: deploying AFT](https://docs.aws.amazon.com/controltower/latest/userguide/aft-getting-started.html).

### Native Control Tower account creation

The recent console reference below shows **Control Tower → Account factory → Create account**. I review the unique account email, display name, access configuration, and destination OU before creating an account. This is the native Control Tower route; the Service Catalog route described next has its own screens.

![Control Tower Create account form from a 2025 AWS walkthrough. Operator, account, user, email, and OU values are redacted. This is not the Service Catalog product-launch screen.](/blog/images/aws-landing-zone/references/account-factory-create-2025.png)

### Following the Service Catalog Account Factory path

For a manual account request through the standard Service Catalog product, I use the Control Tower home Region, open **Service Catalog → Products**, select **AWS Control Tower Account Factory**, and choose **Launch product**. The provisioning identity needs the appropriate access to the product and its launch configuration.

Next I enter the provisioned-product name, account name, unique account email, and target OU. For configurations that use the SSO parameters, I review the initial user's details carefully because that user receives administrative access. Those values stay in the private account-request record.

I review the final inputs before launch, then follow the provisioned product and Control Tower account status through completion. In this documented flow, I leave TagOptions and Notifications unset and do not create a Service Catalog resource plan. I confirm the account baseline before applying the additional Terraform configuration. [AWS: provision an Account Factory account through Service Catalog](https://docs.aws.amazon.com/controltower/latest/userguide/provision-as-end-user.html).

![An account request moves through approval, Control Tower provisioning, Terraform customization, evidence checks, and handover, with failed checks returning to remediation.](/blog/images/aws-landing-zone/account-lifecycle.svg)

I keep organization policies, shared networking, account baselines, and application infrastructure in separate states or clearly separated deployment boundaries. A workload deployment should not need permission to rewrite the organization's SCPs.

My baseline modules cover approved tags, security-service enrollment, operational access, log retention, budgets, backup selection, and the account's network profile. Provider versions are pinned and reviewed. State is encrypted, access-controlled, versioned, and locked using the selected backend's supported mechanism. State can contain sensitive values, so it is not a build artifact to upload publicly.

I treat encryption and secrets as part of that baseline. For a cross-account flow, I review the KMS key policy as well as the caller's IAM policy; an S3 or backup permission alone may not be sufficient. I separate key administration from routine key use, protect required keys from accidental deletion, and keep application secrets in the approved secrets service with scoped access and a rotation owner. Certificate issuance and renewal have an owner too. These dependencies need to survive recovery, not just initial deployment.

For CI, I prefer short-lived federation rather than stored AWS access keys. With GitHub Actions OIDC, the trust policy must restrict audience and subject to the intended repository and branch or protected environment. Separate the plan role from the production apply role and put approval at the environment boundary. [AWS: configuring GitHub OIDC roles](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_create_for-idp_oidc.html).

The pipeline is intentionally ordinary: format and validate, scan, generate a plan, review it, apply under the right role, and run acceptance checks. I keep a record of who approved the change and which commit produced it.

## 12. Make monitoring useful to the team on call

I distinguish security evidence from operational telemetry. The Log Archive is not the place where every engineer gets unrestricted access to application logs.

For CloudWatch cross-account observability, I configure the monitoring-account sink and source-account links, limiting what is shared. OAM sharing is Regional and lets the monitoring account view source telemetry; it does not automatically copy every log into a central S3 archive. [AWS: CloudWatch cross-account observability](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-Unified-Cross-Account.html).

I start with alerts for failed log delivery, security findings, failed backups, network failures, and application health. Each needs an owner, a destination, and a response. Prometheus, Grafana, and specialist log analytics are optional extensions when the workload needs them. I avoid deploying several observability stacks before deciding which one the team will operate.

## 13. Design recovery, then restore something

My first backup question is what the business needs back and how soon. Those answers determine RPO, RTO, retention, recovery account, and whether a second Region is needed.

The implementation sequence is to classify workloads, select supported resources, define plans and retention, configure vault and KMS policies, enable required organization features, and test copies and restores. Cross-account and cross-Region support varies by resource and Region. I check the [AWS Backup feature matrix](https://docs.aws.amazon.com/aws-backup/latest/devguide/backup-feature-availability.html) before promising a copy pattern.

Vault Lock can protect recovery points. Governance and compliance modes differ, and compliance mode becomes irreversible after its grace period. I use disposable test vaults and approved retention settings before locking a production design. [AWS: Backup Vault Lock](https://docs.aws.amazon.com/aws-backup/latest/devguide/vault-lock.html).

Where the selected Control Tower version and design use its AWS Backup integration, I review the central backup account, backup administrator, and KMS requirements before enabling it. This is an integration option; it does not replace workload-specific backup and restore testing.

![Control Tower AWS Backup configuration from a 2025 AWS walkthrough, showing central backup account, administrator, and KMS inputs. The source fields are empty.](/blog/images/aws-landing-zone/references/backup-integration-2025.png)

The recovery Region is intentionally unspecified here. A secondary Region in a diagram is not proof of disaster recovery. The runbook also needs network routes, DNS, identity, quotas, encryption keys, images, secrets, dependency ordering, and a failback plan.

**Exit check:** restore a representative resource into an isolated environment, verify application-level integrity with its owner, and record the elapsed recovery time. A successful backup job alone cannot demonstrate the RTO.

## 14. Put ownership into the bill

I standardize a small tag set: owner, environment, application, cost center, and data classification where appropriate. I activate the relevant cost-allocation tags, define account budgets, and route anomaly notifications to a real owner.

I review baseline costs before adding workloads: Config recording, security services, log ingestion and retention, NAT gateways, TGW processing, firewall endpoints, and interface endpoints can all contribute. I compare centralized and distributed designs using the actual traffic model instead of assuming centralization is always cheaper.

Budgets are notifications unless explicit budget actions are configured. They are not a guaranteed real-time spending cap. Sandboxes need lifecycle controls and clear ownership as well as email alerts. [AWS: managing costs with Budgets](https://docs.aws.amazon.com/cost-management/latest/userguide/budgets-managing-costs.html).

## 15. Accept the account with evidence

This is the handover checklist I would use with a workload team. It is a reusable acceptance plan, not a claim that the public post contains the client's test results.

| Area | Evidence I want |
| --- | --- |
| Governance | Correct OU, healthy baseline, and documented policy inheritance |
| Identity | Intended group can enter the right account; unauthorized access is denied; removal and recovery procedures tested |
| Guardrails | Safe negative tests show the expected denials without breaking normal automation |
| Audit | A known member-account event arrives in the archive; delivery and encryption are healthy |
| Security | Required account/Region coverage is visible and a test finding reaches its responder |
| Network | Allowed flows work, denied flows fail, and DNS and return paths are verified |
| Sharing | Only intended principals can use shared resources; attachments and routes are checked separately |
| Recovery | Representative restore completed with integrity checks and recorded timings |
| Operations | Alerts reach the on-call destination and have usable runbooks |
| Cost | Owner, budget destination, tags, and baseline cost review are recorded |
| Automation | Reviewed plan, successful apply, and a clean follow-up plan or explained drift |

## 16. Keep the landing zone healthy after handover

An account is not finished when it is created. I schedule access reviews, watch drift, review control changes, and test new baseline versions in non-production first. Exceptions have an owner, a reason, a scope, and an expiry date.

For retirement, I remove ordinary access, review data and retention obligations, detach shared resources safely, and check ongoing charges before closure. Moving an account into a suspended OU does not delete its resources, revoke every existing session, or guarantee zero spend. Incident containment has its own tested procedure so that responders do not lock out the evidence collection path.

The useful outcome for me is straightforward: a team can request an account, receive predictable access and networking, and know where its logs, alerts, backups, and costs go. The diagrams explain the shape. The repeatable baseline and the acceptance checks are what make that shape operational.

## References and diagram notes

Technical behavior and screenshot sources were reviewed on November 7, 2026. Service availability, Control Tower versions, and organizational requirements should be checked again before implementation. This article describes an engineering approach; it does not assert a compliance certification or publish client-specific outcomes.

The four architecture diagrams are original illustrations. The 15 console screenshots come from public AWS walkthroughs published in 2025–2026, with source image URLs also dated in that period. They cover Control Tower, account creation, IAM Identity Center, centralized root access, CloudTrail, policy-change auditing, GuardDuty, Security Hub, and backup integration. The captions distinguish public reference screens from project implementation details.

Identifiers are covered with opaque masks. No account values, status messages, Region selections, or permission policies have been fabricated. Source status counts and example policies are not evidence of this project's results. The Identity Center screenshots span both built-in-directory and external-provider tutorials; their captions distinguish those contexts. The Service Catalog and RAM procedures remain documented in text and code rather than using an unrelated or older screen as a substitute.

Screenshot sources and redaction details are retained in the project files. Screenshots were retrieved on November 7, 2026. An article's publication or asset date does not establish the exact console build or capture date; for example, the 2026 permission-set reference visibly contains a November 2025 creation date. Open any image in a new tab for full-size inspection.
