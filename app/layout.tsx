import "./globals.css";
// Đoạn này để từ từ nhét vào sidebar
import Script from "next/script";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { Metadata } from "next";
import localFont from "next/font/local";

// Các font cần dùng
const conthraxBold = localFont({
  src: "./fonts/conthrax-bold.otf",
  variable: "--font-conthrax-bold",
  preload: true,
});

const conthraxHeavy = localFont({
  src: "./fonts/conthrax-heavy.otf",
  variable: "--font-conthrax-heavy",
  preload: true,
});

const gothamBook = localFont({
  src: "./fonts/gotham-book.otf",
  variable: "--font-gotham-book",
  preload: true,
});

const gothamBold = localFont({
  src: "./fonts/gotham-bold.otf",
  variable: "--font-gotham-bold",
  preload: true,
});

export const metadata: Metadata = {
  title: "FLS Case Studies",
  description: "FLS Case Study Library",
  openGraph: {
    title: "FLS Case Studies",
    description: "FLS Case Study Library",
    url: "https://flsnews-nextjs.vercel.app/",
    siteName: "FLS Case Studies",
    images: "/opengraph-image.avif",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${conthraxHeavy.variable} ${conthraxBold.variable} ${gothamBold.variable} ${gothamBook.variable}  bg-blue-dark`}>
        {/* Phần nội dung phía trên header gồm có logo, tên app và lgoin
        Tân tạm để các props của header với sidebar bên trong rồi sau này có gì bưng ra sau
        */}
        <Header />

        {/* Phần các menu item */}
        {/* <Sidebar /> */}
        {/* Phần nội dung main của trang */}
        {children}

        {/* Cái script này để nó chạy click menu được */}
        <Script
          src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.6.5/flowbite.min.js"
          strategy="beforeInteractive"
        />
      </body>
    </html>
  );
}
