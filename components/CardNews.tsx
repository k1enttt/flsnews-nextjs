"use client";
import { Card } from "flowbite-react";
import type { CustomFlowbiteTheme } from "flowbite-react";
import { useRouter } from "next/navigation";

const CardNews = () => {
  const route = useRouter();

  const title: string = "Noteworthy technology acquisitions 2021";
  const description: string =
    "Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.";

  const customCardTheme: CustomFlowbiteTheme["card"] = {
    img: {
      base: "group-hover:shadow-outer-white transition duration-200 ease-in-out",
      horizontal: {
        off: "rounded-none",
      },
    },
  };

  return (
    <Card
      theme={customCardTheme}
      className="w-full rounded-none bg-transparent border-none shadow-none hover:cursor-pointer group"
      imgAlt="Meaningful alt text for an image that is not purely decorative"
      imgSrc="https://flowbite-react.com/images/blog/image-1.jpg"
      onClick={() => {
        route.push("/blog");
      }}
    >
      <h5 className="text-2xl font-bold tracking-tight text-white dark:text-white font-conthrax-bold">
        {title.toUpperCase()}
      </h5>
      <p className="font-normal text-white dark:text-gray-400 font-gotham-book">
        {description}
      </p>
    </Card>
  );
};

export default CardNews;
