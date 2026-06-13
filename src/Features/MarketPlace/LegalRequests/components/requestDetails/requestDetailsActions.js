import { Send } from "lucide-react";

export default function RequestDetailsActions({
  isDirectedRequest,
  handleOpenOfferForm,
}) {
  return (
    <div className="flex flex-col gap-3">
      <button
        onClick={handleOpenOfferForm}
        className="w-full bg-variable-collection-primary-color text-white rounded-lg py-3 font-bold
        inline-flex items-center justify-center gap-2 transition hover:bg-[#26365d]"
      >
        <Send size={18} />
        إرسال عرض
      </button>

      {isDirectedRequest && (
        <button
          className="w-full bg-gray-200 text-gray-700 rounded-lg py-3 font-bold shadow-md
            inline-flex items-center justify-center gap-2 transition hover:bg-gray-300"
        >
          رفض
        </button>
      )}
    </div>
  );
}
