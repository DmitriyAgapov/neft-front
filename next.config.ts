import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    env: {
        NEXT_BACK: 'https://fortunate-victory-1618645512.strapiapp.com',
        NEXT_PUBLIC_NEXT_BACK: 'https://fortunate-victory-1618645512.strapiapp.com',
        NEXT_PUBLIC_NEXT_API: 'https://fortunate-victory-1618645512.strapiapp.com/graphql',
        NEXT_PUBLIC_NEXT_BACK_IMG: 'https://fortunate-victory-1618645512.media.strapiapp.com/',
    },
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: '127.0.0.1',
                port: '1337',
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
    experimental: {
        optimizePackageImports: ['@mantine/core', '@mantine/hooks'],
    },
  /* config options here */
};

export default nextConfig;
