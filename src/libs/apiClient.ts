import { createClient } from "microcms-js-sdk";

export const apiClient = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN ?? "",
  apiKey: process.env.MICROCMS_API_KEY ?? "",
});
