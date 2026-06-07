import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: `${process.env.S3_BUCKET_NAME ?? 'placeholder'}.s3.${process.env.AWS_REGION ?? 'us-east-1'}.amazonaws.com` },
    ],
  },
}

export default nextConfig
