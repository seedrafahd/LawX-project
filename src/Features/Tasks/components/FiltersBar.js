import { Search, ChevronDown } from "lucide-react";
import { useState } from "react";
import { statusConfig } from "../helpers/constants";

const statusOptions = [
  { label: "الحالة: الكل", value: "" },
  ...Object.entries(statusConfig).map(([key, val]) => ({
    label: val.label,
    value: key,
  })),
];

export default function FiltersBar({ filters, setFilters, teamMembers = [] }) {
  const [openDropdown, setOpenDropdown] = useState(null);

  const setFilter = (key, value, label) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setOpenDropdown(null);
  };

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
            value={filters.search}
            onChange={(e) => {
              setFilters((prev) => ({ ...prev, search: e.target.value }));
            }}
            placeholder="البحث باسم المهمة أو القضية..."
            className="w-full h-[62px] rounded-[6px] bg-white pr-12 pl-4 text-[#1E1E1E] placeholder:text-gray-500 outline-none border border-transparent focus:border-gray-400 transition-all"
          />
        </div>

        {/* Filters Buttons */}
        <div className="flex flex-wrap gap-3 order-2">
          {/* Status */}
          <div className="relative">
            <button
              onClick={() =>
                setOpenDropdown(openDropdown === "status" ? null : "status")
              }
              className="h-[62px] min-w-[170px] px-6 py-3 rounded-lg bg-white border border-[#ECECEF] flex items-center gap-2 text-gray-900 text-sm hover:bg-[#F0F1F3] transition-all"
            >
              <ChevronDown size={18} />
              <span>
                {statusOptions.find((o) => o.value === filters.status)?.label ||
                  "الحالة: الكل"}
              </span>
            </button>

            {openDropdown === "status" && (
              <div className="absolute top-full mt-1 right-0 min-w-[170px] bg-white border border-[#ECECEF] rounded-lg shadow-lg z-10">
                {statusOptions.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setFilter("status", opt.value, opt.label)}
                    className={`w-full text-right px-4 py-3 text-sm hover:bg-[#F0F1F3] transition-all ${
                      filters.status === opt.value
                        ? "font-bold text-[#1F5FE0]"
                        : "text-gray-900"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Assignee */}
          <div className="relative">
            <button
              onClick={() =>
                setOpenDropdown(openDropdown === "assignee" ? null : "assignee")
              }
              className="h-[62px] min-w-[170px] px-6 py-3 rounded-lg bg-white border border-[#ECECEF] flex items-center gap-2 text-gray-900 text-sm hover:bg-[#F0F1F3] transition-all"
            >
              <ChevronDown size={18} />
              <span>{filters.assignee || "المسؤول: الجميع"}</span>
            </button>

            {openDropdown === "assignee" && (
              <div className="absolute top-full mt-1 right-0 min-w-[170px] bg-white border border-[#ECECEF] rounded-lg shadow-lg z-10">
                <button
                  onClick={() => setFilter("assignee", "")}
                  className="w-full text-right px-4 py-3 text-sm hover:bg-[#F0F1F3] transition-all text-gray-900"
                >
                  المسؤول: الجميع
                </button>
                {teamMembers.map((member) => {
                  const name = member.name || member;
                  return (
                    <button
                      key={name}
                      onClick={() => setFilter("assignee", name)}
                      className={`w-full text-right px-4 py-3 text-sm hover:bg-[#F0F1F3] transition-all ${
                        filters.assignee === name
                          ? "font-bold text-[#1F5FE0]"
                          : "text-gray-900"
                      }`}
                    >
                      {name}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
