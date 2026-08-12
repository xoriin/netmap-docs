---
title: Tools
sidebar_position: 10
keywords: [tools, DNS, ping, traceroute, SNMP, LLDP]
---

# Network Tools

Tools separate passive lookups from active probes. Passive tools require `tools_passive`; active tools require `tools_active`. Public-target policy and rate limits are administrator-controlled, and every result identifies the target, source, and timestamp.

## Passive lookups

- **DNS lookup** queries A, AAAA, MX, TXT, NS, or CNAME and shows TTL, answer source, and raw response.
- **Reverse DNS** performs PTR lookup for a supported IPv4/IPv6 address; an empty PTR is a valid no-result.
- **Subnet calculator** shows network, mask/prefix, wildcard, usable range, broadcast where applicable, and host counts.
- **LLDP neighbour list** reads stored/queried neighbour data without changing topology.

## Active probes

- **Ping** accepts a target, count, timeout, and returns reachability, packet loss, and RTT.
- **Traceroute** reports hops up to the configured limit; firewalls and platform differences can produce `*` hops.
- **TCP port check** tests a host/port and timeout; it does not prove an application is healthy.
- **UDP port check** is inherently ambiguous because silence can mean filtered or simply no response.
- **SNMP probe** uses a saved SNMP profile or permitted manual credentials and returns supported device data. Profile administration is SuperAdmin-only.
- **LLDP scan** selects an inventory device, reads neighbours, matches known devices, and can create a topology link after review. Dismissed suggestions do not mutate topology.

## Activity and saved results

Recent tool activity is held in the browser for the current user. You can rerun, copy, or clear it. Saved tool results can be restored, exported as JSON, or deleted; they are not a replacement for inventory or audit history.

## Limits and troubleshooting

Tools enforce active-tool rate limits and public-target restrictions using the configured trusted client IP. A blocked public target must be tested from an authorised internal path or enabled by an administrator; do not bypass policy with a proxy. Missing binaries, DNS failures, routing, SNMP timeout/credentials, and container capabilities appear in the result detail.

| Symptom | Likely cause | Fix |
|---|---|---|
| DNS returns no records | no authoritative answer or resolver failure | compare the raw response and test the configured resolver |
| ping always fails | missing raw-network capability or filtered ICMP | verify image capabilities and test TCP/route separately |
| traceroute has gaps | routers/firewalls suppress TTL-expired replies | treat `*` as unknown, not automatically down |
| UDP says unknown | no protocol response | use an application-level check where possible |
| SNMP probe fails | wrong profile/community, ACL, or timeout | verify credentials and device SNMP access |
| LLDP has no neighbours | LLDP disabled or bridge/container boundary | enable LLDP on the device and run from a network path that can see it |
