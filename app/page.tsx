import CardNews from "@/components/CardNews";
import HomeLayout from "@/components/HomeLayout";
import { PostPagination } from "@/components/Pagination";
import { getPostPerPage } from "@/lib/blog";
import { getTagTree } from "@/lib/tag";
import type { Post } from "@ts-ghost/content-api";

export default async function Home({
  searchParams,
}: {
  searchParams: {
    page: string;
    query: string;
    tags: string;
  };
}) {
  const validatePage: number = Number.parseInt(searchParams.page || "1");
  const pageIndex: number = validatePage >= 1 ? validatePage : 1;
  const selectedTags: string = searchParams.tags || "";

  const [postPerPage, tags] = await Promise.all([
    getPostPerPage({ query: searchParams.query, page: pageIndex, tags: selectedTags }),
    getTagTree(),
  ]);
  return (
    <HomeLayout tags={tags}>
      {/* chỉ là phần nội dung bên trong thôi, ko có sidebar và header */}
      <main className="p-4 sm:ml-64">
        <div className="w-full mt-16 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 lg:gap-6 gap-4">
          {postPerPage.posts.map((blog: Post, i: number) => (
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
          ))}
        </div>
        <PostPagination totalPages={postPerPage.pages} />
      </main>
    </HomeLayout>
  );
}
