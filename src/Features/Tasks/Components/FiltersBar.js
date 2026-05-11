import { Search, Filter, ChevronDown } from "lucide-react";

export default function FiltersBar({
  statusFilter,
  managerFilter,
  caseFilter,
}) {
  return (
    <div className="bg-[#F3F4F5] rounded-2xl p-4">
      <div className="flex flex-col xl:flex-row gap-4 items-stretch xl:items-center">
        {/* Search */}
        <div className="relative flex-1 order-1">
          <Search
            className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500 font-bold"
            size={22}
          />

          <input
            type="text"
            placeholder="البحث باسم المهمة أو القضية..."
            className="w-full h-[62px] rounded-[6px] bg-white pr-14 pl-4 text-[16px] text-[#1E1E1E] placeholder:text-gray-500 outline-none border border-transparent focus:border-[#2D63EA] transition-all"
          />
        </div>

        {/* Filters Buttons */}
        <div className="flex flex-wrap gap-3 order-2">
          {[statusFilter, managerFilter, caseFilter].map((item, idx) => (
            <button
              key={idx}
              className="h-[62px] min-w-[170px] px-6 py-3 rounded-lg bg-white border border-[#ECECEF] flex items-center text-gray-900 text-sm hover:bg-[#F0F1F3] transition-all"
            >
              <ChevronDown size={18} />
              <span>{item}</span>
            </button>
          ))}

          <button className="w-[62px] h-[62px] flex items-center justify-center hover:bg-[#F0F1F3] transition-all">
            <Filter size={20} className="text-gray-900" />
          </button>
        </div>
      </div>
    </div>
  );
}
