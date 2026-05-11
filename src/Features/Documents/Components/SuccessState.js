import { Check, Clock3, CloudUpload, FileText } from "lucide-react";

export default function SuccessState({ file, onDone, onViewDocument }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#00000066] px-4 py-6 font-sans backdrop-blur-[6px]"
      dir="rtl"
      role="dialog"
      aria-modal="true"
      aria-labelledby="document-upload-flow-title"
    >
      <section className="relative w-full max-w-lg overflow-hidden rounded-xl bg-white px-8 pb-9 pt-24 text-center shadow-2xl sm:px-9">
        <span className="absolute -left-10 -top-12 h-28 w-28 rounded-full bg-[#f1f2f5]" />

        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#dfe8f6] text-[#344474]">
          <CloudUpload size={34} strokeWidth={2.6} />
          <Check className="-mr-3 mt-4" size={17} strokeWidth={4} />
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
            onClick={onViewDocument}
            className="h-[58px] rounded-[8px] bg-[#f1f1f2] text-[16px] font-extrabold text-[#74777c] shadow-[0_8px_18px_rgba(15,23,42,0.06)] transition hover:bg-[#e8e9eb]"
          >
            عرض المستند
          </button>
          <button
            type="button"
            onClick={onDone}
            className="h-[58px] rounded-[8px] bg-gradient-to-r from-[#53679e] to-[#344474] text-[16px] font-extrabold text-white shadow-[0_12px_24px_rgba(52,68,116,0.24)] transition hover:from-[#4a5f96] hover:to-[#2f3e68]"
          >
            تم
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
