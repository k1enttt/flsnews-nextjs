import Header from "../Header";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />

      {/* Phần nội dung main của trang */}
      {children}
    </>
  );
}
