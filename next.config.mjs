/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: [
    "@splinetool/react-spline",
    "@splinetool/runtime",
  ],
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "plus.unsplash.com" },
      { protocol: "https", hostname: "prod.spline.design" },
    ],
  },
  experimental: {
    optimizePackageImports: ["framer-motion", "lucide-react", "@phosphor-icons/react"],
  },
};

export default nextConfig;
