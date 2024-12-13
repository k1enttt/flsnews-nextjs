import './globals.css'
// Đoạn này để từ từ nhét vào sidebar
import Image from 'next/image';
import Script from 'next/script'
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';

export const metadata = {
  title: 'FLS Case Studies',
  description: 'FLS Case Study Library',
}

export default function RootLayout({children,}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body className=''>
        {/* Phần nội dung phía trên header gồm có logo, tên app và lgoin
        Tân tạm để các props của header với sidebar bên trong rồi sau này có gì bưng ra sau
        */}
        <Header />
        
        {/* Phần các menu item */}
        <Sidebar />
        {/* Phần nội dung main của trang */}
        {children}

        {/* Cái script này để nó chạy click menu được */}
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.6.5/flowbite.min.js" strategy="beforeInteractive" />

      </body>
    </html>
  )
}

