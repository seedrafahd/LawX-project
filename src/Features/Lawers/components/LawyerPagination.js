import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

export default function LawyerPagination({ pagination, onPageChange }) {
  const currentPage = pagination?.current_page ?? 1;
  const totalPages = pagination?.total_pagees ?? 1;
  const totalItems = pagination?.total ?? 0;
  // const from = pagination?.from ?? 0;
  // const to = pagination?.to ?? 0;

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  if (totalItems <= 20) return;
  return (
    <div className="flex flex-col lg:flex-row items-center justify-between gap-5 px-6 py-4 bg-[#fafbfd]">
      {/* <div className="flex items-center gap-3 text-[#6f7890]">
        <span>إظهار</span>
        <span className="text-sm">
          {from} - {to} من {totalItems} سجلات
        </span>
      </div> */}

      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(1)}
          disabled={currentPage <= 1}
          className="w-9 h-9 rounded-lg border border-[#d5dbe8] bg-white flex items-center justify-center disabled:opacity-40"
        >
          <ChevronsRight size={16} />
        </button>

        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          className="w-9 h-9 rounded-lg border border-[#d5dbe8] bg-white flex items-center justify-center disabled:opacity-40"
        >
          <ChevronRight size={16} />
        </button>

        {pages.map((p) => (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            className={`w-9 h-9 rounded-lg flex items-center justify-center font-semibold ${
              p === currentPage
                ? "bg-[#34456f] text-white"
                : "border border-[#d5dbe8] bg-white"
            }`}
          >
            {p}
          </button>
        ))}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className="w-9 h-9 rounded-lg border border-[#d5dbe8] bg-white flex items-center justify-center disabled:opacity-40"
        >
          <ChevronLeft size={16} />
        </button>

        <button
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage >= totalPages}
          className="w-9 h-9 rounded-lg border border-[#d5dbe8] bg-white flex items-center justify-center disabled:opacity-40"
        >
          <ChevronsLeft size={16} />
        </button>
      </div>
    </div>
  );
}
