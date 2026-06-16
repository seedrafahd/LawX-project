import { MapPin, Paperclip, Pencil, Trash2 } from "lucide-react";
import splitHearingDate from "../helpers/date";
import { statusOptions, statusStyles } from "../helpers/constants";
import { StatusDropdown } from "../../../shared/components/sharedBadge";
import IconActionButton from "../../../shared/components/IconActionButton";
import { getTime } from "../../../shared/helpers/date";
import { useUpdateHearing } from "../hooks/useHearings";
import Loader from "../../../shared/components/Loading";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

export default function HearingsList({
  hearings,
  setEditTarget,
  setDeleteTarget,
}) {
  const { id } = useParams();
  const { mutate: updateHearing, isPending } = useUpdateHearing();

  if (isPending) return <Loader />;
  return (
    <div className="space-y-4">
      {hearings.length ? (
        hearings.map((h) => {
          const style = statusStyles[h.status] ?? statusStyles.upcoming;
          const hearingDate = splitHearingDate(h);

          return (
            <div
              key={h.session_id}
              className={`flex gap-5 rounded-2xl border-r-4 bg-white p-8 shadow ${style}`}
            >
              <div className="space-y-1 text-center">
                <div className="text-xl font-bold text-gray-900">
                  {hearingDate.day}
                </div>
                <div className="pb-2 text-xs font-bold text-gray-400">
                  {hearingDate.month} {hearingDate.year}
                </div>
                <StatusDropdown
                  value={h.status}
                  options={statusOptions}
                  onChange={(e) => {
                    updateHearing(
                      {
                        status: e,
                        case_id: id,
                        session_id: h.session_id,
                      },
                      {
                        onSuccess: () => toast.success("تم تحديث الجلسة بنجاح"),
                      },
                    );
                  }}
                />
              </div>
              <div className="w-full ">
                <div className="space-y-1 text-xs text-gray-500">
                  <h4 className="flex items-center gap-1 text-lg font-bold text-gray-900">
                    <MapPin size={14} /> {h.location}
                  </h4>
                  <span className="flex items-center gap-1">
                    {getTime(h.date)}
                  </span>
                  <span className="flex items-center gap-1">{h.nots}</span>
                </div>
                {/* Footer */}
                <div className="flex justify-between items-center gap-4 mt-4">
                  <button>
                    <Paperclip size={14} />
                  </button>

                  <div className="flex gap-2">
                    <IconActionButton
                      icon={Pencil}
                      onClick={() => setEditTarget(h)}
                    />
                    <IconActionButton
                      icon={Trash2}
                      variant="danger"
                      onClick={() => setDeleteTarget(h)}
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <p className="rounded-xl bg-white p-8 text-center text-sm font-semibold text-gray-500">
          لا توجد جلسات بعد
        </p>
      )}
    </div>
  );
}
