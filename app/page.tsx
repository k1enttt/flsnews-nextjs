import CardNews from "@/components/CardNews";
import HomeLayout from "@/components/HomeLayout";

export default function Home() {
  return (
    <HomeLayout>
      {/* chỉ là phần nội dung bên trong thôi, ko có sidebar và header */}
      <main className="p-4 sm:ml-64">
        <div className="w-full mt-16 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 lg:gap-6 gap-4">
          {
            // Tạo ra 20 cái CardNews
            Array.from({ length: 20 }).map((_, i) => (
              <CardNews key={i} />
            ))
          }
        </div>
      </main>
    </HomeLayout>
  );
}
