import type { NextConfig } from "next";
/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
    env: {
        NEXT_API:"https://adminneft.agapovdv.ru/graphql",
        NEXT_BACK: 'https://adminneft.agapovdv.ru',
        NEXT_BACK_DEV: 'https://adminneft.agapovdv.ru',
        NEXT_PUBLIC_NEXT_BACK: 'https://adminneft.agapovdv.ru',
        NEXT_PUBLIC_NEXT_BACK_DEV: 'https://adminneft.agapovdv.ru',
        NEXT_PUBLIC_IMG_PROD: 'https://neft.agapovdv.ru/',
        NEXT_PUBLIC_NEXT_API: 'https://adminneft.agapovdv.ru/graphql',
        NEXT_PUBLIC_NEXT_API_DEV: 'http://127.0.0.1:1337/graphql',
        NEXT_PUBLIC_NEXT_BACK_IMG: 'https://adminneft.agapovdv.ru',
        NEXT_PUBLIC_NEXT_BACK_IMG_DEV: 'https://adminneft.agapovdv.ru',
    },
    async rewrites() {
        return [
            {
                source: '/',
                destination: '/index',
            },

        ];
    },
    devIndicators: false,
    typescript: {
        ignoreBuildErrors: true,
    },
    eslint: {
        ignoreDuringBuilds: true,
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
                hostname: 'neft.agapovdv.ru',
                port: ''
        },
        {
                protocol: 'https',
                hostname: 'adminneft.agapovdv.ru',
                port: ''
        },

        ]
    },
  /* config options here */
};

export default nextConfig;
