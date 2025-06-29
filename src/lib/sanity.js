import { createClient } from "@sanity/client";

export const client = createClient({
  projectId: "uwf5vpjw",
  dataset: "production",
  apiVersion: "2023-06-20",
  useCdn: false, // ✅ allow fresh data & mutations
  token: import.meta.env.VITE_SANITY_WRITE_TOKEN // ✅ write-enabled token here
});
