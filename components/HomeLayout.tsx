import Header from "./Header";
import Sidebar from "./Sidebar";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />

      {/* Phần các menu item */}
      <Sidebar />
      {/* Phần nội dung main của trang */}
      {children}
    </>
  );
}
