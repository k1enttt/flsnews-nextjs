import Blog from "@/components/blog-page/Blog";
import BlogLayout from "@/components/blog-page/BlogLayout";
import { getBlogBySlug } from "@/lib/blog";

export default async function BlogPage({ params }: {
  params: {
    slug: string;
  };
}) {
  const { slug } = params;
  const blog = await getBlogBySlug(slug.toString());

  return (
    <BlogLayout>
      <Blog title={blog.title} />
    </BlogLayout>
  );
}
