import { FileText } from "lucide-react";

export default function UploadingState({ file, progress, onCancel }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#00000066] px-4 py-6 font-sans backdrop-blur-[6px]"
      dir="rtl"
      role="dialog"
      aria-modal="true"
      aria-labelledby="document-upload-flow-title"
    >
      <section className="w-full max-w-lg rounded-xl bg-white px-8 py-16 text-center shadow-2xl sm:px-9 sm:py-20">
        <div className="mx-auto flex h-[86px] w-[86px] items-center justify-center rounded-full bg-[#e9ecf2] text-[#454b5c]">
          <FileText size={37} strokeWidth={2.2} />
        </div>

        <div className="mt-8 space-y-2">
          <h2 className="text-[20px] font-extrabold text-[#20242d]">
            {file?.name || "ملف القضية.pdf"}
          </h2>
          <p className="text-[15px] font-medium text-[#5e687e]">
            جاري رفع الملف... • {file?.size || "2.4 MB"}
          </p>
        </div>

        <div className="mt-9">
          <div className="mb-3 text-left text-[28px] font-extrabold leading-none text-[#42485a]">
            {progress}%
          </div>
          <div className="h-[10px] overflow-hidden rounded-full bg-[#e6e7ea]">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#344474] via-[#6979ac] to-[#344474] shadow-[0_0_16px_rgba(52,68,116,0.35)] transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <button
          type="button"
          onClick={onCancel}
          className="mt-8 h-[56px] w-full rounded-[10px] bg-[#f7f7f8] text-[15px] font-extrabold text-[#4a5060] transition hover:bg-[#eeeeef]"
        >
          إلغاء الرفع
        </button>
      </section>
    </div>
  );
}
