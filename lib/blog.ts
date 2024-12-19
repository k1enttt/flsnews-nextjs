import { contentApi as api } from "./ghost";
import { BlogPost } from "./types";

export async function getAllBlog(): Promise<Array<BlogPost>> {
  const response: any = await api.posts.browse({ limit: "all" }).fetch();
  if (!response.success || !response["data"]) {
    return [];
  }
  return response["data"] as Array<BlogPost>;
}

export async function getBlogBySlug(slug: string): Promise<BlogPost | null> {
  const response: any = await api.posts
    .read({
      slug,
    })
    .include({ authors: true })
    .fetch();
  if (!response.success || !response["data"]) {
    return null;
  }
  return response["data"] as BlogPost;
}
