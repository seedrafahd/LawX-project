import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import EventRepeatOutlinedIcon from "@mui/icons-material/EventRepeatOutlined";
import { CalendarDaysIcon } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

export function HearingsOverview() {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <div className="flex flex-col justify-between gap-4">
      <button
        onClick={(e) => navigate(`/cases/case_details/${id}/hearings`)}
        className="flex w-fit self-end justify-end p-2 rounded-lg bg-variable-collection-primary-color/10 text-variable-collection-primary-color text-sm font-bold"
      >
        عرض جلسات القضية
      </button>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Last Session */}
        <div className="px-6 py-5 bg-white rounded-xl shadow-sm ">
          <div className="space-y-[2px]">
            {/* Header */}
            <div className="flex justify-between items-start">
              <div className="bg-[#D6E3FB] p-2 rounded-lg">
                <EventRepeatOutlinedIcon className="w-5 h-5 text-[#586579]" />
              </div>
              <p className="text-sm text-gray-500 font-semibold">آخر جلسة</p>
            </div>

            <h4 className=" font-semibold text-gray-900 pt-1">
              15 نوفمبر 2023
            </h4>

            <p className="text-sm text-gray-600">
              تم تقديم مذكرة الدفاع الثالثة وتحديد موعد الرد القادم في الجلسة
              القادمة.
            </p>
          </div>
        </div>

        {/* Next Session */}
        <div className=" bg-variable-collection-primary-color text-white rounded-xl px-6 py-5 space-y-[3px] shadow-sm">
          {/* Header */}
          <div className="flex justify-between items-start">
            <div className="bg-white/10 p-2 rounded-lg">
              <CalendarDaysIcon className="w-5 h-5" />
            </div>
            <p className="text-sm text-gray-300">الجلسة القادمة</p>
          </div>

          {/* Date */}
          <h4 className="text-2xl font-semibold pt-[13px]">28 ديسمبر 2023</h4>

          {/* Details */}
          <p className="text-xs text-gray-200">
            الدائرة الثالثة - المحكمة التجارية، الموعد الساعة 10:00 صباحاً
          </p>

          {/* Watermark */}
          <CalendarTodayOutlinedIcon className="absolute bottom-4 left-4 w-24 h-24 text-white/5" />
        </div>
      </div>
    </div>
  );
}
