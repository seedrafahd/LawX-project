import { Download, Eye, FileText } from "lucide-react";

export default function TemplateDetailsSidebar({ name, fileSize, filePath }) {
  return (
    <div className="space-y-6 h-fit bg-white rounded-xl border border-[#D9E0EA] p-6 xl:p-8 shadow-sm">
      <div className="flex items-center justify-between text-xl font-semibold text-gray-800">
        <div className="flex items-center gap-2">ملف القالب</div>
        <FileText />
      </div>

      <div className="flex gap-3 xl:gap-4 items-center">
        <div className="p-3 xl:p-4 rounded-xl bg-[#EAF3FF] border border-[#C7DCF8] flex items-center justify-center">
          <FileText size={24} className="text-[#4A68A0]" />
        </div>

        <div>
          <div className="font-bold text-gray-900">{name}</div>

          <div className="text-xs text-gray-500">
            الحجم: {fileSize} • ملف وورد
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 pt-2">
        <button className="h-11 rounded-xl border border-[#D4D9E2] text-[#252525] font-medium flex items-center justify-center gap-2">
          <Eye size={18} />
          معاينة
        </button>

        <button className="h-11 rounded-xl bg-[#3C4F87] text-white font-medium flex items-center justify-center gap-2 shadow">
          <Download size={18} />
          تحميل
        </button>
      </div>
    </div>
  );
}
