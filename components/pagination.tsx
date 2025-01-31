"use client";
import React from "react";
import { Pagination, Button } from "@heroui/react";
import { useRouter, useSearchParams } from "next/navigation";

interface PaginationControlsProps {
  totalPages: number;
}

const PaginationControls: React.FC<PaginationControlsProps> = ({ totalPages }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  
  const currentPage = parseInt(searchParams?.get("page") || "1", 10);

  const handlePageChange = (page: number) => {
    
    const params = new URLSearchParams(window.location.search);
    
    params.set("page", page.toString());
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex flex-col items-center mt-6 gap-5">
      <Pagination
        color="secondary"
        page={currentPage}
        total={totalPages}
        onChange={handlePageChange}
      />
      <div className="flex gap-2">
        <Button
          color="secondary"
          disabled={currentPage === 1}
          size="sm"
          variant="light"
          onPress={() => handlePageChange(Math.max(1, currentPage - 1))}
        >
          Previous
        </Button>
        <Button
          color="secondary"
          disabled={currentPage === totalPages}
          size="sm"
          variant="flat"
          onPress={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default PaginationControls;
