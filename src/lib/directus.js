import { createDirectus, rest } from "@directus/sdk";

const directus = createDirectus("https://invisibili.monema.dev").with(rest());

export default directus;
