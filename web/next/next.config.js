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
        destination: "http://localhost:3000/:path*",
      },
      {
        source: "/",
        destination: "http://localhost:3000/",
      },
    ];
  }
}

module.exports = nextConfig
