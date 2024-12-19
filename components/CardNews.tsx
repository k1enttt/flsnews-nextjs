"use client";
import { Card } from "flowbite-react";
import type { CustomFlowbiteTheme } from "flowbite-react";
import { useRouter } from "next/navigation";

const CardNews = ({data}:{
  data: {
    slug: string;
    title: string;
    excerpt: string | null;
    feature_image: string | null;
    feature_image_alt: string | null;
  }
}) => {
  const route = useRouter();
  const { slug, title, excerpt, feature_image, feature_image_alt } = data;

  const customCardTheme: CustomFlowbiteTheme["card"] = {
    img: {
      base: "group-hover:shadow-outer-white transition duration-200 ease-in-out",
      horizontal: {
        off: "rounded-none h-[220px] aspect-[4/3] object-cover",
      },
    },
  };

  return (
    <Card
      theme={customCardTheme}
      className="w-full rounded-none bg-transparent border-none shadow-none hover:cursor-pointer group"
      imgAlt={feature_image_alt || ""}
      imgSrc={feature_image || ""}
      onClick={() => {
        route.push(`/${slug}`);
      }}
    >
      <h5 className="text-2xl font-bold tracking-tight text-white dark:text-white font-conthrax-bold">
        {title.toUpperCase()}
      </h5>
      {/* Việc giới hạn trích dẫn (excerpt) ngoài cách sửa style của containter (thẻ <p>) để xén bớt nội dung của excerpt thì Ghost có hỗ trợ giới hạn ký tự của excerpt,
       theo hướng dẫn của link https://ghost.org/docs/themes/helpers/excerpt/#description */}
      <p className="font-normal text-white dark:text-gray-400 font-gotham-book overflow-y-clip max-h-[4.25em]">
        {excerpt}
      </p>
    </Card>
  );
};

export default CardNews;
