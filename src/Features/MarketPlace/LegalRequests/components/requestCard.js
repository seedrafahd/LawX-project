import React from "react";
import { Bookmark, Clock3, FileText, MapPin } from "lucide-react";
import SharedBadge from "../../../../shared/components/sharedBadge";
import { statusStyles } from "../helpers/constants";

export default function RequestCard({ item, tab, onOpenDetails, onOpenOffer }) {
  return (
    <article
      onClick={() => onOpenDetails(item)}
      className="grid cursor-pointer gap-6 p-6 rounded-xl bg-white transition hover:shadow-md lg:grid-cols-[1fr_112px]"
    >
      <div className="space-y-4">
        <div>
          <div className="flex justify-between">
            <h3 className="text-sm font-bold leading-7 text-gray-900">
              {item.title_request}
            </h3>
            <SharedBadge
              text={statusStyles[item.status].text}
              color={statusStyles[item.status].color}
            />
          </div>

          <div className="mt-1 flex flex-wrap justify-start gap-3 text-xs font-medium text-gray-500">
            <Meta
              icon={<FileText />}
              text={`${item.documents_counts} مرفقات`}
            />
            <Meta icon={<Clock3 />} text={item.created_at} />
            <Meta icon={<MapPin />} text={item.location_request} />
          </div>
        </div>

        <p className="text-xs text-gray-600">{item.description_request}</p>

        <div className="flex justify-end gap-6 pt-2">
          <div className="h-10 w-px bg-slate-200" />
          <StatBlock
            label="الميزانية المتوقعة"
            value={`${item.budget_min} ل.س _ ${item.budget_max} ل.س`}
            isMoney
          />
        </div>
      </div>
      {/* Actions */}
      <aside className="flex gap-3 lg:flex-col lg:justify-center">
        <button
          onClick={(event) => onOpenOffer(event, item)}
          className="flex-1 rounded-lg bg-variable-collection-primary-color px-4 py-3 text-xs font-bold text-white shadow-md transition hover:bg-[#26365d] lg:flex-none"
        >
          إرسال عرض
        </button>
        <button
          onClick={(event) => event.stopPropagation()}
          aria-label="حفظ الطلب"
          className="flex flex-1 items-center justify-center py-3 rounded-lg bg-gray-100 text-xs font-bold text-gray-700 shadow-md transition hover:bg-gray-200 lg:flex-none"
        >
          {tab === "public" ? <Bookmark className="h-[18px] w-4" /> : "رفض"}
        </button>
      </aside>
    </article>
  );
}

function Meta({ icon, text }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      {React.cloneElement(icon, { className: "h-4 w-4" })}
      {text}
    </span>
  );
}

function StatBlock({ label, value, isMoney = false }) {
  return (
    <div>
      <p className="text-[10px] font-bold text-gray-400">{label}</p>
      <p
        className={`text-lg font-bold ${isMoney ? "text-[#0067d8]" : "text-gray-900"}`}
      >
        {value}
      </p>
    </div>
  );
}
