import { TSGhostAdminAPI } from "@ts-ghost/admin-api";
import dotenv from "dotenv";
import { tags } from "./sample-data.js";

// file này cũng cùng issue của seed-posts, coi và sửa lại nha

dotenv.config();
const adminApi = new TSGhostAdminAPI(
  process.env.GHOST_URL || "",
  process.env.GHOST_ADMIN_API_KEY || "",
  "v5.104.2"
);

async function getAllTags() {
  const response: any = await adminApi.tags.browse({ limit: "all" }).fetch();
  if (!response.success || !response["data"]) {
    return [];
  }
  const tags = (response["data"] as Array<any>).map((tag) => {
    return { slug: tag.slug, name: tag.name };
  });
  return tags;
}

async function getTagBySlug(slug: string) {
  const response: any = await adminApi.tags.read({ slug }).fetch();
  if (!response.success || !response["data"]) {
    return null;
  }
  return { slug: response["data"].slug, name: response["data"].name };
}

async function postTag(tag: { slug: string; name: string }) {
  const response: any = await adminApi.tags.add(tag);
  if (!response.success) {
    return false;
  }
  return true;
}

async function main() {
  const promises = [];
  for (const [key, value] of Object.entries(tags)) {
    for (const childTag of value) {
      const slug = `${key.toLowerCase()}-${childTag.toLowerCase()}`;
      const name = `${key}: ${childTag}`;
      const isExistedTag = !!(await getTagBySlug(slug));
      if (!isExistedTag) {
        promises.push(
          postTag({ slug, name }).then((result) => {
            if (result) {
              console.info(`Tag ${slug} is created`);
            } else {
              console.error(`Tag ${slug} is NOT created`);
            }
          })
        );
      } else {
        console.info(`Tag ${slug} is already existed`);
      }
    }
  }
  await Promise.all(promises);
}
main();
