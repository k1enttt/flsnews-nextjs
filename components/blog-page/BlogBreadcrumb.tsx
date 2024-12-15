"use client";
import { Breadcrumb } from "flowbite-react";
import HomeIcon from "@/lib/icons/home";

export default function BlogBreadcrumb() {
  return (
    <Breadcrumb aria-label="Default breadcrumb example">
      <Breadcrumb.Item href="#" icon={HomeIcon}>
        Home
      </Breadcrumb.Item>
      <Breadcrumb.Item href="#">Blogs</Breadcrumb.Item>
      <Breadcrumb.Item>Flowbite React</Breadcrumb.Item>
    </Breadcrumb>
  );
};
