import { MapPin, Paperclip } from "lucide-react";

function splitHearingDate(hearing) {
  const dateValue = String(hearing.date).split("T")[0];
  const hearingDate = new Date(`${dateValue}T00:00:00`);

  if (Number.isNaN(hearingDate.getTime())) {
    return {
      day: hearing.date,
      month: "",
      year: "",
    };
  }

  return {
    day: String(hearingDate.getDate()),
    month: new Intl.DateTimeFormat("ar", { month: "long" }).format(hearingDate),
    year: new Intl.DateTimeFormat("ar", { year: "numeric" }).format(
      hearingDate,
    ),
  };
}

export default function HearingsList({ hearings }) {
  const statusStyles = {
    completed: "bg-green-100 text-[#15803D] border-[#22C55E]",
    upcoming: "bg-blue-100 text-blue-600 border-blue-500",
    postponed: "bg-orange-100 text-orange-600 border-orange-500",
  };

  const statusText = {
    completed: "تمت",
    upcoming: "القادمة",
    postponed: "مؤجلة",
  };

  return (
    <div className="space-y-4">
      {hearings.length ? (
        hearings.map((h, i) => {
          const style = statusStyles[h.status] ?? statusStyles.upcoming;
          const hearingDate = splitHearingDate(h);

          return (
            <div
              key={h.id ?? i}
              className={`flex gap-5 rounded-2xl border-r-4 bg-white p-8 shadow ${style}`}
            >
              <div className="space-y-1 text-center">
                <div className="text-xl font-bold text-gray-900">
                  {hearingDate.day}
                </div>
                <div className="pb-2 text-xs font-bold text-gray-400">
                  {hearingDate.month} {hearingDate.year}
                </div>
                <div className={`rounded-full px-2 py-1 text-xs ${style}`}>
                  {statusText[h.status] ?? statusText.upcoming}
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-1">
                  <h4 className="flex items-center gap-1 text-lg font-bold text-gray-900">
                    <MapPin size={14} /> {h.location}
                  </h4>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
                    <span className="flex items-center gap-1">{h.nots}</span>
                    {h.attachmentsCount > 0 && (
                      <span className="flex items-center gap-1">
                        <Paperclip size={14} /> {h.attachmentsCount} مرفق
                      </span>
                    )}
                  </div>
                </div>

                {h.summary && (
                  <div className="rounded-lg bg-gray-100 p-4 text-sm text-gray-700">
                    {h.summary}
                  </div>
                )}

                {h.action && (
                  <div className="flex gap-2">
                    <button className="rounded-lg bg-gray-200 px-3 py-1 text-sm">
                      {h.action}
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })
      ) : (
        <p className="text-sm font-semibold text-gray-500">
          لا توجد مستندات بعد
        </p>
      )}
    </div>
  );
}
