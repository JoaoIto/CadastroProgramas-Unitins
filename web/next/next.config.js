/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  rewrites() {
    return [
      {
        source: "/:path*",
        destination: "/:path*",
      },
      {
        source: "/:path*",
        destination: "http://localhost:5173/:path*",
      },
      {
        source: "/",
        destination: "http://localhost:5173/",
      },
    ];
  }
}

module.exports = nextConfig
