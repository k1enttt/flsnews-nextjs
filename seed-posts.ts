import { TSGhostAdminAPI } from "@ts-ghost/admin-api";
import dotenv from "dotenv";

dotenv.config();
const adminApi = new TSGhostAdminAPI(
  process.env.GHOST_URL || "",
  process.env.GHOST_ADMIN_API_KEY || "",
  "v5.104.2"
);


// Viết xíu mô tả vào đây để biết hàm này làm gì, xài sao
async function getAllTags(): Promise<string[]> {
  // em hạn chế dùng any kiểu này, tập làm tới đâu thì object tới đó 
  const response: any = await adminApi.tags.browse({ limit: "all" }).fetch();

  // em nên dùng response.data luôn ở đây, phải đọc tài liệu hoặc rê chuột vào tag.brow... là nó lòi ra
  if (!response.success || !response["data"]) {
    return [];
  }
  const tags = (response["data"] as Array<any>).map((tag) => {
    return tag.name;
  });
  return tags;
}

type Post = {
  title: string;
  tags: { name: string }[];
  status: "published" | "draft";
  html: string;
  feature_image: string;
  feature_image_alt: string;
};
// Viết xíu mô tả vào đây để biết hàm này làm gì, xài sao
function generatePosts(numberOfPosts: number, tags: string[]): Post[] {
  const posts: Post[] = [];

  for (let i = 0; i < numberOfPosts; i++) {
    const post: Post = {
      title: `Post ${i + 1}`,
      tags: [],
      status: "published",
      html: `<h3>This is post ${
        i + 1
      }.</h3><p>The news today is about the groundbreaking discovery of a new exoplanet, Kepler-452b, orbiting a star similar to our Sun. This planet, located in the habitable zone, is the closest Earth-like planet found to date. Scientists believe that this discovery brings us one step closer to answering one of humanity's greatest questions: Are we alone in the universe? The potential for life on Kepler-452b has ignited excitement and sparked further exploration of our cosmic neighborhood.</p>`,
      feature_image:
        "https://plus.unsplash.com/premium_photo-1691223733678-095fee90a0a7?q=80&w=1842&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      feature_image_alt: "news-image",
    };

    post.tags.push({ name: tags[Math.floor(Math.random() * tags.length)] });
    posts.push(post);
  }
  return posts;
}
// Viết xíu mô tả vào đây để biết hàm này làm gì, xài sao
async function postPost(post: Post) {
  const response: any = await adminApi.posts.add(post, { source: "html" });
  if (!response.success) {
    return false;
  }
  return true;
}

async function main() {
  // Get tất cả tag có sẵn trong ghost
  const tags = await getAllTags();

  // Tạo ra 24 bài viết ngẫu nhiên với các tag ngẫu nhiên
  const posts = generatePosts(24, tags);

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
