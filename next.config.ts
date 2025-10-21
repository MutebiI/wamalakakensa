// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
//    images: {
//     domains: ['ejrknapztxdzzoepzbgl.supabase.co'],
//   },
// };

// export default nextConfig;


// // /** @type {import('next').NextConfig} */
// // const nextConfig = {
// //   eslint: {
// //     ignoreDuringBuilds: true,
// //   },
// //   typescript: {
// //     ignoreBuildErrors: true,
// //   },
// // }

// // module.exports = nextConfig

// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   eslint: {
//     ignoreDuringBuilds: true,
//   },
//   typescript: {
//     ignoreBuildErrors: true,
//   },
// };

// export default nextConfig;


import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ejrknapztxdzzoepzbgl.supabase.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;