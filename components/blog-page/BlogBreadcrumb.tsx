"use client";
import type { BreadcrumbComponentProps, BreadcrumbItemProps } from "flowbite-react";
import { Breadcrumb } from "flowbite-react";
import HomeIcon from "@/lib/icons/home";

export default function BlogBreadcrumb() {
  const customBreadcrumbTheme: BreadcrumbComponentProps["theme"] = {
    base: "text-gray-light",
    list: "flex items-center",
  };

  const customBreadcrumbItemTheme: BreadcrumbItemProps["theme"] = {
    href: {
      on: "flex items-center hover:text-white",
    },
    icon: "w-4 h-4 mr-2 hover:text-white",
  };

  const customCurrentBreadcrumbItemTheme: BreadcrumbItemProps["theme"] = {
    href: {
      off: "flex items-center text-white",
    }
  };

  return (
    <Breadcrumb theme={customBreadcrumbTheme} aria-label="Default breadcrumb example" className="">
      <Breadcrumb.Item theme={customBreadcrumbItemTheme} href="/" icon={HomeIcon} className="hover:text-white">
        Home
      </Breadcrumb.Item>
      <Breadcrumb.Item theme={customBreadcrumbItemTheme} href="#" className="hover:text-white">Blogs</Breadcrumb.Item>
      <Breadcrumb.Item theme={customCurrentBreadcrumbItemTheme}>Flowbite React</Breadcrumb.Item>
    </Breadcrumb>
  );
};
