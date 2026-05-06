/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true, // Optionnel : utile si tu as des erreurs de types au build
  },
  eslint: {
    ignoreDuringBuilds: true, // Optionnel
  },
  trailingSlash: false,
};

export default nextConfig;
