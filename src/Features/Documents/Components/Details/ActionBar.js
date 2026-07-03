import { Clock3, Download, Upload } from "lucide-react";
import SharedButton from "../../../../shared/components/SharedButton";

export default function ActionBar({
  isVersions,
  handleDelete,
  handleDownload,
  handleReUpload,
  handleVersions,
}) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-gray-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex flex-col items-center justify-between gap-2 lg:gap-4 px-5 py-3 sm:flex-row">
        {/* Right */}
        <div className="flex w-full gap-2">
          {isVersions && (
            <SharedButton
              colors="bg-gray-100 text-gray-800"
              className="hover:bg-gray-200"
              onClick={handleVersions}
              children=" سجل الإصدارات"
              icon={<Clock3 size={18} />}
            />
          )}

          <SharedButton
            children=" رفع إصدار جديد"
            icon={<Upload size={18} />}
            onClick={handleReUpload}
          />
        </div>

        <div className="flex sm:justify-end w-full gap-2">
          <SharedButton
            colors="bg-red-100 text-red-800"
            className="hover:bg-red-200"
            onClick={handleDelete}
            children="حذف الملف"
          />
          <SharedButton
            children=" تحميل الملف"
            icon={<Download size={18} />}
            onClick={handleDownload}
          />
        </div>
      </div>
    </div>
  );
}
