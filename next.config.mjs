/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.mlbstatic.com",
        port: "",
        pathname: "/mlb-photos/image/upload/v1/people/**",
      },
    ],
  },
};

export default nextConfig;
