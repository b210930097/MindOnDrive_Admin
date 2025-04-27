/** @type {import('next').NextConfig} */
const execSync = require("child_process").execSync;
const path = require("path");
const latestGitCommit = "git rev-parse HEAD";

// img-src 'self';
// img-src * 'unsafe-inline';
// img-src * 'self' data: https:;
const cspHeader = `
  worker-src 'self' blob:;
  img-src * 'self' data: https:;
  font-src * 'unsafe-inline';
  base-uri 'self';
  frame-ancestors 'none';
  child-src https://www.google.com https://${process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN};
`;

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    styledComponents: true,
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.loremflickr.mn",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
    ],
  },
  // generateBuildId: async () => {
  //   return execSync(latestGitCommit).toString().trim();
  // },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "Permissions-Policy",
            value:
              "camera=(), microphone=(), geolocation=(), browsing-topics=()",
          },
          {
            key: "Content-Security-Policy",
            value: cspHeader.replace(/\s{2,}/g, " ").trim(),
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
