/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['i.ytimg.com'],
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: '/about',
        headers: [
          {
            key: 'Cache-Control',
            value: 'max-age=0, s-maxage=60'
          },
        ],
      },
    ];
  },

    }
}

module.exports = nextConfig