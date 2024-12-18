import CardNews from "@/components/CardNews";
import HomeLayout from "@/components/HomeLayout";
import { getAllBlog } from "@/lib/blog";

export default async function Home() {
  const blogs = await getAllBlog();
  return (
    <HomeLayout>
      {/* chỉ là phần nội dung bên trong thôi, ko có sidebar và header */}
      <main className="p-4 sm:ml-64">
        <div className="w-full mt-16 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 lg:gap-6 gap-4">
          {
            // Tạo ra 20 cái CardNews
            blogs.map((blog: any, i: number) => (
              <CardNews key={i} data={{
                slug: blog.slug,
                title: blog.title,
                excerpt: blog.excerpt,
              }} />
            ))
          }
        </div>
      </main>
    </HomeLayout>
  );
}
