import "./globals.css";
// Đoạn này để từ từ nhét vào sidebar
import Script from "next/script";
import type { Metadata } from "next";
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
  metadataBase: new URL("http://localhost:3000"),
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
      <body
        className={`${conthraxHeavy.variable} ${conthraxBold.variable} ${gothamBold.variable} ${gothamBook.variable}  bg-blue-dark`}
      >
        {/* Phần nội dung main + layout của trang home */}
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
