import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    // Responsive AVIF/WebP versions are generated automatically (also on Vercel).
    formats: ["image/avif", "image/webp"],
  },
  // City pages used to live under /standorte/<slug>; keep old links working.
  async redirects() {
    return [{ source: "/standorte/:stadt", destination: "/:stadt", permanent: true }];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default nextConfig;
