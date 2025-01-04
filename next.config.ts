import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  /* config options here */

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/dhpsasm22/**",
        search: "",
      },
    ],
  },
}

export default nextConfig
