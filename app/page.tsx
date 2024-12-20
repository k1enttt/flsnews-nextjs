import CardNews from "@/components/CardNews";
import HomeLayout from "@/components/HomeLayout";
import { PostPagination } from "@/components/Pagination";
import { getPostPerPage } from "@/lib/blog";
import { getTagTree } from "@/lib/utils";
import { Post } from "@ts-ghost/content-api";

export default async function Home({
  searchParams,
}: {
  searchParams: {
    page: string;
  };
}) {
  const pageIndex = parseInt(searchParams.page || "1");
  const [blogs, tags] = await Promise.all([getPostPerPage(pageIndex), getTagTree()]);
  return (
    <HomeLayout tags={tags}>
      {/* chỉ là phần nội dung bên trong thôi, ko có sidebar và header */}
      <main className="p-4 sm:ml-64">
        <div className="w-full mt-16 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 lg:gap-6 gap-4">
          {
            blogs.map((blog: Post, i: number) => (
              <CardNews
                key={i}
                data={{
                  slug: blog.slug,
                  title: blog.title,
                  excerpt: blog.excerpt,
                  feature_image: blog.feature_image,
                  feature_image_alt: blog.feature_image_alt,
                }}
              />
            ))
          }
        </div>
        <PostPagination />
      </main>
    </HomeLayout>
  );
}
