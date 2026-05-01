import { Filter } from "lucide-react";

export function FilterToolbar({ handleChange }) {
  return (
    <div className="flex flex-wrap items-end gap-6">
      {/* state */}
      <div className="flex flex-col gap-1">
        <label className="text-xs text-gray-500 pr-[2px]">الحالة</label>
        <select
          className="bg-gray-50 border-none rounded-xl px-3 py-2 text-sm min-w-[140px]"
          onChange={(e) => handleChange("status", e.target.value)}
        >
          <option value="">الكل</option>
          <option value="in_progress">قيد المعالجة</option>
          <option value="closed">مغلقة</option>
        </select>
      </div>

      {/* lawyer */}
      <div className="flex flex-col gap-1">
        <label className="text-xs text-gray-500 pr-[2px]">
          المحامي المسؤول
        </label>
        <select
          className="bg-gray-50 border-none rounded-xl px-3 py-2 text-sm min-w-[160px]"
          onChange={(e) => handleChange("lawyer", e.target.value)}
        >
          <option value="">اختر المحامي</option>
          <option value="sara">سارة علي</option>
          <option value="khaled">خالد يوسف</option>
        </select>
      </div>

      {/* type */}
      <div className="flex flex-col gap-1">
        <label className="text-xs text-gray-500 pr-[2px]">نوع القضية</label>
        <select
          className="bg-gray-50 border-none rounded-xl px-3 py-2 text-sm min-w-[140px]"
          onChange={(e) => handleChange("type", e.target.value)}
        >
          <option value="">الكل</option>
          <option value="criminal">جنائي</option>
          <option value="civil">مدني</option>
          <option value="commercial">تجاري</option>
        </select>
      </div>

      {/* convernment */}
      <div className="flex flex-col gap-1">
        <label className="text-xs text-gray-500 pr-[2px]">المحكمة</label>
        <select
          className="bg-gray-50 border-none rounded-xl px-3 py-2 text-sm min-w-[150px]"
          onChange={(e) => handleChange("court", e.target.value)}
        >
          <option value="">المحكمة العامة</option>
          <option value="appeal">محكمة الاستئناف</option>
        </select>
      </div>

      {/* Button */}
      <button className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-xl text-sm transition">
        <Filter size={16} />
        تصفية متقدمة
      </button>
    </div>
  );
}
