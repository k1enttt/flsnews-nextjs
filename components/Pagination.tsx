"use client";

import { Pagination } from "flowbite-react";
import type { CustomFlowbiteTheme } from "flowbite-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export function PostPagination({ totalPages }: { totalPages: number }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState<number>(
    Number.parseInt(searchParams.get("page") || "1")
  );

  const onPageChange = (page: number) => {
    const params = new URLSearchParams(searchParams);
    setCurrentPage(page);
    params.set("page", page.toString());
    router.push(`?${params.toString()}`);
  };

  // useEffect này sẽ chạy mỗi khi currentPage thay đổi
  // Dùng cho mỗi lần thực hiện search hoặc chọn filter
  useEffect(() => {
    setCurrentPage(Number.parseInt(searchParams.get("page") || "1"));
  }, [searchParams]);

  const customPaginationTheme: CustomFlowbiteTheme["pagination"] = {
    pages: {
      previous: {
        base: "ml-0 border border-white px-3 py-2 leading-tight text-white enabled:hover:underline",
      },
      next: {
        base: "border border-white px-3 py-2 leading-tight text-white enabled:hover:underline",
      },
      selector: {
        base: "w-12 border border-white py-2 leading-tight text-white enabled:hover:underline",
        active:
          "bg-white text-green hover:bg-white hover:text-green hover:underline",
      },
    },
  };

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
