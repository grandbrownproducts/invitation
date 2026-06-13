import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Placeholder gallery/story assets are SVGs; replace with real photos
    // (jpg/png) in /public before deploying for best results.
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
