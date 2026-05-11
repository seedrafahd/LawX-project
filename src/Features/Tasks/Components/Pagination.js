import { ChevronRight, ChevronLeft } from "lucide-react";

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  currentItems,
}) {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-4 px-8 py-4 bg-white">
      <div className="text-gray-600 text-sm">عرض 3 من أصل 42 مهمة</div>

      <div className="flex items-center gap-2">
        <button className="w-11 h-11 rounded-[14px] flex items-center justify-center text-[#5E5E67] hover:bg-[#F4F4F5]">
          <ChevronRight size={20} />
        </button>

        <button className="w-11 h-11 rounded-[14px] text-[#4A4A53] hover:bg-[#F4F4F5] font-bold">
          3
        </button>

        <button className="w-11 h-11 rounded-[14px] text-[#4A4A53] hover:bg-[#F4F4F5] font-bold">
          2
        </button>

        <button className="w-11 h-11 rounded-[14px] bg-[#1F5FE0] text-white font-bold shadow-[0_8px_18px_rgba(31,95,224,0.25)]">
          1
        </button>

        <button className="w-11 h-11 rounded-[14px] flex items-center justify-center text-[#5E5E67] hover:bg-[#F4F4F5]">
          <ChevronLeft size={20} />
        </button>
      </div>
    </div>
  );
}
