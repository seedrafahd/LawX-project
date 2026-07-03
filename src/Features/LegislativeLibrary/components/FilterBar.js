import { Search } from "lucide-react";
import { STATUS_OPTIONS } from "../helpers/constants";

export default function FilterBar({ filters, onFilterChange, countryOptions }) {
  function SelectField({ filterKey, value, options }) {
    return (
      <select
        value={value}
        className="border-none w-full h-14 bg-white border border-gray-200 rounded-xl flex items-center px-2 xl:px-6 py-3 text-sm text-gray-700 transition"
        onChange={(e) => onFilterChange(filterKey, e.target.value)}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    );
  }

  return (
    <div className="space-y-[10px]">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 bg-[#F3F4F5] rounded-2xl p-3 md:p-4 shadow-sm">
        {/* Search */}
        <div className="relative">
          <Search
            size={14}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            value={filters.title}
            onChange={(e) => onFilterChange("title", e.target.value)}
            type="text"
            placeholder="ابحث عن قانون، مادة أو موضوع قانوني... (مثلاً: زواج، نفقة)"
            className="w-full h-14 bg-white border border-gray-200 rounded-xl pr-8 md:pr-12 pl-4 text-sm text-gray-700 outline-none border border-transparent focus:border-gray-400"
          />
        </div>

        <div className="grid grid-cols-3 gap-3">
          {/* Country */}
          <SelectField
            filterKey="country"
            value={filters.country}
            options={countryOptions}
          />

          {/* Status */}
          <SelectField
            filterKey="status"
            value={filters.status}
            options={STATUS_OPTIONS}
          />

          {/* Type */}
          <select
            className="border-none w-full h-14 bg-white border border-gray-200 rounded-xl flex items-center px-2 xl:px-6 py-3 text-sm text-gray-700"
            // onChange={(e) => handleChange("status", e.target.value)}
          >
            <option value="">التصنيف: الكل</option>
            <option value="pending">قيد المعالجة</option>
            <option value="closed">مغلقة</option>
            <option value="open">مفتوحة</option>
          </select>
        </div>
      </div>

      <p className="text-gray-500 text-xs">
        جرب: "ما هي عقوبة التشهير في نظام الجرائم المعلوماتية؟"
      </p>
    </div>
  );
}
