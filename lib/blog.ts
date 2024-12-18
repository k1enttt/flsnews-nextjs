import { api } from "./ghost";

export async function getAllBlog() {
  const response: any = await api.posts.browse({ limit: "all" }).fetch();
  if (!response || !response["data"]) {
    return [];
  }
  return response["data"] as Array<any>;
}

export async function getBlogBySlug(slug: string) {
  const response: any = await api.posts
    .read({
      slug,
    })
    .include({ authors: true })
    .fetch();
  if (!response || !response["data"]) {
    return null;
  }
  return response["data"];
}
