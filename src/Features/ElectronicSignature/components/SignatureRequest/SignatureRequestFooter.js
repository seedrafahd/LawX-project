import { useState } from "react";
import { Send } from "lucide-react";
import SharedButton from "../../../../shared/components/SharedButton";
import SharedModal from "../../../../shared/components/SharedModal";

export default function SignatureRequestFooter({
  onSubmit,
  isSubmitting = false,
  disabled = false,
}) {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleConfirm = () => {
    if (isSubmitting) return;
    setConfirmOpen(false);
    onSubmit?.();
  };

  const handleOpenConfirm = () => {
    if (disabled || isSubmitting) return;
    setConfirmOpen(true);
  };

  const isSendDisabled = disabled || isSubmitting;

  return (
    <>
      <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-[0_8px_30px_rgb(0,0,0,0.07)] flex items-center justify-between gap-4 max-w-7xl mx-auto">
        <SharedButton
          onClick={() => window.history.back()}
          children="إلغاء"
          colors="bg-gray-100 text-gray-700 hover:bg-gray-200"
        />

        <div className="flex items-center gap-6">
          <div className="flex flex-col text-right">
            <span className="text-[#898EA3] text-base mb-1">
              {disabled
                ? "يرجى تحديد مواقع التوقيع لكل الموقعين"
                : "سيتم إرسال إشعار إليك عند التوقيع"}
            </span>
          </div>

          <SharedButton
            onClick={handleOpenConfirm}
            disabled={isSendDisabled}
            icon={<Send className="w-5 h-5" />}
            children="إرسال طلب التوقيع"
            colors={
              isSendDisabled
                ? "bg-gray-300 text-white cursor-not-allowed hover:bg-gray-300"
                : undefined
            }
          />
        </div>
      </div>

      <SharedModal
        isOpen={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        icon={<Send className="w-5 h-5" />}
        title="تأكيد إرسال طلب التوقيع"
        description="هل أنت متأكد من إرسال طلب التوقيع للمعنيين؟ لا يمكن التراجع عن هذا الإجراء."
        primaryLabel={isSubmitting ? "جارٍ الإرسال..." : "تأكيد الإرسال"}
        onPrimaryClick={handleConfirm}
        secondaryLabel="إلغاء"
      />
    </>
  );
}
