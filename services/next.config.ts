import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // React Compiler - disabled for now (requires babel-plugin-react-compiler)
  // Enable when ready: npm install babel-plugin-react-compiler
  // reactCompiler: true,

  images: {
    remotePatterns: [
      { hostname: "lh3.googleusercontent.com" }, // Google Sheets images
      { hostname: "avatars.githubusercontent.com" },
      { hostname: "**.medium.com" },
      { hostname: "**.substack.com" },
      { hostname: "images.unsplash.com" }, // Mockdata images
      { hostname: "upload.wikimedia.org" }, // Logos
      { hostname: "assets-global.website-files.com" }, // RunPod logo
    ],
  },
};

export default nextConfig;
