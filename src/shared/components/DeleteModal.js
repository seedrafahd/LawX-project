import { CircleAlert } from "lucide-react";

export default function DeleteModal({
  isOpen,
  title,
  description,
  onConfirm,
  onClose,
  isDeleting,
}) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#00000066] backdrop-blur-[6px]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="document-upload-flow-title"
    >
      <section className="relative w-full max-w-lg overflow-hidden rounded-xl bg-white px-8 py-24 text-center shadow-2xl sm:px-9">
        <span className="absolute -right-14 -top-14 h-32 w-32 rounded-full bg-red-700/10" />

        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-700/10 text-red-700">
          <CircleAlert size={32} />
        </div>

        <div className="mx-auto mt-7 max-w-sm space-y-3">
          <h2 className="text-[18px] font-extrabold text-[#20242d]">{title}</h2>
          <p className="text-[13px] font-medium leading-7 text-[#667085]">
            {description}
          </p>
        </div>

        <div className="mx-auto mt-10 grid max-w-[380px] grid-cols-1 gap-3 sm:grid-cols-2">
          <button
            type="button"
            onClick={onConfirm}
            className="h-[58px] rounded-lg bg-red-700 text-base font-bold text-white shadow-[0_12px_24px_rgba(52,68,116,0.24)] transition hover:bg-red-800"
          >
            حذف
          </button>
          <button
            type="button"
            onClick={onClose}
            className="h-[58px] rounded-lg bg-[#f1f1f2] text-base font-bold text-[#74777c] shadow-[0_8px_18px_rgba(15,23,42,0.06)] transition hover:bg-[#e8e9eb]"
          >
            إلغاء
          </button>
        </div>
      </section>
    </div>
  );
}
