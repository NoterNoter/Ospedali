import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  // Disabilita l'ottimizzazione delle immagini per build statica
  images: {
    unoptimized: true,
  },
  // Base path se necessario per deployment su sottocartella
  // basePath: '/speciale-ospedali',
  // assetPrefix: '/speciale-ospedali',
};

export default nextConfig;
