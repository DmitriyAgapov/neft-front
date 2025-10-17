import type { NextConfig } from "next";
/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
    env: {
        NEXT_API:"http://localhost:1337/graphql",
        NEXT_BACK: 'https://fortunate-victory-1618645512.strapiapp.com',
        NEXT_BACK_DEV: 'http://localhost:1337',
        NEXT_PUBLIC_NEXT_BACK: 'https://fortunate-victory-1618645512.strapiapp.com',
        NEXT_PUBLIC_NEXT_BACK_DEV: 'http://localhost:1337',
        NEXT_PUBLIC_IMG_PROD: 'https://neft-front.vercel.app',
        NEXT_PUBLIC_NEXT_API: 'https://fortunate-victory-1618645512.strapiapp.com/graphql',
        NEXT_PUBLIC_NEXT_API_DEV: 'http://localhost:1337/graphql',
        NEXT_PUBLIC_NEXT_BACK_IMG: 'https://fortunate-victory-1618645512.media.strapiapp.com/',
        NEXT_PUBLIC_NEXT_BACK_IMG_DEV: 'http://127.0.0.1:1337',
    },

    devIndicators: false,
    typescript: {
        ignoreBuildErrors: false,
    },
    eslint: {
        ignoreDuringBuilds: false,
    },
    experimental: {
        globalNotFound: true,
        optimizeCss: process.env.NODE_ENV === 'production' ? {
            critters: true
        } : false,
        typedEnv: true,
        optimizePackageImports: ['@mantine/core', '@mantine/hooks'],
    },
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '1337',
                pathname: 'uploads'
             },
            {
                protocol: 'http',
                hostname: '127.0.0.1',
                port: '1337'
             },

            {
                    protocol: 'http',
                    hostname: 'localhost',
                    port: '3000',
            },
            {
                protocol: 'https',
                hostname: 'neft-front.vercel.app',
                port: '',
        },
         {
                protocol: 'http',
                hostname: 'localhost',
                port: '3000',
        },

        {
                protocol: 'https',
                hostname: 'fortunate-victory-1618645512.media.strapiapp.com',
                port: ''
        },
        {
                protocol: 'https',
                hostname: 'fortunate-victory-1618645512.strapiapp.com',
                port: ''
        },

        ]
    },
  /* config options here */
};

export default nextConfig;
