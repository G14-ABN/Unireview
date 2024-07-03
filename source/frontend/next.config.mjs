/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    BACKEND_URI: process.env.NEXT_PUBLIC_BACKEND_URI,
  },
};

export default nextConfig;
