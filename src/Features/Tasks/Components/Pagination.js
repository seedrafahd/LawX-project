import { ChevronRight, ChevronLeft } from "lucide-react";

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  currentItems,
}) {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-4 px-8 py-4 bg-white">
      <div className="text-gray-600 text-sm">
        عرض {currentItems} من أصل {totalItems} مهمة
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="w-11 h-11 rounded-[14px] flex items-center justify-center text-[#5E5E67] hover:bg-[#F4F4F5] disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronRight size={20} />
        </button>

        {getPageNumbers().map((pageNum) => (
          <button
            key={pageNum}
            onClick={() => onPageChange(pageNum)}
            className={`w-11 h-11 rounded-[14px] font-bold ${
              pageNum === currentPage
                ? "bg-[#1F5FE0] text-white shadow-[0_8px_18px_rgba(31,95,224,0.25)]"
                : "text-[#4A4A53] hover:bg-[#F4F4F5]"
            }`}
          >
            {pageNum}
          </button>
        ))}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="w-11 h-11 rounded-[14px] flex items-center justify-center text-[#5E5E67] hover:bg-[#F4F4F5] disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronLeft size={20} />
        </button>
      </div>
    </div>
  );
}
