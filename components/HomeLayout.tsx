import Header from "./Header";
import Sidebar from "./Sidebar";
import type { MinimalTag } from "@/lib/types";

export default function HomeLayout({
  children,
  tags,
}: {
  children: React.ReactNode;
  tags: Record<string, MinimalTag[]>[];
}) {
  return (
    <>
      <Header />

      {/* Phần các menu item */}
      <Sidebar tags={tags} />

      {/* Phần nội dung main của trang */}
      {children}
    </>
  );
}
