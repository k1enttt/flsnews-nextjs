import { TSGhostAdminAPI } from "@ts-ghost/admin-api";
import dotenv from "dotenv";
import { tags } from "./sample-data.js";

dotenv.config();
const adminApi = new TSGhostAdminAPI(
  process.env.GHOST_URL || "",
  process.env.GHOST_ADMIN_API_KEY || "",
  "v5.104.2"
);

/**
 * Trả về tag có slug là giá trị `slug` được truyền vào
 * @param {string} slug
 * @returns {Promise<MinimalTag | null>}
 */
async function getTagBySlug(slug: string): Promise<MinimalTag | null> {
  const response = (await adminApi.tags.read({ slug }).fetch()) as
    | SuccessReadResponse<MinimalTag>
    | ErrorReadResponse;
  if (!response.success || !response.data) {
    return null;
  }
  return { slug: response.data.slug, name: response.data.name };
}

/**
 * Tạo một tag mới với slug (`slug`) và tên tag (`name`) được truyền vào
 * @param {MinimalTag} tag
 * @returns {Promise<boolean>}
 */
async function postTag(tag: MinimalTag): Promise<boolean> {
  const response = (await adminApi.tags.add(tag)) as
    | SuccessAddResponse<MinimalTag>
    | ErrorAddResponse;
  if (!response.success) {
    return false;
  }
  return true;
}

async function main() {
  const promises: Promise<void>[] = [];
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

// Interfaces
interface MinimalTag {
  slug: string;
  name: string;
}
interface ErrorReadResponse {
  success: false;
  errors: {
    message: string;
    type: string;
  }[];
}

interface SuccessReadResponse<T> {
  success: true;
  meta: {
    pagination: {
      pages: number;
      page: number;
      limit: number | "all";
      total: number;
      prev: number | null;
      next: number | null;
    };
  };
  data: T;
}
interface SuccessAddResponse<T> {
  success: true;
  data: T;
}

interface ErrorAddResponse {
  success: false;
  errors: {
    message: string;
    type: string;
    context?: string | null | undefined;
  }[];
}
