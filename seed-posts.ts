import { TSGhostAdminAPI } from "@ts-ghost/admin-api";
import dotenv from "dotenv";
import { randomPostContent, randomPostTitle } from "./sample-data.js";

dotenv.config();
const adminApi = new TSGhostAdminAPI(
  process.env.GHOST_URL || "",
  process.env.GHOST_ADMIN_API_KEY || "",
  "v5.104.2"
);

/**
 * Trả về tất cả tên của tag (`tag.name`) hiện có trong Ghost
 * @returns {Promise<string[]>}
 */
async function getAllTags(): Promise<string[]> {
  const response = (await adminApi.tags.browse({ limit: "all" }).fetch()) as
    | SuccessBrowseResponse<{ name: string }>
    | ErrorBrowseResponse;

  if (!response.success || !response.data) {
    return [];
  }
  const tags = response.data.map((tag) => {
    return tag.name;
  });
  return tags;
}

/**
 * Tạo ra một mảng gồm `numberOfPosts` bài viết được gắn tag ngẫu nhiên từ mảng `tags`
 * @param {number} numberOfPosts
 * @param {string[]} tags
 * @returns {MinimalPost[]}
 */
function generatePosts(numberOfPosts: number, tags: string[]): MinimalPost[] {
  const posts: MinimalPost[] = [];

  for (let i = 0; i < numberOfPosts; i++) {
    const post: MinimalPost = {
      title:
        randomPostTitle[Math.floor(Math.random() * randomPostTitle.length)],
      tags: [],
      status: "published",
      html: `<p>${
        randomPostContent[Math.floor(Math.random() * randomPostContent.length)]
      }</p>`,
      feature_image:
        "https://plus.unsplash.com/premium_photo-1691223733678-095fee90a0a7?q=80&w=1842&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      feature_image_alt: "news-image",
    };

    post.tags.push({ name: tags[Math.floor(Math.random() * tags.length)] });
    posts.push(post);
  }
  return posts;
}

/**
 * Tạo một bài viết mới với thông tin `post` được truyền vào. Nếu tạo thành công thì trả về `true`, ngược lại trả về `false`
 * @param {MinimalPost} post
 * @returns boolean
 */
async function postPost(post: MinimalPost) {
  const response = (await adminApi.posts.add(post, { source: "html" })) as
    | SuccessAddResponse<MinimalPost>
    | ErrorAddResponse;
  if (!response.success) {
    return false;
  }
  return true;
}

async function main() {
  // Get tất cả tag có sẵn trong ghost
  const tags = await getAllTags();
  const numberOfPost = 24;

  // Tạo ra 24 bài viết ngẫu nhiên với các tag ngẫu nhiên
  const posts = generatePosts(numberOfPost, tags);
  console.info(`Generating ${numberOfPost} posts...`);

  // Post bài viết lên ghost
  const promises = [];
  for (const post of posts) {
    promises.push(
      postPost(post).then((response) => {
        if (response) {
          console.info(`Post ${post.title} is created`);
        } else {
          console.error(`Post ${post.title} is NOT created`);
        }
      })
    );
  }
  await Promise.all(promises);
}
main();

type MinimalPost = {
  title: string;
  tags: { name: string }[];
  status: "published" | "draft";
  html: string;
  feature_image: string;
  feature_image_alt: string;
};
interface ErrorBrowseResponse {
  success: false;
  errors: {
    message: string;
    type: string;
  }[];
}

interface SuccessBrowseResponse<T> {
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
  data: T[];
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
