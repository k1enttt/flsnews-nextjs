import CardNews from '@/components/CardNew'

export default function Home() {
  return (
   // chỉ là phần nội dung bên trong thôi, ko có sidebar và header
    <main className='p-4 sm:ml-64'>
      <div className='h-14 block'></div>
      <div className='w-full grid grid-cols-3 gap-4'>
         {
            // Tạo ra 20 cái CardNews
            Array.from({length: 20}).map((_, i) => <CardNews key={i} data={{
               title: 'New Item',
               publishedAt: '2021-09-01',
               readTime: 5,
               image: '/images/1.jpg'
            }}/>)
         }
      </div>
    </main>
  )
}
