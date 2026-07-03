import { FolderOpen } from "lucide-react";

export default function TemplateVariablesSection({ variables }) {
  return (
    <div className="bg-white rounded-xl border border-[#D9E0EA] shadow-sm p-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2 text-xl font-semibold text-gray-800">
          <FolderOpen />
          <h3>المتغيرات المكتشفة</h3>
        </div>
      </div>

      <div className="flex flex-wrap gap-5">
        {variables.length > 0 ? (
          variables.map((item) => (
            <div
              key={item}
              className="px-6 py-4 rounded-lg border border-[#CDD3DE] bg-[#F4F6FA] text-[#41527F] font-bold"
            >
              {item}
            </div>
          ))
        ) : (
          <div className="rounded-xl bg-white text-center text-sm font-semibold text-gray-500">
            لا يوجد متغيرات
          </div>
        )}
      </div>
    </div>
  );
}
