/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "yltbxotlxxqixuyxsrxm.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/photos/**",
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "5mb", // Increased from default 1mb to allow image uploads
    },
  },
  distDir: "_next",
  generateBuildId: async () => {
    if (process.env.BUILD_ID) {
      return process.env.BUILD_ID;
    } else {
      return `${new Date().getTime()}`;
    }
  },
};

export default nextConfig;
