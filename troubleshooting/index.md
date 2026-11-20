---
title: Troubleshooting
description: "Diagnose common NetMap installation, sign-in, API, and container problems."
---

# Troubleshooting

This section is the place to start when something is not working. Begin with Common Issues, then open the page for the area that failed. Collect the smallest safe set of logs and configuration; remove credentials, private addresses, database contents, and raw syslog data before you share them.

## Before You Start

Confirm the image tag and `/app/VERSION`, that the data directory is writable, and whether the problem happens when you request `http://127.0.0.1:8080/api/health` directly.

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
      <td><strong>Common Issues</strong></td>
      <td>First checks and a triage table by symptom.</td>
      <td><a href="./common-issues.md">common-issues</a></td>
    </tr>
    <tr>
      <td><strong>Installation Problems</strong></td>
      <td>The container does not start or is not healthy.</td>
      <td><a href="./installation-problems.md">installation-problems</a></td>
    </tr>
    <tr>
      <td><strong>Authentication Problems</strong></td>
      <td>Sign-in, sessions, and password reset.</td>
      <td><a href="./authentication-problems.md">authentication-problems</a></td>
    </tr>
    <tr>
      <td><strong>API-Key Problems</strong></td>
      <td>A key is rejected or limited.</td>
      <td><a href="./api-key-problems.md">api-key-problems</a></td>
    </tr>
    <tr>
      <td><strong>Permission Errors</strong></td>
      <td>Distinguish 401 from 403.</td>
      <td><a href="./permission-errors.md">permission-errors</a></td>
    </tr>
    <tr>
      <td><strong>Database Problems</strong></td>
      <td>SQLite, migrations, and a locked or unwritable data directory.</td>
      <td><a href="./database-problems.md">database-problems</a></td>
    </tr>
    <tr>
      <td><strong>Reverse Proxy Problems</strong></td>
      <td>HTTPS, headers, and WebSocket upgrade.</td>
      <td><a href="./reverse-proxy-problems.md">reverse-proxy-problems</a></td>
    </tr>
    <tr>
      <td><strong>Container Problems</strong></td>
      <td>Health, logs, and capability or permission issues.</td>
      <td><a href="./container-problems.md">container-problems</a></td>
    </tr>
    <tr>
      <td><strong>Diagnostic Information</strong></td>
      <td>What to collect before asking for help.</td>
      <td><a href="./diagnostic-information.md">diagnostic-information</a></td>
    </tr>
  </tbody>
</table>

## Next Steps

If the instance is healthy but a workspace is empty or unexpected, check the matching page in [Use NetMap](../use-netmap.md) and the [Permissions](../administer/permissions.md) for your role.
