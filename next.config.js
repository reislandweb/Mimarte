/** @type {import('next').NextConfig} */
const nextConfig = {
  // Genera HTML estático para subir a Hostinger sin necesitar Node.js en servidor
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
