import { Clock3 } from "lucide-react";
import SharedModal from "../../../shared/components/SharedModal";

export default function VersionsModal({
  isOpen,
  onClose,
  currVersion,
  versions,
  onViewVersion,
}) {
  return (
    <SharedModal
      isOpen={isOpen}
      title={"سجل الإصدارات"}
      titleId="document-upload-modal-title"
      icon={<Clock3 size={22} />}
      onClose={onClose}
    >
      <div className="bg-white p-4 font-sans">
        <div className="relative">
          {/* Line*/}
          <div className="absolute right-[23px] top-3 bottom-3 w-px bg-gray-300"></div>

          <VersionItem isActive={true} item={currVersion} />
          {versions.map((item, index) => (
            <VersionItem
              key={index}
              isActive={false}
              item={item}
              onViewVersion={onViewVersion}
            />
          ))}
        </div>
      </div>
    </SharedModal>
  );
}

function VersionItem({ item, isActive, onViewVersion }) {
  return (
    <div className="relative flex gap-4 pb-12">
      {/* جزء الخط والدوائر */}
      <div className="relative w-12 flex justify-center">
        {/* Circles*/}
        <div className="absolute top-2 right-[18px] w-4 h-4 rounded-full bg-white border-2 border-gray-300 z-10"></div>

        {/* نسخة V */}
        <div
          className={`absolute top-0 right-7 w-full
                  ${
                    isActive
                      ? "bg-[#163D7A] text-white"
                      : "bg-white text-gray-700"
                  }
                  rounded px-3 py-1 font-semibold text-sm`}
        >
          v{item.version_number}
        </div>
      </div>

      {/* المحتوى */}
      <div className="flex-1 pr-8">
        <div className="text-gray-400 text-xs mb-3">
          {item.uploaded_AT || item.uploaded_at}
        </div>

        <div className="text-[#111827] font-bold text-[15px] leading-7">
          {item.File_name}
        </div>

        <div className="text-gray-500 text-sm mt-1">
          بواسطة: {item.uploaded_by?.name}
        </div>

        {!isActive && (
          <button
            onClick={() => onViewVersion(item.id)}
            className="text-[#0B74E5] font-semibold text-sm mt-3 hover:underline"
          >
            عرض
          </button>
        )}
      </div>
    </div>
  );
}
