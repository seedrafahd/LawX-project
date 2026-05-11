import { ArrowRight, Check, Sparkles } from "lucide-react";

export default function SuccessModal({
  title = "تم بنجاح",
  description = "تمت العملية بنجاح",
  notice,
  buttonText = "العودة للقائمة",
  onDone,
}) {
  return (
    <div className="w-full max-w-[448px] rounded-[24px] bg-white px-10 pb-12 pt-16 text-center shadow-[0_26px_90px_rgba(15,23,42,0.16)] sm:px-11">
      <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-[#E8F9EF] shadow-[0_0_70px_rgba(34,197,94,0.28)]">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#16A34A] text-white">
          <Check className="h-8 w-8 stroke-[4]" />
        </div>
      </div>

      <h2 id="hearing-success-title" className="mt-10 text-xl font-bold text-gray-950">
        {title}
      </h2>
      <p className="mt-4 text-sm leading-7 text-gray-500">{description}</p>

      {notice && (
        <div className="mx-auto mt-16 inline-flex items-center gap-2 rounded-full bg-[#DBE8FF] px-5 py-2 text-xs font-bold text-[#64748B]">
          <Sparkles className="h-4 w-4" />
          {notice}
        </div>
      )}

      <button
        type="button"
        onClick={onDone}
        className="mt-11 flex h-12 w-full items-center justify-center gap-4 rounded-lg bg-variable-collection-primary-color text-base font-bold text-white shadow-[0_14px_26px_rgba(64,85,140,0.30)] transition hover:bg-[#344878]"
      >
        <ArrowRight className="h-5 w-5" />
        {buttonText}
      </button>
    </div>
  );
}
