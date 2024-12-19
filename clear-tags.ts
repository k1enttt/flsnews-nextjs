import { TSGhostAdminAPI } from "@ts-ghost/admin-api";
import dotenv from "dotenv";

dotenv.config();
const adminApi = new TSGhostAdminAPI(
  process.env.GHOST_URL || "",
  process.env.GHOST_ADMIN_API_KEY || "",
  "v5.104.2"
);

async function deleteAllTags() {
  const response: any = await adminApi.tags.browse({ limit: "all" }).fetch();
  if (!response.success || !response["data"]) {
    return false;
  }
  for (const tag of response["data"]) {
    adminApi.tags.delete(tag.id).then((result) => {
      if (result.success) {
        console.info(`Tag ${tag.slug} is deleted`);
      } else {
        console.error(`Tag ${tag.slug} is NOT deleted`);
      }
    });
    console.info(`Tag ${tag.slug} is deleted`);
  }
  return true;
}

async function main() {
  await deleteAllTags();
}
main();