"use client";

import { Pagination } from "flowbite-react";
import { notFound, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export function PostPagination({ totalPages }: { totalPages: number }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const page = parseInt(searchParams.get("page") || "1");
  const [currentPage, setCurrentPage] = useState(page);
  
  if (page < 1 || page > totalPages) {
    return notFound();
  }

  const onPageChange = (page: number) => {
    setCurrentPage(page);
    router.push(`/?page=${page}`);
  };

  return (
    <div className="flex overflow-x-auto sm:justify-center">
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  );
}
