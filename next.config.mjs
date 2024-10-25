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
