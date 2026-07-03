import { MARKETPLACE_TABS, STATUS_OPTIONS } from "../helpers/constants";

export default function FilterBar({ filters, onFilterChange, cityOptions }) {
  const activeTab = filters.tab;

  function SelectField({ label, filterKey, value, options }) {
    return (
      <label className="border-l border-gray-200 px-4 xl:px-6 md:first:pr-0">
        <span className="mb-1 block text-[10px] font-bold text-gray-700">
          {label}
        </span>
        <select
          value={value}
          className="text-base font-semibold text-gray-900"
          onChange={(e) => onFilterChange(filterKey, e.target.value)}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
    );
  }

  return (
    <header className="flex flex-col gap-4 xl:gap-0 xl:flex-row xl:justify-between bg-white rounded-xl p-4">
      <div className="flex flex-col lg:flex-row lg:items-center gap-6 order-2 xl:order-1">
        <div className="flex flex-col md:flex-row lg:items-center gap-2 md:gap-0">
          <SelectField
            label="المدينة"
            filterKey="city"
            value={filters.city}
            options={cityOptions}
          />
          <SelectField
            label="حالة الطلب"
            filterKey="status"
            value={filters.status}
            options={STATUS_OPTIONS}
          />
        </div>

        <label className="w-full md:w-36 xl:w-56">
          <span className="mb-1 block text-[10px] font-bold text-gray-700">
            عنوان الطلب
          </span>
          <input
            value={filters.title}
            onChange={(e) => onFilterChange("title", e.target.value)}
            placeholder="مثلا: نزاع عقاري"
            className="rounded-[4px] border border-gray-200 bg-gray-50 px-2 py-2 text-[8px] text-gray-900 transition placeholder:text-gray-400 focus:bg-white"
          />
        </label>
      </div>
      <div className="flex gap-6 order-1 xl:order-2">
        {MARKETPLACE_TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onFilterChange("tab", tab.id)}
            className={`pb-1 text-base border-b-2 transition-all ${
              activeTab === tab.id
                ? "border-blue-600 text-blue-700 font-bold"
                : "border-transparent text-gray-600 hover:text-gray-800"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </header>
  );
}
