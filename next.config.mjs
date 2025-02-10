/** @type {import('next').NextConfig} */

const nextConfig = {
  sassOptions: {
    /* rende disponibile le variabili sass per tutti i css  */
    additionalData: `@import "src/sass/vars.scss";`,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "invisibili.monema.dev",
      },
    ],
  },

  webpack: (config, options) => {
    /**
     * Force scss source maps for debugging. If there are performance issues or you don't need debug css, use the value "eval-source-map" instead.
     */
    if (options.dev) {
      Object.defineProperty(config, "devtool", {
        get() {
          return "source-map";
        },
        set() {},
      });
    }

    return config;
  },
};

export default nextConfig;
