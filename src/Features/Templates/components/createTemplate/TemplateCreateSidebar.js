import TemplateCreateActions from "./TemplateCreateActions";

export default function TemplateCreateSidebar({ isEditMode, handleCancel }) {
  return (
    <aside className="space-y-6">
      <div className="bg-white rounded-lg border border-gray-300 p-6 md:p-8 h-fit">
        <h3 className="font-bold text-sm text-gray-800 mb-4">خطوات المعالجة</h3>

        <div className="space-y-4">
          {/* Step 1 */}
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-[#0A5BC4] text-white flex items-center justify-center text-sm font-semibold">
              1
            </div>

            <span className="font-medium text-gray-800">
              إدخال البيانات الأساسية
            </span>
          </div>

          {/* Step 2 */}
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full border border-gray-300 text-gray-400 flex items-center justify-center text-sm">
              2
            </div>

            <span className="text-gray-400">تحليل ملف الـ Word</span>
          </div>

          {/* Step 3 */}
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full border border-gray-300 text-gray-400 flex items-center justify-center text-sm">
              3
            </div>
            <span className="text-gray-400">تعريف المتغيرات القانونية</span>
          </div>
        </div>
      </div>
      <TemplateCreateActions
        isEditMode={isEditMode}
        handleCancel={handleCancel}
      />
    </aside>
  );
}
