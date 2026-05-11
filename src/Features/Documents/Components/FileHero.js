import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { getFileMetadata } from "../Utils/File";

export default function FileHero({ file }) {
  const fileMeta = getFileMetadata(file);
  return (
    <div className="rounded-[14px] bg-white px-5 py-6 shadow-[0_18px_38px_rgba(15,23,42,0.08)] ring-1 ring-slate-100">
      <div className="flex items-center justify-between gap-4">
        <PictureAsPdfIcon className="text-[#DC2626]" />

        <div className="min-w-0 flex-1 text-right">
          <p className="truncate text-[15px] font-extrabold text-[#242932]">
            {file?.name}
          </p>

          <p className="mt-1 text-[14px] font-medium text-[#3d4453]">
            الحجم: {fileMeta?.size}
          </p>
        </div>
      </div>
    </div>
  );
}
