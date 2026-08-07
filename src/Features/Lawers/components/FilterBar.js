import { Search } from "lucide-react";
import { STATUS_OPTIONS } from "../helpers/constants";
import { LAWYER_TYPE_OPTIONS } from "../helpers/constants";

export default function FilterBar({
  filters,
  updateFilter,
  searchInput,
  setSearchInput,
}) {
  function SelectField({ label, filterKey, value, options }) {
    return (
      <div className="lg:col-span-3">
        <label className="block text-xs text-gray-500 mb-1 px-2">{label}</label>
        <select
          value={value}
          className="w-full h-10 rounded-lg border border-gray-300 bg-[#fafbfd] p-2 text-xs text-gray-900"
          onChange={(e) => {
            updateFilter(filterKey, e.target.value);
            updateFilter("page", 1);
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
        <div className="lg:col-span-6">
          <div className="relative">
            <Search
              size={20}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              type="text"
              placeholder="ابحث باسم المحامي"
              className="w-full h-14 rounded-lg border border-gray-300 bg-[#fafbfd] pr-12 pl-4 outline-none focus:border-2"
            />
          </div>
        </div>

        <SelectField
          label="نوع المحامي"
          filterKey="lawyer_state"
          value={filters.lawyer_state}
          options={LAWYER_TYPE_OPTIONS}
        />

        <SelectField
          label="حالة المحامي"
          filterKey="is_suspended"
          value={filters.is_suspended}
          options={STATUS_OPTIONS}
        />
      </div>
    </div>
  );
}
