import { defineConfig } from "vitepress";
import {
  legacyDocumentationRoutes,
  movedDocumentationRoutes,
  numberedDocumentationSections,
  retiredDocumentationRoutes,
} from "./legacy-routes.mts";

export default defineConfig({
  title: "NetMap",
  description: "Self-hosted network mapping and monitoring documentation",
  appearance: "dark",
  srcExclude: [
    "README.md",
    "SUMMARY.md"
  ],
  cleanUrls: true,
  vite: {
    plugins: [
      {
        name: "netmap-documentation-legacy-redirects",
        generateBundle() {
          const emittedPaths = new Set<string>();

          const emitRedirect = (sourcePath: string, legacyPath: string) => {
            if (sourcePath === legacyPath || emittedPaths.has(legacyPath)) return;

            const target = `/${sourcePath.replace(/(^|\/)index\.md$/, "$1").replace(/\.md$/, "")}`;
            const fileName = legacyPath === "index.md"
              ? "index.html"
              : legacyPath.replace(/\.md$/, ".html");
            const escapedTarget = target.replaceAll("&", "&amp;").replaceAll('"', "&quot;");
            emittedPaths.add(legacyPath);
            this.emitFile({
              type: "asset",
              fileName,
              source: `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta http-equiv="refresh" content="0; url=${escapedTarget}"><link rel="canonical" href="${escapedTarget}"><title>Page moved</title></head><body><p>This documentation page moved to <a href="${escapedTarget}">${escapedTarget}</a>.</p></body></html>`,
            });
          };

          for (const [sourcePath, legacyPath] of Object.entries(legacyDocumentationRoutes)) {
            emitRedirect(sourcePath, legacyPath);
          }

          for (const sourcePath of Object.keys(legacyDocumentationRoutes)) {
            const [section, ...relativePath] = sourcePath.split("/");
            const numberedSection = numberedDocumentationSections[
              section as keyof typeof numberedDocumentationSections
            ];
            if (numberedSection) {
              emitRedirect(sourcePath, `${numberedSection}/${relativePath.join("/")}`);
            }
          }

          for (const [legacyPath, sourcePath] of Object.entries(movedDocumentationRoutes)) {
            emitRedirect(sourcePath, legacyPath);
            const [section, ...relativePath] = legacyPath.split("/");
            const numberedSection = numberedDocumentationSections[
              section as keyof typeof numberedDocumentationSections
            ];
            if (numberedSection && relativePath.length > 0) {
              emitRedirect(sourcePath, `${numberedSection}/${relativePath.join("/")}`);
            }
          }

          for (const legacyPath of retiredDocumentationRoutes) {
            emitRedirect("NetMap.md", legacyPath);
          }

          emitRedirect("development/local-development.md", "03-installation/development-installation.md");
          emitRedirect("development/contributing-workflow.md", "11-development/release-process.md");
          emitRedirect("NetMap.md", "orientation/netmap.md");
          emitRedirect("NetMap.md", "01-orientation/netmap.md");
          emitRedirect("NetMap.md", "orientation/welcome-to-netmap-documentation.md");
          emitRedirect("NetMap.md", "01-orientation/welcome-to-netmap-documentation.md");
          emitRedirect("NetMap.md", "orientation/quick-links.md");
          emitRedirect("NetMap.md", "quick-links.md");
          emitRedirect("development/contributing-workflow.md", "cloudflare-pages.md");
          emitRedirect("development/contributing-workflow.md", "reference/cloudflare-pages.md");
          emitRedirect("development/contributing-workflow.md", "12-reference/cloudflare-pages.md");
          emitRedirect("development/contributing-workflow.md", "maintenance-plan.md");
          emitRedirect("development/contributing-workflow.md", "reference/maintenance-plan.md");
          emitRedirect("development/contributing-workflow.md", "12-reference/maintenance-plan.md");
        },
      },
    ],
  },
  lastUpdated: true,
  head: [["link", { rel: "icon", href: "/favicon.svg" }]],
  themeConfig: {
    logo: "/favicon.svg",
    search: {
      provider: "local"
    },
    nav: [
      { text: "Guide", link: "/NetMap" },
      { text: "Install", link: "/installation/quick-start" },
      { text: "API", link: "/api/" },
      { text: "Administer", link: "/using-netmap/admin" },
      { text: "Operate", link: "/operations/health-checks" },
      { text: "Reference", link: "/reference/default-values" }
    ],
    sidebar: [
      {
        text: "NetMap",
        link: "/NetMap"
      },
      {
        text: "Get Started",
        collapsed: false,
        items: [
          { text: "What Is NetMap?", link: "/product-introduction/what-is-netmap" },
          { text: "How NetMap Works", link: "/product-introduction/architecture" },
          { text: "Limitations And Capacity Planning", link: "/product-introduction/limitations-and-capacity-planning" },
          { text: "Quick Start", link: "/installation/quick-start" },
          { text: "First-Run Setup And Authentication", link: "/installation/first-run-and-authentication" }
        ]
      },
      {
        text: "Install And Upgrade",
        collapsed: true,
        items: [
          { text: "Installation Overview", link: "/installation/installation" },
          { text: "Docker Compose", link: "/installation/docker-compose" },
          { text: "Docker", link: "/installation/docker" },
          { text: "Native Installation", link: "/installation/native-installation" },
          { text: "Reverse Proxy And HTTPS", link: "/installation/reverse-proxy" },
          { text: "Upgrading", link: "/installation/upgrading" }
        ]
      },
      {
        text: "Use NetMap",
        collapsed: true,
        items: [
          { text: "Interface Tour", link: "/using-netmap/interface-overview" },
          { text: "Dashboard", link: "/using-netmap/dashboard" },
          { text: "Topology", link: "/using-netmap/topology" },
          { text: "Inventory", link: "/using-netmap/inventory" },
          { text: "Cloud Assets", link: "/using-netmap/cloud-assets" },
          { text: "Device Details", link: "/using-netmap/device-details" },
          { text: "VLANs And Groups", link: "/using-netmap/vlans" },
          { text: "Locations", link: "/using-netmap/locations" },
          { text: "Monitoring", link: "/using-netmap/monitoring" },
          { text: "HTTP Endpoint Monitors", link: "/using-netmap/endpoint-monitors" },
          { text: "IPAM", link: "/using-netmap/ipam" },
          { text: "External IPs", link: "/using-netmap/external-ipam" },
          { text: "Security Events", link: "/using-netmap/security-events" },
          { text: "Tools", link: "/using-netmap/tools" },
          { text: "Exports", link: "/using-netmap/exports" },
          { text: "Status Pages", link: "/using-netmap/status-pages" },
          { text: "Status Page Groups And Items", link: "/using-netmap/status-page-items" },
          { text: "Status Page Incidents And Maintenance", link: "/using-netmap/status-page-incidents" },
          { text: "Status Page Custom CSS", link: "/using-netmap/status-page-css" },
          { text: "Profile", link: "/using-netmap/profile" },
          { text: "Personal Chart Views", link: "/using-netmap/chart-views" }
        ]
      },
      {
        text: "How-To Guides",
        collapsed: true,
        items: [
          { text: "Add A Device", link: "/guides/add-device" },
          { text: "Import Devices", link: "/guides/import-devices" },
          { text: "Run Discovery", link: "/guides/run-discovery" },
          { text: "Review Discovery Observations", link: "/guides/scheduled-discovery-observations" },
          { text: "Share A Topology Layout", link: "/guides/share-topology-layout" },
          { text: "Configure Service Checks", link: "/guides/configure-service-checks" },
          { text: "Create An Alert Rule", link: "/guides/create-alert-rule" },
          { text: "Import DHCP Leases", link: "/guides/import-dhcp-leases" },
          { text: "Create An IP Reservation", link: "/guides/create-ip-reservation" },
          { text: "Search Syslog Events", link: "/guides/search-syslog" },
          { text: "Export Data", link: "/guides/export-data" }
        ]
      },
      {
        text: "API",
        collapsed: true,
        items: [
          { text: "API Overview", link: "/api/" },
          { text: "API Quick Start", link: "/api/quick-start" },
          { text: "API Authentication", link: "/api/authentication" },
          { text: "API Permissions", link: "/api/permissions" },
          { text: "API Errors", link: "/api/errors" },
          { text: "Rate Limits", link: "/api/rate-limits" },
          { text: "Automation", link: "/api/guides/automation" },
          { text: "Status Page Integrations", link: "/api/guides/status-page-integrations" },
          { text: "Endpoint Reference", link: "/api/reference/endpoints" },
          { text: "OpenAPI And Swagger", link: "/api/reference/openapi" }
        ]
      },
      {
        text: "Administer",
        collapsed: true,
        items: [
          { text: "Admin Workspace", link: "/administer/" },
          { text: "System", link: "/administer/system" },
          { text: "Release Notices", link: "/administer/release-notices" },
          { text: "Users", link: "/administer/users" },
          { text: "Groups And Roles", link: "/administer/groups" },
          { text: "Permissions", link: "/administer/permissions" },
          { text: "Two-Factor Authentication", link: "/administer/two-factor-authentication" },
          { text: "New Sign-In Emails", link: "/administer/new-sign-in-emails" },
          { text: "Devices And Icons", link: "/administer/devices-and-icons" },
          { text: "Cloud Providers", link: "/administer/cloud-providers" },
          { text: "SNMP Profiles", link: "/administer/snmp-profiles" },
          { text: "Notifications", link: "/administer/notifications" },
          { text: "Alerts", link: "/administer/alerts" },
          { text: "Automation", link: "/administer/automation" },
          { text: "Security And Audit", link: "/administer/security-and-audit" },
          { text: "Configuration Reference", link: "/configuration/configuration" },
          { text: "Storage", link: "/configuration/storage" },
          { text: "OIDC SSO", link: "/configuration/oidc-sso" },
          { text: "Syslog", link: "/configuration/syslog" }
        ]
      },
      {
        text: "Security",
        collapsed: true,
        items: [
          { text: "Security Overview", link: "/security/" },
          { text: "Secrets Management", link: "/security/secrets-management" },
          { text: "Network Exposure", link: "/security/network-exposure" },
          { text: "Vulnerability Reporting", link: "/security/vulnerability-reporting" }
        ]
      },
      {
        text: "Operate",
        collapsed: true,
        items: [
          { text: "Operations Overview", link: "/operations/operations" },
          { text: "Health Checks", link: "/operations/health-checks" },
          { text: "Logging", link: "/operations/logging" },
          { text: "Backup And Restore", link: "/operations/backup-and-restore" },
          { text: "Database Migrations", link: "/operations/database-migrations" },
          { text: "Monitoring NetMap", link: "/operations/monitoring-netmap" },
          { text: "Disaster Recovery", link: "/operations/disaster-recovery" }
        ]
      },
      {
        text: "Troubleshooting",
        collapsed: true,
        items: [
          { text: "Common Issues", link: "/troubleshooting/common-issues" },
          { text: "Installation Problems", link: "/troubleshooting/installation-problems" },
          { text: "Authentication Problems", link: "/troubleshooting/authentication-problems" },
          { text: "API-Key Problems", link: "/troubleshooting/api-key-problems" },
          { text: "Permission Errors", link: "/troubleshooting/permission-errors" },
          { text: "Database Problems", link: "/troubleshooting/database-problems" },
          { text: "Reverse Proxy Problems", link: "/troubleshooting/reverse-proxy-problems" },
          { text: "Container Problems", link: "/troubleshooting/container-problems" },
          { text: "Diagnostic Information", link: "/troubleshooting/diagnostic-information" }
        ]
      },
      {
        text: "Reference",
        collapsed: true,
        items: [
          { text: "Default Values", link: "/reference/default-values" },
          { text: "File And Directory Paths", link: "/reference/file-paths" },
          { text: "Ports", link: "/reference/ports" },
          { text: "Glossary", link: "/reference/glossary" },
          { text: "Changelog", link: "/reference/changelog" }
        ]
      },
      {
        text: "Contributing",
        collapsed: true,
        items: [
          { text: "Developer Guide", link: "/development/development" },
          { text: "Local Development", link: "/development/local-development" },
          { text: "Repository Structure", link: "/development/repository-structure" },
          { text: "Backend Development", link: "/development/backend-development" },
          { text: "Frontend Development", link: "/development/frontend-development" },
          { text: "Testing", link: "/development/testing" },
          { text: "Adding API Endpoints", link: "/development/adding-api-endpoints" },
          { text: "Database Changes", link: "/development/database-changes" },
          { text: "Contributing Workflow", link: "/development/contributing-workflow" },
          { text: "Documentation Style Guide", link: "/development/style-guide" }
        ]
      }
    ],
    socialLinks: [
      { icon: "github", link: "https://github.com/xoriin/netmap" }
    ],
    footer: {
      message: "NetMap documentation",
      copyright: "NetMap"
    }
  },
  markdown: {
    theme: {
      light: "github-light",
      dark: "github-dark"
    }
  }
});
