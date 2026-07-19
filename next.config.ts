import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Images de substitution (à remplacer par les vraies photos BAMFA hébergées localement/CDN).
    remotePatterns: [{ protocol: "https", hostname: "picsum.photos" }],
  },
};

export default nextConfig;
