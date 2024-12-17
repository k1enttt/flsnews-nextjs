import { api } from "./ghost";

export async function getAllBlog() {
  const response: any = await api.posts.browse({
    limit: "all",
    include: "tags,authors"
  }).fetch();
  if (!response) {
    return [];
  }
  return response['data'];
}

export async function getBlogBySlug(slug: string) {
  const response: any = await api.posts.read({
    slug
  }).fetch();
  if (!response) {
    return {};
  }
  return response['data'];
}