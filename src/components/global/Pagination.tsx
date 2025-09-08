import { FC } from "react";

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: FC<PaginationProps> = ({ totalItems, itemsPerPage, currentPage, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex text-sm justify-end mt-4 space-x-2">
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-1 rounded-lg font-medium transition ${
            page === currentPage
              ? "bg-brand text-white"
              : "bg-neutral-200 text-neutral-700 hover:bg-brand hover:text-white"
          }`}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
