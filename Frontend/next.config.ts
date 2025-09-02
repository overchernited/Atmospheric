import type { NextConfig } from "next";
const withPWA = require("next-pwa")({
  dest: "public",      // carpeta donde se generará el service worker
  register: true,      // registrar automáticamente el worker
  skipWaiting: true,   // activar el nuevo worker inmediatamente
});

const nextConfig: NextConfig = {
  images: {
    domains: ["apvbruuzlfnzfamjisoo.supabase.co"],
  },
  // otras configuraciones de Next.js que tengas...
};

export default withPWA(nextConfig);
