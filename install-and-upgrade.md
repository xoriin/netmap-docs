---
title: Install And Upgrade
description: Install NetMap with Docker, put it behind HTTPS, and upgrade an existing instance.
---

# Install And Upgrade

This section covers how NetMap is put together, how to install it, and how to upgrade a running instance. The published all-in-one Docker image is the supported way to run NetMap in production.

## Before You Start

You need Docker Engine and Docker Compose v2, and a host directory for persistent data. If you have not installed NetMap yet, the [Quick Start](./installation/quick-start.md) in Get Started is the shortest path; use the pages here when you need host networking, HTTPS, or an upgrade.

<table data-view="cards">
  <thead>
    <tr>
      <th></th>
      <th></th>
      <th data-hidden data-card-target data-type="content-ref"></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>How NetMap Works</strong></td>
      <td>The all-in-one image, databases, network access, and image tags.</td>
      <td><a href="./product-introduction/architecture.md">architecture</a></td>
    </tr>
    <tr>
      <td><strong>Installation Overview</strong></td>
      <td>Choose a deployment path and review requirements.</td>
      <td><a href="./installation/installation.md">installation</a></td>
    </tr>
    <tr>
      <td><strong>Docker Compose</strong></td>
      <td>Ports, capabilities, host networking, and a production-shaped Compose file.</td>
      <td><a href="./installation/docker-compose.md">docker-compose</a></td>
    </tr>
    <tr>
      <td><strong>Docker</strong></td>
      <td>Run the image with docker run for a short test.</td>
      <td><a href="./installation/docker.md">docker</a></td>
    </tr>
    <tr>
      <td><strong>Native Installation</strong></td>
      <td>NetMap does not support installing without Docker.</td>
      <td><a href="./installation/native-installation.md">native-installation</a></td>
    </tr>
    <tr>
      <td><strong>Reverse Proxy And HTTPS</strong></td>
      <td>Put NetMap behind TLS and set the public URL.</td>
      <td><a href="./installation/reverse-proxy.md">reverse-proxy</a></td>
    </tr>
    <tr>
      <td><strong>Upgrading</strong></td>
      <td>Back up, pull a new image, and verify the instance.</td>
      <td><a href="./installation/upgrading.md">upgrading</a></td>
    </tr>
  </tbody>
</table>

## Next Steps

Complete [First-Run Setup And Authentication](./installation/first-run-and-authentication.md) if you have just installed, then read [Security](./security/index.md) before you expose the instance to other users.
