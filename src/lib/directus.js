import { createDirectus, rest } from "@directus/sdk";

const directus = createDirectus("https://invisibili.monema.dev").with(
  rest({
    onRequest: (options) => ({ ...options, cache: "no-store" }),
  })
);

export default directus;
