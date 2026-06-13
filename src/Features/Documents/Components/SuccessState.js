import { Clock3, FileText } from "lucide-react";
import CloudDoneIcon from "@mui/icons-material/CloudDone";

export default function SuccessState({ file, onDone, onViewDocument }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#00000066] px-4 py-6 font-sans backdrop-blur-[6px]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="document-upload-flow-title"
    >
      <section className="relative w-full max-w-lg overflow-hidden rounded-xl bg-white px-8 pb-9 pt-24 text-center shadow-2xl sm:px-9">
        <span className="absolute -right-14 -top-14 h-32 w-32 rounded-full bg-[#f1f2f5]" />

        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#dfe8f6] text-variable-collection-primary-color">
          <CloudDoneIcon size={34} />
        </div>

        <div className="mx-auto mt-7 max-w-sm space-y-3">
          <h2 className="text-[18px] font-extrabold text-[#20242d]">
            تم رفع الملف بنجاح
          </h2>
          <p className="text-[13px] font-medium leading-7 text-[#667085]">
            تمت أرشفة المستند "{file?.name}" في قاعدة البيانات المركزية بنجاح.
          </p>
        </div>

        <div className="mx-auto mt-10 grid max-w-[380px] grid-cols-1 gap-3 sm:grid-cols-2">
          <button
            type="button"
            onClick={onDone}
            className="h-[58px] rounded-lg bg-variable-collection-primary-color text-base font-bold text-white shadow-[0_12px_24px_rgba(52,68,116,0.24)] transition hover:bg-[#4a5f96]"
          >
            تم
          </button>
          <button
            type="button"
            onClick={onViewDocument}
            className="h-[58px] rounded-lg bg-[#f1f1f2] text-base font-bold text-[#74777c] shadow-[0_8px_18px_rgba(15,23,42,0.06)] transition hover:bg-[#e8e9eb]"
          >
            عرض المستند
          </button>
        </div>

        <div className="mt-7 flex items-center justify-between border-t border-[#eef0f3] pt-8 text-[13px] font-medium text-[#5f6878]">
          <span className="flex items-center gap-2">
            <FileText size={14} />
            {file?.size || "2.4 MB"}
          </span>
          <span className="flex items-center gap-2">
            <Clock3 size={14} />
            منذ ثوانٍ
          </span>
        </div>
      </section>
    </div>
  );
}
