import React, { useEffect, useState } from "react";
import useTodoStore from "../store/Todo";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const PaginationDetail = () => {
  const { totalPages, currentPage, getTodos, setPage, loading, error } =
    useTodoStore();

  useEffect(() => {
    getTodos(currentPage);
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
      getTodos(newPage);
    }
  };

  return (
    <>
      <Pagination>
        <PaginationContent className="flex justify-center space-x-4 mt-4">
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-3 py-2 ${currentPage === 1 ? "opacity-50" : ""}`}
            >
              Previous
            </PaginationPrevious>
          </PaginationItem>

          {/* Page Numbers */}
          {[...Array(totalPages)].map((_, i) => (
            <PaginationItem key={i}>
              <PaginationLink
                href="#"
                onClick={() => handlePageChange(i + 1)}
                className={`px-3 py-2 ${
                  currentPage === i + 1 ? "bg-gray-200" : ""
                }`}
              >
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-3 py-2 ${
                currentPage === totalPages ? "opacity-50" : ""
              }`}
            >
              Next
            </PaginationNext>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  );
};

export default PaginationDetail;
