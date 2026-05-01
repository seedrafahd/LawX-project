import { CalendarDays, Paperclip } from "lucide-react";

export default function CaseCard({ c }) {
  return (
    <div className="bg-white rounded-2xl border-r-4 border-blue-600 p-6 space-y-4 font-[Cairo]">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-bold">
              {c?.title || "نزاع عقاري - مجموعة البركة"}
            </h2>

            <span className="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full">
              {c?.status || " قيد التنفيذ"}
            </span>
          </div>

          <div className="text-sm text-gray-500">
            <span>رقم القضية: AR-0941-2023 • المحكمة التجارية بالرياض</span>
          </div>
        </div>

        {/* Avatar */}
        <img
          alt=""
          src="https://i.pravatar.cc/50"
          className="w-12 h-12 rounded-full border"
        />
      </div>

      {/* Progress Section */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">التقدم الإجمالي</span>
          <span className="font-medium text-gray-800">75%</span>
        </div>

        <div className="w-full bg-gray-100 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full"
            style={{ width: "75%" }}
          />
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4">
        {/* Right Info */}
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <CalendarDays size={16} />
            <span>آخر تحديث: 12 أكتوبر</span>
          </div>

          <div className="flex items-center gap-1">
            <Paperclip size={16} />
            <span>12 ملف</span>
          </div>
        </div>

        {/* Button */}
        <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm">
          عرض التفاصيل
        </button>
      </div>
    </div>
  );
}
