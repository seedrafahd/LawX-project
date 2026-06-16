import { Trash2 } from "lucide-react";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { getFileMetadata } from "../utils/File";

export default function CompactFilePreview({ file, onDelete }) {
  const fileMeta = getFileMetadata(file);
  return (
    <div className="relative flex min-h-[72px] items-center gap-4 overflow-hidden rounded-[7px] bg-[#f1f1f2] px-5 py-3 shadow-sm">
      <span className="absolute bottom-0 right-0 top-0 w-1 bg-[#0b64ff]" />

      <PictureAsPdfIcon className="text-[#DC2626]" />

      <div className="min-w-0 flex-1 text-right">
        <p className="truncate text-[13px] font-extrabold text-[#20242d]">
          {file.name}
        </p>

        <p className="mt-1 text-[12px] font-medium text-[#6f7581]">
          {fileMeta.size} جاهز للرفع
        </p>
      </div>

      {onDelete && (
        <button
          type="button"
          onClick={onDelete}
          aria-label="حذف الملف"
          className="flex h-9 w-9 items-center justify-center rounded-md text-[#ef2424] transition hover:bg-red-50"
        >
          <Trash2 size={19} strokeWidth={2.2} />
        </button>
      )}
    </div>
  );
}
