import { defineConfig } from "vitepress";
import {
  legacyDocumentationRoutes,
  numberedDocumentationSections,
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

            const target = `/${sourcePath.replace(/\.md$/, "")}`;
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

          emitRedirect("development/local-development.md", "03-installation/development-installation.md");
          emitRedirect("development/contributing-workflow.md", "11-development/release-process.md");
          emitRedirect("NetMap.md", "orientation/netmap.md");
          emitRedirect("NetMap.md", "01-orientation/netmap.md");
          emitRedirect("NetMap.md", "orientation/welcome-to-netmap-documentation.md");
          emitRedirect("NetMap.md", "01-orientation/welcome-to-netmap-documentation.md");
          emitRedirect("about-documentation/how-to-use-this-documentation.md", "orientation/how-to-use-this-documentation.md");
          emitRedirect("about-documentation/how-to-use-this-documentation.md", "01-orientation/how-to-use-this-documentation.md");
          emitRedirect("about-documentation/documentation-version-compatibility.md", "orientation/documentation-version-compatibility.md");
          emitRedirect("about-documentation/documentation-version-compatibility.md", "01-orientation/documentation-version-compatibility.md");
          emitRedirect("about-documentation/sitemap.md", "orientation/sitemap.md");
          emitRedirect("about-documentation/sitemap.md", "01-orientation/sitemap.md");
          emitRedirect("about-documentation/documentation-changelog.md", "orientation/documentation-changelog.md");
          emitRedirect("about-documentation/documentation-changelog.md", "01-orientation/documentation-changelog.md");
          emitRedirect("about-documentation/reporting-documentation-problems.md", "orientation/reporting-documentation-problems.md");
          emitRedirect("about-documentation/reporting-documentation-problems.md", "01-orientation/reporting-documentation-problems.md");
          emitRedirect("NetMap.md", "orientation/quick-links.md");
          emitRedirect("NetMap.md", "quick-links.md");
          emitRedirect("development/contributing-workflow.md", "cloudflare-pages.md");
          emitRedirect("development/contributing-workflow.md", "reference/cloudflare-pages.md");
          emitRedirect("development/contributing-workflow.md", "12-reference/cloudflare-pages.md");
          emitRedirect("about-documentation/reporting-documentation-problems.md", "documentation-inventory.md");
          emitRedirect("about-documentation/reporting-documentation-problems.md", "reference/documentation-inventory.md");
          emitRedirect("about-documentation/reporting-documentation-problems.md", "12-reference/documentation-inventory.md");
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
      { text: "API", link: "/api/authentication" },
      { text: "Operations", link: "/operations/health-checks" },
      { text: "Reference", link: "/reference/default-values" }
    ],
    sidebar: [
      {
        text: "NetMap",
        link: "/NetMap"
      },
      {
        text: "Product Introduction",
        collapsed: false,
        items: [
          { text: "Product Introduction", link: "/product-introduction/introduction" },
          { text: "What Is NetMap?", link: "/product-introduction/what-is-netmap" },
          { text: "NetMap Feature Tour", link: "/product-introduction/features" },
          { text: "Supported Use Cases", link: "/product-introduction/supported-use-cases" },
          { text: "Unsupported And Out-of-Scope Use Cases", link: "/product-introduction/unsupported-use-cases" },
          { text: "How NetMap Works", link: "/product-introduction/architecture" },
          { text: "Single-Container Architecture", link: "/product-introduction/single-container-architecture" },
          { text: "The Two-Database Design", link: "/product-introduction/two-database-design" },
          { text: "Network Access Model", link: "/product-introduction/network-access-model" },
          { text: "Production Images And Installed Versions", link: "/product-introduction/production-images-and-versions" },
          { text: "Browser And Platform Support", link: "/product-introduction/browser-and-platform-support" },
          { text: "Product Limitations And Capacity Planning", link: "/product-introduction/limitations-and-capacity-planning" },
          { text: "Privacy And Data Collection", link: "/product-introduction/privacy-and-data-collection" },
          { text: "Terminology", link: "/product-introduction/terminology" }
        ]
      },
      {
        text: "Installation",
        collapsed: true,
        items: [
          { text: "Installation Overview", link: "/installation/installation" },
          { text: "Quick Start", link: "/installation/quick-start" },
          { text: "Docker Compose", link: "/installation/docker-compose" },
          { text: "Docker", link: "/installation/docker" },
          { text: "Native Installation", link: "/installation/native-installation" },
          { text: "Reverse Proxy And HTTPS", link: "/installation/reverse-proxy" },
          { text: "Upgrading", link: "/installation/upgrading" },
          { text: "Backup And Restore", link: "/installation/backup-and-restore" }
        ]
      },
      {
        text: "Configuration",
        collapsed: true,
        items: [
          { text: "Configuration Reference", link: "/configuration/configuration" },
          { text: "Environment Variables", link: "/configuration/environment-variables" },
          { text: "Storage", link: "/configuration/storage" },
          { text: "Ports", link: "/configuration/ports" },
          { text: "OIDC SSO", link: "/configuration/oidc-sso" },
          { text: "Syslog", link: "/configuration/syslog" }
        ]
      },
      {
        text: "Using NetMap",
        collapsed: true,
        items: [
          { text: "User Guide", link: "/using-netmap/user-guide" },
          { text: "Interface Overview", link: "/using-netmap/interface-overview" },
          { text: "Dashboard", link: "/using-netmap/dashboard" },
          { text: "Topology", link: "/using-netmap/topology" },
          { text: "Inventory", link: "/using-netmap/inventory" },
          { text: "VLANs And Groups", link: "/using-netmap/vlans" },
          { text: "Locations", link: "/using-netmap/locations" },
          { text: "Monitoring", link: "/using-netmap/monitoring" },
          { text: "IPAM", link: "/using-netmap/ipam" },
          { text: "Security Events", link: "/using-netmap/security-events" },
          { text: "Tools", link: "/using-netmap/tools" },
          { text: "Exports", link: "/using-netmap/exports" },
          { text: "Administration", link: "/using-netmap/admin" },
          { text: "Profile", link: "/using-netmap/profile" }
        ]
      },
      {
        text: "Guides",
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
          { text: "Export Data", link: "/guides/export-data" },
          { text: "Automation With API Keys", link: "/guides/automation-with-api-keys" }
        ]
      },
      {
        text: "API",
        collapsed: true,
        items: [
          { text: "API Overview", link: "/api/api-overview" },
          { text: "API Keys", link: "/api/api-keys" },
          { text: "API Authentication", link: "/api/authentication" },
          { text: "Generating API Keys", link: "/api/generating-api-keys" },
          { text: "Using API Keys", link: "/api/using-api-keys" },
          { text: "API-Key Permissions", link: "/api/api-key-permissions" },
          { text: "Rotating API Keys", link: "/api/rotating-api-keys" },
          { text: "Revoking API Keys", link: "/api/revoking-api-keys" },
          { text: "API Errors", link: "/api/errors" },
          { text: "Rate Limits", link: "/api/rate-limits" },
          { text: "OpenAPI And Swagger", link: "/api/openapi-swagger" },
          { text: "Capability Matrix", link: "/api/capability-matrix" },
          { text: "Endpoint Inventory", link: "/api/api-reference" },
          { text: "Endpoint Reference", link: "/api/endpoint-reference" }
        ]
      },
      {
        text: "Operations",
        collapsed: true,
        items: [
          { text: "Operations Overview", link: "/operations/operations" },
          { text: "Health Checks", link: "/operations/health-checks" },
          { text: "Logging", link: "/operations/logging" },
          { text: "Backups", link: "/operations/backups" },
          { text: "Restores", link: "/operations/restores" },
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
        text: "Security",
        collapsed: true,
        items: [
          { text: "Security Overview", link: "/security/security" },
          { text: "Security Model", link: "/security/security-model" },
          { text: "API-Key Security", link: "/security/api-key-security" },
          { text: "Permissions", link: "/security/permissions" },
          { text: "Secrets Management", link: "/security/secrets-management" },
          { text: "Network Exposure", link: "/security/network-exposure" },
          { text: "Vulnerability Reporting", link: "/security/vulnerability-reporting" }
        ]
      },
      {
        text: "Development",
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
          { text: "Contributing Workflow", link: "/development/contributing-workflow" }
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
        text: "About This Documentation",
        collapsed: true,
        items: [
          { text: "How To Use These Docs", link: "/about-documentation/how-to-use-this-documentation" },
          { text: "Versions And Compatibility", link: "/about-documentation/documentation-version-compatibility" },
          { text: "Documentation Changelog", link: "/about-documentation/documentation-changelog" },
          { text: "Report A Documentation Problem", link: "/about-documentation/reporting-documentation-problems" }
        ]
      }
    ],
    socialLinks: [
      { icon: "github", link: "https://github.com/xoriin/netmap" }
    ],
    footer: {
      message: "Based on NetMap v1.5.0 at the time of writing.",
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
