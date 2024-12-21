import Blog from "@/components/blog-page/Blog";
import BlogLayout from "@/components/blog-page/BlogLayout";
import { getBlogBySlug } from "@/lib/blog";
import type { Post } from "@ts-ghost/content-api";
import { notFound } from "next/navigation";

export default async function BlogPage({
  params,
}: {
  params: {
    slug: string;
  };
}) {
  const { slug } = params;
  const blog: Post | null = await getBlogBySlug(slug.toString());
  if (!blog) {
    return notFound();
  }

  return (
    <BlogLayout>
      <Blog blog={blog} />
    </BlogLayout>
  );
}
