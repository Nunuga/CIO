/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/biography",
        permanent: false, // можно true, если точно навсегда
      },
    ];
  },
};

export default nextConfig;
