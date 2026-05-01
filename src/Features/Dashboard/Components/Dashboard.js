// export default function Dashboard() {
//   return <div>لوحة تحكم</div>;
// }
import FolderIcon from "@mui/icons-material/Folder";
import DonutSmallIcon from "@mui/icons-material/DonutSmall";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import RatingItem from "./RatingItem";
import StatCard from "./StatsCard";
import ScheduleItem from "./ScheduleItem";
import FinanceChart from "./Chart";

export default function Dashboard() {
  return (
    <div className="min-h-screen w-full flex flex-col gap-4 bg-variable-collection-SCREEN-BG-color">
      {/* STATS */}
      <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-5">
        <StatCard
          title="القضايا المفتوحة"
          number="124"
          value="12%"
          icon={<FolderIcon />}
          positive
        />
        <StatCard
          title="قيد التنفيذ"
          number="124"
          value="-5%"
          icon={<DonutSmallIcon />}
        />
        <StatCard
          title="القضايا المغلقة"
          number="124"
          value="-5%"
          icon={<TaskAltIcon />}
        />
        <StatCard
          title="الجلسات القادمة"
          number="124"
          value="-3%"
          icon={<TaskAltIcon />}
        />
      </div>

      {/* MIDDLE */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* CHART */}
        <div className="flex flex-col gap-1 px-4 py-5 bg-white rounded-2xl shadow col-span-2">
          <h2 className="font-bold">نظرة عامة مالية</h2>

          <div className=" bg-white rounded-xl flex items-center justify-center px-4 pt-8 pb-4 text-gray-400">
            <FinanceChart />
          </div>
        </div>

        {/* ALERTS */}
        <div className="flex flex-col gap-4 px-4 py-5 bg-white p-5 rounded-2xl shadow col-span-1">
          <div className="flex justify-between">
            <h2 className="font-bold">تنبيهات هامة</h2>
            <span className="text-blue-500 text-sm cursor-pointer">
              عرض الكل
            </span>
          </div>

          <div className="space-y-[10px]">
            <AlertItem title="تحديث قضية" desc="تم استلام رد من المحكمة" />

            <AlertItem title="فاتورة متأخرة" desc="العميل لم يسدد" warning />
          </div>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="grid lg:grid-cols-2 gap-[18px]">
        {/* RATINGS */}
        <div className="bg-white rounded-2xl p-5 shadow">
          <h2 className="text-gray-700 font-bold">لمحة عن أداء الفريق</h2>
          <div className="p-4">
            <RatingItem />
            <RatingItem />
            <RatingItem />
          </div>
        </div>

        {/* SCHEDULE */}
        <div className="bg-white p-5 rounded-2xl shadow ">
          <div className="flex justify-between">
            <h2 className="font-bold">جدول اليوم</h2>
            <span className="text-blue-500 text-sm cursor-pointer">
              عرض الكل
            </span>
          </div>

          <ScheduleItem />
          <ScheduleItem />
          <ScheduleItem />
        </div>
      </div>
    </div>
  );
}

function AlertItem({ title, desc, warning }) {
  return (
    <div
      className={`px-8 py-4 border-r-4 border-r-variable-collection-primary-color ${warning ? "bg-orange-100" : "bg-variable-collection-primary-color/10"}`}
    >
      <h4 className="font-bold">{title}</h4>
      <p className="text-sm text-gray-600">{desc}</p>
    </div>
  );
}
