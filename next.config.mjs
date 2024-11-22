/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
      ignoreDuringBuilds: true, // Disables ESLint checks during the build process
    },
    typescript: {
      ignoreBuildErrors: true, // Ignores TypeScript errors during the build process
    },
  };
  
  export default nextConfig;
  