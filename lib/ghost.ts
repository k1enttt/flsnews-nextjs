import { TSGhostContentAPI } from "@ts-ghost/content-api";
 
export const api = new TSGhostContentAPI(
  process.env.GHOST_URL || "",
  process.env.GHOST_CONTENT_API_KEY || "",
  "v5.104.2"
);