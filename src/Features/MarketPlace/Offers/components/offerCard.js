import { Trash2 } from "lucide-react";
import SharedBadge from "../../../../shared/Components/sharedBadge";
import DeleteOfferAction from "./deleteOfferAction";

export default function OfferCard({ offer, onOpenDetails, onActionClick }) {
  const isAccepted = offer.status === "accepted";
  const isRejected = offer.status === "rejected";

  const statusStyles = {
    pending: "yellow",
    accepted: "green",
    rejected: "red",
  };

  return (
    <article
      onClick={() => onOpenDetails(offer)}
      className="rounded-xl bg-white p-6 space-y-2 shadow-lg cursor-pointer"
    >
      <div className="flex justify-between">
        <SharedBadge text={offer.status} color={statusStyles[offer.status]} />
        <span className="text-sm font-medium text-slate-500">
          {offer.created_at}
        </span>
      </div>

      <h4 className="pt-4 font-bold text-gray-900">{offer.title_request}</h4>
      <p className="pb-4 text-sm text-gray-600">{offer.title_description}</p>

      <div className="pt-4 border-t border-gray-100">
        <div className="grid grid-cols-[1fr_auto] items-center gap-y-4 text-sm">
          <span className="text-gray-500">السعر المقترح:</span>
          <strong className="text-base font-extrabold text-blue-700">
            {offer.price + " " + offer.price_currency}
          </strong>
          <span className="text-gray-500">المدة الزمنية:</span>
          <strong className="font-bold text-gray-900">
            {offer.estimated_days}
          </strong>
        </div>
      </div>

      <div className="flex items-center gap-2 pt-4">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onActionClick?.(offer);
          }}
          type="button"
          disabled={isRejected}
          className={`h-12 flex-1 rounded-lg text-base font-extrabold transition ${
            isAccepted
              ? "bg-[#34467d] text-white hover:bg-[#2d3d70]"
              : isRejected
                ? "bg-slate-100 text-slate-700"
                : "bg-slate-50 text-[#34467d] hover:bg-slate-100"
          }`}
        >
          {isAccepted
            ? "بدء العمل"
            : isRejected
              ? "تم رفض العرض من العميل"
              : "تعديل العرض"}
        </button>
        <DeleteOfferAction offerId={offer.proposal_id}>
          <button
            // onClick={(e) => e.stopPropagation()}
            type="button"
            aria-label="حذف العرض"
            className="grid h-12 w-12 place-items-center rounded-lg bg-red-50 text-red-500 transition hover:bg-red-100"
          >
            <Trash2 size={18} strokeWidth={2.4} />
          </button>
        </DeleteOfferAction>
      </div>
    </article>
  );
}
