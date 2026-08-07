import { Search } from "lucide-react";
import { STATUS_OPTIONS } from "../helpers/constants";

export default function FilterBar({
  filters,
  onFilterChange,
  searchInput,
  setSearchInput,
  countryOptions,
  categoriesOptions,
}) {
  function SelectField({ label, filterKey, value, options }) {
    return (
      <div className="lg:col-span-2">
        <label className="block text-xs text-gray-500 mb-1 px-2">{label}</label>
        <select
          value={value}
          className="w-full h-10 rounded-lg border border-gray-300 bg-[#fafbfd] p-2 text-xs text-gray-900"
          onChange={(e) => {
            onFilterChange(filterKey, e.target.value);
            onFilterChange("page", "1");
          }}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-[#d8deea] shadow-sm p-4">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-end">
        {/* Search */}
        <div className="relative lg:col-span-6">
          <Search
            size={20}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            type="text"
            placeholder="ابحث باسم القانون"
            className="w-full h-14 rounded-lg border border-gray-300 bg-[#fafbfd] pr-12 pl-4 outline-none focus:border-2"
          />
        </div>

        {/* Type */}
        <SelectField
          label=" التصنيف القانوني"
          filterKey="category_id"
          value={filters.category_id}
          options={categoriesOptions}
        />

        {/* Status */}
        <SelectField
          label=" حالة القانون"
          filterKey="status"
          value={filters.status}
          options={STATUS_OPTIONS}
        />

        {/* Country */}
        <SelectField
          label="الدولة"
          filterKey="country"
          value={filters.country}
          options={countryOptions}
        />
      </div>

      <p className="text-gray-500 text-xs mt-2">
        جرب: "ما هي عقوبة التشهير في نظام الجرائم المعلوماتية؟"
      </p>
    </div>
  );
}
