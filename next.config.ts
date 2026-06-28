import withPWA from "next-pwa";

const withPWAConfig = withPWA({
  dest: "public",
  disable: false,
  register: true,
  skipWaiting: true,
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/api\.openrouteservice\.org\//,
      handler: "NetworkFirst",
      options: {
        cacheName: "osrm-cache",
        expiration: {
          maxEntries: 64,
          maxAgeSeconds: 24 * 60 * 60,
        },
      },
    },
    {
      urlPattern: /^https:.*\.(?:png|gif|jpg|jpeg|svg)$/,
      handler: "CacheFirst",
      options: {
        cacheName: "image-cache",
        expiration: {
          maxEntries: 64,
          maxAgeSeconds: 24 * 60 * 60,
        },
      },
    },
  ],
});

type NextPWACompatibleConfig = Parameters<typeof withPWAConfig>[0];

const nextConfig: NextPWACompatibleConfig = {
  /* config options here */
  allowedDevOrigins: ["172.20.10.14", "localhost:3000"],
  experimental: {},
  turbopack: {},
};

export default withPWAConfig(nextConfig);
