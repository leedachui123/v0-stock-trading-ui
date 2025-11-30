/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: 'out', // 打包输出目录（默认 out）
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
 
}

export default nextConfig
