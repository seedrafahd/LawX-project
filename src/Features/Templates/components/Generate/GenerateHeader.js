import { FileText, FileBadge2, Sparkles } from "lucide-react";
import SharedButton from "../../../../shared/components/SharedButton";

export default function GenerateHeader({ template }) {
  return (
    <header className="rounded-lg border border-gray-300 bg-white shadow-sm">
      <div className="flex flex-col gap-6 p-8 lg:flex-row lg:items-center lg:justify-between">
        {/* Right Content */}
        <div>
          {/* Breadcrumb */}
          <div className="mb-1 flex items-center gap-2 text-sm text-gray-500">
            <FileText size={18} />
            <span>توليد مستند جديد</span>
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold text-[#0B2D5B]">
            {template.Template_name}
          </h1>

          {/* Badges */}
          <div className="mt-2 flex gap-4 text-gray-700 text-xs">
            <span className="flex items-center gap-1 rounded-full px-4 py-1 bg-gray-100">
              <FileBadge2 size={12} />
              DOCX
            </span>

            <span className="flex items-center gap-1 rounded-full px-4 py-1 bg-gray-100">
              <FileText size={12} />
              {template.Template_category}
            </span>
          </div>
        </div>

        {/* Left Buttons */}
        <div className="flex flex-col gap-3 sm:flex-row">
          <SharedButton
            icon={<Sparkles size={18} />}
            children=" توليد الملف النهائي"
            type="submit"
          />

          <SharedButton
            onClick={() => window.history.back()}
            children="إلغاء"
            colors="bg-gray-300 text-gray-500 hover:bg-gray-400"
          />
        </div>
      </div>
    </header>
  );
}
