'use client'
import { Card } from "flowbite-react";

const CardNews = ({
  data,
}: {
  data: {
    title: string;
    publishedAt: string;
    readTime: number;
    image: string;
  };
}) => {
  const { title, publishedAt, readTime, image } = data;
  return (
    <Card
      className="max-w-sm"
      imgAlt="Meaningful alt text for an image that is not purely decorative"
      imgSrc="https://placehold.co/450x250"
    >
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        Noteworthy technology acquisitions 2021
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        Here are the biggest enterprise technology acquisitions of 2021 so far,
        in reverse chronological order.
      </p>
    </Card>
  );
};

export default CardNews;
