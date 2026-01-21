import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // React Compiler - disabled for now (requires babel-plugin-react-compiler)
  // Enable when ready: npm install babel-plugin-react-compiler
  // reactCompiler: true,

  images: {
    remotePatterns: [
      { hostname: "lh3.googleusercontent.com" }, // Google Sheets images
      { hostname: "avatars.githubusercontent.com" }, // GitHub avatars
      { hostname: "**.medium.com" },
      { hostname: "**.substack.com" },
      { hostname: "images.unsplash.com" }, // Mockdata images
      { hostname: "cdn2.futurepedia.io" }, // Futurepedia tool logos
      { hostname: "upload.wikimedia.org" }, // Logos (Wikipedia)
      { hostname: "assets-global.website-files.com" }, // Various logos
      { hostname: "github.githubassets.com" }, // GitHub Copilot logo
      { hostname: "**.supabase.co" }, // Supabase storage
      { hostname: "cursor.sh" }, // Cursor logo
      { hostname: "codeium.com" }, // Codeium logo
      { hostname: "runway.ml" }, // Runway logo
      { hostname: "pika.art" }, // Pika logo
      { hostname: "elevenlabs.io" }, // ElevenLabs logo
      { hostname: "suno.ai" }, // Suno logo
      { hostname: "notion.so" }, // Notion logo
      { hostname: "otter.ai" }, // Otter logo
      { hostname: "jasper.ai" }, // Jasper logo
      { hostname: "copy.ai" }, // Copy.ai logo
      { hostname: "canva.com" }, // Canva logo
      { hostname: "figma.com" }, // Figma logo
      { hostname: "elicit.org" }, // Elicit logo
      { hostname: "i.pravatar.cc" }, // User avatars
    ],
  },
};

export default nextConfig;
