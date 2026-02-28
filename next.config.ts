import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: '/blocking.html', destination: '/posts/blocking', permanent: true },
      { source: '/creators.html', destination: '/posts/creators', permanent: true },
      { source: '/posts.html', destination: '/posts', permanent: true },
      { source: '/cs485-a1-essay.html', destination: '/posts/cs485-a1-essay', permanent: true },
      { source: '/cs485-a3-essay.html', destination: '/posts/cs485-a3-essay', permanent: true },
      { source: '/sample.html', destination: '/posts', permanent: true },
    ]
  },
}

export default nextConfig
