import { Post } from "@ts-ghost/content-api";
import { contentApi as api } from "./ghost";

// dùng response.data nha
export async function getAllBlog(): Promise<Array<Post>> {
  const response: any = await api.posts.browse({ limit: "all" }).fetch();
  if (!response.success || !response["data"]) {
    return [];
  }
  return response["data"] as Array<Post>;
}


// em nên khai báo interface và dùng pro gọn cho dễ đọc, nhớ mô tả cái hàm này chút
export async function getPostPerPage({
  query = "",
  tags = "",
  page = 1,
  limit = 12,
}: {
  query?: string;
  tags?: string;
  page?: number;
  limit?: number;
}): Promise<{ posts: Array<Post>; pages: number }> {
  const response =
    // Nếu có query thì tìm kiếm theo query, nếu không thì tìm kiếm theo tags
    query && query.trim() != ""
      ? await api.posts
          .browse({
            limit: limit,
            page: page,
            filter: `title:~'${query.trim()}'`,
          })
          .fetch()
      : // Nếu có tags thì tìm kiếm theo tags, nếu không thì tìm kiếm tất cả
      tags != ""
      ? await api.posts
          .browse({
            limit: limit,
            page: page,
            filter: `tags:[${tags}]`,
          })
          .fetch()
      : await api.posts.browse({ limit: limit, page: page }).fetch();
  if (!response.success || !response["data"]) {
    return { posts: [], pages: 0 };
  }
  const posts = response["data"] as Array<Post>;
  const pages = response["meta"].pagination.pages;
  return { posts, pages };
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
