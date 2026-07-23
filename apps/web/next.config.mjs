/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Workspace packages are shipped as TypeScript source, so let Next transpile them.
  transpilePackages: ['@jk/ui', '@jk/core', '@jk/db', '@jk/config'],
  // Re-enable once every linked route exists (we build page by page).
  // typedRoutes: true,
};

export default nextConfig;
