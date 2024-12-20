import { Post } from "@ts-ghost/content-api";
import { contentApi as api } from "./ghost";

export async function getAllBlog(): Promise<Array<Post>> {
  const response: any = await api.posts.browse({ limit: "all" }).fetch();
  if (!response.success || !response["data"]) {
    return [];
  }
  return response["data"] as Array<Post>;
}

export async function getPostPerPage(page: number, limit: number = 12): Promise<Array<Post>> {
  const response: any = await api.posts.browse({ limit: limit, page: page }).fetch();
  if (!response.success || !response["data"]) {
    return [];
  }
  return response["data"] as Array<Post>;
}

export async function getBlogBySlug(slug: string): Promise<Post | null> {
  const response: any = await api.posts
    .read({
      slug,
    })
    .include({ authors: true })
    .fetch();
  if (!response.success || !response["data"]) {
    return null;
  }
  return response["data"] as Post;
}
