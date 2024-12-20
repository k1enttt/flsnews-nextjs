"use client";

import { CustomFlowbiteTheme, Pagination } from "flowbite-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export function PostPagination({ totalPages }: { totalPages: number }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const page: number = parseInt(searchParams.get("page") || "1");
  const [currentPage, setCurrentPage] = useState<number>(page);

  const onPageChange = (page: number) => {
    const params = new URLSearchParams(searchParams);
    setCurrentPage(page);
    params.set("page", page.toString());
    router.push(`?${params.toString()}`);
  };

  const customPaginationTheme: CustomFlowbiteTheme["pagination"] = {
    pages: {
        previous: {
            base:"ml-0 border border-white px-3 py-2 leading-tight text-white enabled:hover:underline"
        },
        next: {
            base:"border border-white px-3 py-2 leading-tight text-white enabled:hover:underline"
        },
        selector: {
            base: "w-12 border border-white py-2 leading-tight text-white enabled:hover:underline",
            active: "bg-white text-green hover:bg-white hover:text-green hover:underline",
        }
    }
  }

  return (
    <div className="flex overflow-x-auto sm:justify-center font-gotham-book">
      <Pagination
        theme={customPaginationTheme}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  );
}
