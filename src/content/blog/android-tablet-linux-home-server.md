---
title: "Turning my old Android tablet into a small Linux home server"
description: "How I repurposed a Maharashtra-issued tablet with Android 13, Termux, Debian userland, SSH, and Tailscale, then deployed Pi-hole and AdGuard Home for DNS filtering."
date: "2026-11-07"
updated: "2026-11-07"
author: "Yash Bhangale"
tags: ["Homelab", "Android", "Termux", "Debian", "Tailscale", "Self-Hosting", "DNS", "Pi-hole", "AdGuard Home"]
category: "Homelab"
image: "/blog/images/android-tablet-server/cover.png"
imageWidth: 800
imageHeight: 848
imageAlt: "My repurposed Acer Android tablet showing a terminal session with Android 13, aarch64, and a PRoot-Distro environment"
---

Before buying another small computer for the homelab, I looked around the house. There was already one sitting in a drawer.

It was the tablet I received through a Maharashtra government scheme after passing 10th standard. Years later, it was mostly unused. I decided to see whether it could handle a small server role instead of becoming another forgotten device.

The experiment ended up involving a custom Android 13 ROM, a stripped-down application set, Termux, a Debian environment, SSH, and Tailscale. I also completed the Pi-hole and AdGuard Home deployments, giving the tablet a practical job: DNS filtering for my home network.

This post covers the setup and the deployment considerations for using an Android device as a DNS server. The terminal photo shows the Linux userland environment; the DNS services are a separate part of the completed setup.

## 1. Work out what the tablet can realistically do

The device in the photo is an Acer One 8 T9-422L with an ARM-based processor and roughly 3 GB of usable memory reported in that session. That is enough to make small services interesting, but it is not a reason to move my entire Kubernetes lab onto it.

I wanted a narrow purpose: remote shell access, lightweight Linux tooling, and DNS filtering. Heavy workloads would compete with Android for memory and battery life.

Before repurposing old hardware, I would check battery condition, charging behavior, Wi-Fi reliability, and storage health. A tablet that overheats or disconnects overnight is a poor choice for the network's only resolver, regardless of whether it can install a package.

## 2. Separate the Android work from the Linux environment

My experiment included rooting the device and installing a custom Android 13 ROM, then removing applications and services I did not need.

Those are device-specific changes. The exact model, bootloader, firmware, and recovery image matter, so I am not presenting a generic flashing command that readers should apply to any tablet. Keep a recovery path and a backup before changing firmware.

Rooting Android and opening a root shell inside a Linux userland are also different things. The photo shows `PRoot-Distro` and a `root@localhost` prompt. That prompt alone does not demonstrate root privileges over the Android host.

## 3. Add Termux and a Debian userland

Termux gives me a useful terminal and package environment on Android. A Debian userland adds a familiar set of Linux tools inside that setup.

For a PRoot-based route, the conceptual stack is:

```text
Tablet hardware
    ↓
Android kernel and operating system
    ↓
Termux
    ↓
PRoot-managed Debian userland
    ↓
Linux tools and lightweight services
```

This is not a separate Debian kernel or a hardware virtual machine. PRoot provides a userland environment with limitations around privileges, kernel features, and service behavior. The [PRoot-Distro documentation](https://github.com/termux/proot-distro) explains that distinction.

A representative PRoot setup uses these commands inside Termux; check the current project instructions and supported distribution aliases before following them:

```bash
pkg update
pkg install proot-distro
proot-distro install debian
proot-distro login debian
```

The tablet's rooted Android configuration is a separate layer. It should not be inferred from those commands, which do not require host root. Likewise, installing Debian packages does not guarantee that every Debian service will work as it would on a native server.

## 4. Make remote access useful before adding applications

I added SSH and Tailscale so I could work from another device rather than type everything on the tablet.

There is an important addressing detail here: SSH in Termux and SSH inside a Debian environment can use different ports, users, and startup commands. I would document which process owns the listener and test the connection over the private network.

For a repeatable setup, use key-based SSH access, check the listening interfaces, and verify Tailscale access policies. Keep the administrative listener off the public internet. After restarting Android, test whether the remote-access path comes back without touching the screen.

That last test matters more than a successful first login. Android may stop background processes or restrict them after inactivity, and an interactive session does not prove a service will stay available overnight.

## 5. Deploy DNS filtering

I finished deploying Pi-hole and AdGuard Home as part of this project. DNS filtering gave this little machine a clear purpose: handle home DNS queries and block selected advertising or tracking domains.

For someone reproducing the setup, start with one resolver. If both services are installed, give their listeners distinct addresses or ports rather than trying to bind both to the same address and port. Before configuring clients to use a resolver, establish:

1. A stable LAN address and reachable DNS listener.
2. Whether the chosen runtime can bind the required ports.
3. Whether UDP and TCP DNS work from another LAN device.
4. Whether the service and remote administration recover after a reboot.
5. A way to return the router or clients to a working resolver if the tablet fails.

DNS normally needs port 53, and a PRoot root prompt does not confer the host privileges needed for every networking operation. The [Pi-hole prerequisites](https://docs.pi-hole.net/main/prerequisites/) and [AdGuard Home setup documentation](https://github.com/AdguardTeam/AdGuardHome/wiki/Getting-Started) are useful checks before choosing the installation path.

I would start by pointing one test client at the resolver and checking both allowed and blocked queries. Changing the whole household's DNS comes after that. Network-wide DNS filtering also cannot remove every ad: content served from the same domains as the application may not be separable by DNS.

## What this version taught me

The useful result was finding a role for hardware I already owned and learning where Android differs from a conventional Linux server. Memory limits, service startup, network privileges, and power management are part of the experiment.

The next phase I have in mind involves an ESP32 and small hardware integrations. That is a plan, not something the terminal photo demonstrates.

The tablet now has a Linux-oriented environment, remote administration, and a completed DNS filtering deployment. The next phase is the ESP32 work; routine maintenance still means watching service availability, Android background behavior, and battery condition.
