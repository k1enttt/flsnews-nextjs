import type { Post } from "@ts-ghost/content-api";
import { contentApi as api } from "./ghost";
import type {
  ErrorBrowseResponse,
  SuccessBrowseResponse,
  SuccessReadResponse,
} from "./types";

/**
 * Trả về tất cả bài viết có trong Ghost
 * @returns {Array<Post>}
 */
export async function getAllBlog(): Promise<Array<Post>> {
  const response = (await api.posts.browse({ limit: "all" }).fetch()) as
    | SuccessBrowseResponse<Post>
    | ErrorBrowseResponse;
  if (!response.success || !response.data) {
    return [];
  }
  return response.data;
}

interface PostFetchProps {
  query?: string;
  tags?: string;
  page?: number;
  limit?: number;
}

interface PostFetchResponse {
  posts: Array<Post>;
  pages: number;
}

/**
 * Trả về các bài viết dựa theo nội dung tìm kiếm `query`, thẻ tag được chọn `tags`, số thứ tự trang `page` và số bài viết mỗi trang `limit`
 * @param {PostFetchProps}
 * @returns
 */
export async function getPostPerPage({
  query = "",
  tags = "",
  page = 1,
  limit = 12,
}: PostFetchProps): Promise<PostFetchResponse> {
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
      : ((await api.posts.browse({ limit: limit, page: page }).fetch()) as
          | SuccessBrowseResponse<Post>
          | ErrorBrowseResponse);
  if (!response.success || !response.data) {
    return { posts: [], pages: 0 };
  }
  const posts = response.data;
  const pages = response.meta.pagination.pages;
  return { posts, pages };
}

/**
 * Trả về một bài viết dựa theo `slug` của bài viết
 * @param {string} slug
 * @returns 
 */
export async function getBlogBySlug(slug: string): Promise<Post | null> {
  const response = (await api.posts
    .read({
      slug,
    })
    .include({ authors: true })
    .fetch()) as SuccessReadResponse<Post> | ErrorBrowseResponse;
  if (!response.success || !response.data) {
    return null;
  }
  return response.data;
}
