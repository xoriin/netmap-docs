import { defineConfig } from "vitepress";
import { legacyDocumentationRoutes } from "./legacy-routes.mts";

export default defineConfig({
  title: "NetMap",
  description: "Self-hosted network mapping and monitoring documentation",
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
          for (const [sourcePath, legacyPath] of Object.entries(legacyDocumentationRoutes)) {
            const target = `/${sourcePath.replace(/\.md$/, "")}`;
            const fileName = legacyPath === "index.md"
              ? "index.html"
              : legacyPath.replace(/\.md$/, ".html");
            const escapedTarget = target.replaceAll("&", "&amp;").replaceAll('"', "&quot;");
            this.emitFile({
              type: "asset",
              fileName,
              source: `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta http-equiv="refresh" content="0; url=${escapedTarget}"><link rel="canonical" href="${escapedTarget}"><title>Page moved</title></head><body><p>This documentation page moved to <a href="${escapedTarget}">${escapedTarget}</a>.</p></body></html>`,
            });
          }
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
      { text: "Guide", link: "/01-orientation/welcome-to-netmap-documentation" },
      { text: "Install", link: "/03-installation/quick-start" },
      { text: "API", link: "/07-api/authentication" },
      { text: "Operations", link: "/08-operations/health-checks" },
      { text: "Reference", link: "/12-reference/default-values" }
    ],
    sidebar: [
      {
        text: "01 - Orientation",
        items: [
          { text: "Welcome", link: "/01-orientation/welcome-to-netmap-documentation" },
          { text: "How To Use These Docs", link: "/01-orientation/how-to-use-this-documentation" },
          { text: "Quick Links By Goal", link: "/01-orientation/quick-links" },
          { text: "Documentation Sitemap", link: "/01-orientation/sitemap" }
        ]
      },
      {
        text: "02 - Product Introduction",
        items: [
          { text: "Product Overview And Architecture", link: "/02-product-introduction/introduction" },
          { text: "What Is NetMap?", link: "/02-product-introduction/what-is-netmap" },
          { text: "Features", link: "/02-product-introduction/features" },
          { text: "Architecture", link: "/02-product-introduction/architecture" },
          { text: "Supported Use Cases", link: "/02-product-introduction/supported-use-cases" },
          { text: "Terminology", link: "/02-product-introduction/terminology" }
        ]
      },
      {
        text: "03 - Installation",
        items: [
          { text: "Installation Overview", link: "/03-installation/installation" },
          { text: "Quick Start", link: "/03-installation/quick-start" },
          { text: "Docker Compose", link: "/03-installation/docker-compose" },
          { text: "Docker", link: "/03-installation/docker" },
          { text: "Development Installation", link: "/03-installation/development-installation" },
          { text: "Native Installation", link: "/03-installation/native-installation" },
          { text: "Reverse Proxy And HTTPS", link: "/03-installation/reverse-proxy" },
          { text: "Upgrading", link: "/03-installation/upgrading" },
          { text: "Backup And Restore", link: "/03-installation/backup-and-restore" }
        ]
      },
      {
        text: "04 - Configuration",
        items: [
          { text: "Configuration Reference", link: "/04-configuration/configuration" },
          { text: "Environment Variables", link: "/04-configuration/environment-variables" },
          { text: "Storage", link: "/04-configuration/storage" },
          { text: "Ports", link: "/04-configuration/ports" },
          { text: "OIDC SSO", link: "/04-configuration/oidc-sso" },
          { text: "Syslog", link: "/04-configuration/syslog" }
        ]
      },
      {
        text: "05 - Using NetMap",
        items: [
          { text: "User Guide", link: "/05-using-netmap/user-guide" },
          { text: "Interface Overview", link: "/05-using-netmap/interface-overview" },
          { text: "Dashboard", link: "/05-using-netmap/dashboard" },
          { text: "Topology", link: "/05-using-netmap/topology" },
          { text: "Inventory", link: "/05-using-netmap/inventory" },
          { text: "VLANs And Groups", link: "/05-using-netmap/vlans" },
          { text: "Locations", link: "/05-using-netmap/locations" },
          { text: "Monitoring", link: "/05-using-netmap/monitoring" },
          { text: "IPAM", link: "/05-using-netmap/ipam" },
          { text: "Security Events", link: "/05-using-netmap/security-events" },
          { text: "Tools", link: "/05-using-netmap/tools" },
          { text: "Exports", link: "/05-using-netmap/exports" },
          { text: "Administration", link: "/05-using-netmap/admin" },
          { text: "Profile", link: "/05-using-netmap/profile" }
        ]
      },
      {
        text: "06 - Guides",
        items: [
          { text: "Add A Device", link: "/06-guides/add-device" },
          { text: "Import Devices", link: "/06-guides/import-devices" },
          { text: "Run Discovery", link: "/06-guides/run-discovery" },
          { text: "Review Discovery Observations", link: "/06-guides/scheduled-discovery-observations" },
          { text: "Share A Topology Layout", link: "/06-guides/share-topology-layout" },
          { text: "Configure Service Checks", link: "/06-guides/configure-service-checks" },
          { text: "Create An Alert Rule", link: "/06-guides/create-alert-rule" },
          { text: "Import DHCP Leases", link: "/06-guides/import-dhcp-leases" },
          { text: "Create An IP Reservation", link: "/06-guides/create-ip-reservation" },
          { text: "Search Syslog Events", link: "/06-guides/search-syslog" },
          { text: "Export Data", link: "/06-guides/export-data" },
          { text: "Automation With API Keys", link: "/06-guides/automation-with-api-keys" }
        ]
      },
      {
        text: "07 - API",
        items: [
          { text: "API Overview", link: "/07-api/api-overview" },
          { text: "API Keys", link: "/07-api/api-keys" },
          { text: "API Authentication", link: "/07-api/authentication" },
          { text: "Generating API Keys", link: "/07-api/generating-api-keys" },
          { text: "Using API Keys", link: "/07-api/using-api-keys" },
          { text: "API-Key Permissions", link: "/07-api/api-key-permissions" },
          { text: "Rotating API Keys", link: "/07-api/rotating-api-keys" },
          { text: "Revoking API Keys", link: "/07-api/revoking-api-keys" },
          { text: "API Errors", link: "/07-api/errors" },
          { text: "Rate Limits", link: "/07-api/rate-limits" },
          { text: "OpenAPI And Swagger", link: "/07-api/openapi-swagger" },
          { text: "Capability Matrix", link: "/07-api/capability-matrix" },
          { text: "Endpoint Inventory", link: "/07-api/api-reference" },
          { text: "Endpoint Reference", link: "/07-api/endpoint-reference" }
        ]
      },
      {
        text: "08 - Operations",
        items: [
          { text: "Operations Overview", link: "/08-operations/operations" },
          { text: "Health Checks", link: "/08-operations/health-checks" },
          { text: "Logging", link: "/08-operations/logging" },
          { text: "Backups", link: "/08-operations/backups" },
          { text: "Restores", link: "/08-operations/restores" },
          { text: "Database Migrations", link: "/08-operations/database-migrations" },
          { text: "Monitoring NetMap", link: "/08-operations/monitoring-netmap" },
          { text: "Disaster Recovery", link: "/08-operations/disaster-recovery" }
        ]
      },
      {
        text: "09 - Troubleshooting",
        items: [
          { text: "Common Issues", link: "/09-troubleshooting/common-issues" },
          { text: "Installation Problems", link: "/09-troubleshooting/installation-problems" },
          { text: "Authentication Problems", link: "/09-troubleshooting/authentication-problems" },
          { text: "API-Key Problems", link: "/09-troubleshooting/api-key-problems" },
          { text: "Permission Errors", link: "/09-troubleshooting/permission-errors" },
          { text: "Database Problems", link: "/09-troubleshooting/database-problems" },
          { text: "Reverse Proxy Problems", link: "/09-troubleshooting/reverse-proxy-problems" },
          { text: "Container Problems", link: "/09-troubleshooting/container-problems" },
          { text: "Diagnostic Information", link: "/09-troubleshooting/diagnostic-information" }
        ]
      },
      {
        text: "10 - Security",
        items: [
          { text: "Security Overview", link: "/10-security/security" },
          { text: "Security Model", link: "/10-security/security-model" },
          { text: "API-Key Security", link: "/10-security/api-key-security" },
          { text: "Permissions", link: "/10-security/permissions" },
          { text: "Secrets Management", link: "/10-security/secrets-management" },
          { text: "Network Exposure", link: "/10-security/network-exposure" },
          { text: "Vulnerability Reporting", link: "/10-security/vulnerability-reporting" }
        ]
      },
      {
        text: "11 - Development",
        items: [
          { text: "Developer Guide", link: "/11-development/development" },
          { text: "Repository Structure", link: "/11-development/repository-structure" },
          { text: "Backend Development", link: "/11-development/backend-development" },
          { text: "Frontend Development", link: "/11-development/frontend-development" },
          { text: "Testing", link: "/11-development/testing" },
          { text: "Adding API Endpoints", link: "/11-development/adding-api-endpoints" },
          { text: "Database Changes", link: "/11-development/database-changes" },
          { text: "Release Process", link: "/11-development/release-process" }
        ]
      },
      {
        text: "12 - Reference",
        items: [
          { text: "Default Values", link: "/12-reference/default-values" },
          { text: "File And Directory Paths", link: "/12-reference/file-paths" },
          { text: "Ports", link: "/12-reference/ports" },
          { text: "Glossary", link: "/12-reference/glossary" },
          { text: "Changelog", link: "/12-reference/changelog" },
          { text: "Cloudflare Pages", link: "/12-reference/cloudflare-pages" },
          { text: "Documentation Inventory", link: "/12-reference/documentation-inventory" },
          { text: "Maintenance Plan", link: "/12-reference/maintenance-plan" }
        ]
      }
    ],
    socialLinks: [
      { icon: "github", link: "https://github.com/xoriin/netmap" }
    ],
    footer: {
      message: "Source-backed NetMap documentation.",
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
