import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    env: {
        NEXT_BACK: 'http://127.0.0.1:1337',
        NEXT_PUBLIC_NEXT_BACK: 'http://127.0.0.1:1337'
    },
    images: {
        remotePatterns: [{

                protocol: 'http',
                hostname: '127.0.0.1',
                port: '1337',
        }]
    }
  /* config options here */
};

export default nextConfig;
