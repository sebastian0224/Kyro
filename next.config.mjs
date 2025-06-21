/** @type {import('next').NextConfig} */
const nextConfig = {
  // Forzar generación estática de rutas paralelas
  generateStaticParams: true,

  // Configuración específica para rutas paralelas
  experimental: {
    // Asegurar que las rutas paralelas se construyan correctamente
    parallelRoutes: true,
  },

  // Rewrite rules para manejar las rutas de modales
  async rewrites() {
    return [
      {
        source: "/portfolios/create",
        destination: "/portfolios/@modals/create",
      },
      {
        source: "/portfolios/edit",
        destination: "/portfolios/@modals/edit",
      },
      {
        source: "/portfolios/delete",
        destination: "/portfolios/@modals/delete",
      },
    ];
  },

  // Headers para asegurar el funcionamiento correcto
  async headers() {
    return [
      {
        source: "/portfolios/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "no-cache, no-store, must-revalidate",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
