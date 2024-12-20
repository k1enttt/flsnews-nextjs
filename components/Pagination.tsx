"use client";

import { Pagination } from "flowbite-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export function PostPagination() {
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1");
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(page);

  const onPageChange = (page: number) => {
    setCurrentPage(page);
    router.push(`/?page=${page}`);
  };

  return (
    <div className="flex overflow-x-auto sm:justify-center">
      <Pagination
        currentPage={currentPage}
        totalPages={100}
        onPageChange={onPageChange}
      />
    </div>
  );
}
