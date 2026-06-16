import FolderIcon from "@mui/icons-material/Folder";
import DonutSmallIcon from "@mui/icons-material/DonutSmall";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import StatCard from "../components/StatsCard";
import ScheduleItem from "../components/ScheduleItem";
import FinanceChart from "../components/Chart";
import { useAlerts, useDashboard } from "../hooks/useDashboard";
import Loader from "../../../shared/components/Loading";

export default function Dashboard() {
  const { data, isPending } = useDashboard();
  const { data: alertsData } = useAlerts();
  const alerts = alertsData?.data?.alerts || [];

  if (isPending) return <Loader />;

  const stats = data?.data?.case_statistics;
  const financial = data?.data?.financial_statistics;
  const schedule = data?.data?.today_schedule || [];

  return (
    <div className="min-h-screen w-full flex flex-col gap-4 bg-variable-collection-SCREEN-BG-color">
      {/* STATS */}
      <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-5">
        <StatCard
          title="القضايا المفتوحة"
          number={stats?.in_open_count ?? 0}
          icon={<FolderIcon />}
          colors="bg-variable-collection-primary-color/25 text-variable-collection-primary-color"
        />
        <StatCard
          title="قيد التنفيذ"
          number={stats?.in_progress_case_count ?? 0}
          icon={<DonutSmallIcon />}
          colors="bg-[#BA5B08]/25 text-[#BA5B08]"
        />
        <StatCard
          title="القضايا المغلقة"
          number={stats?.closed_case_count ?? 0}
          icon={<TaskAltIcon />}
          colors="bg-variable-collection-sucess-color/25 text-variable-collection-sucess-color"
        />
        <StatCard
          title="الجلسات القادمة"
          number={stats?.upcoming_sessions_count ?? 0}
          icon={<CalendarMonthIcon />}
          colors="bg-[#9747FF]/25 text-[#9747FF]"
        />
      </div>

      {/* MIDDLE */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* CHART */}
        <div className="flex flex-col gap-1 px-4 py-5 bg-white rounded-2xl shadow lg:col-span-2">
          <h2 className="font-bold">نظرة عامة مالية</h2>

          <div className="w-full bg-white rounded-xl pt-8 pb-4 text-gray-400">
            <FinanceChart monthlyData={financial?.monthly_paid} />
          </div>
        </div>

        {/* ALERTS */}
        <div className="flex flex-col gap-4 px-4 py-5 bg-white p-5 rounded-2xl shadow col-span-1">
          <h2 className="font-bold">تنبيهات هامة</h2>

          <div className="space-y-[10px]">
            {(financial?.overdue_invoices_count ?? 0) > 0 && (
              <AlertItem
                title="فواتير متأخرة"
                desc={`لديك ${financial.overdue_invoices_count} فاتورة متأخرة`}
                warning
              />
            )}
            {(financial?.total_unpaid ?? 0) > 0 && (
              <AlertItem
                title="مستحقات غير مدفوعة"
                desc={`إجمالي المستحقات: ${financial.total_unpaid}₿`}
              />
            )}
          </div>
          {alerts.length === 0 && (
            <p className="rounded-xl bg-white p-8 text-center text-sm font-semibold text-gray-500">
              لا توجد تنبيهات
            </p>
          )}
        </div>
      </div>

      {/* BOTTOM */}
      <div className="grid lg:grid-cols-2 gap-[18px]">
        {/* SCHEDULE */}
        <div className="bg-white p-5 rounded-2xl shadow">
          <h2 className="font-bold">جدول اليوم</h2>

          {schedule.length > 0 ? (
            schedule.map((item, index) => (
              <ScheduleItem key={index} item={item} />
            ))
          ) : (
            <p className="text-gray-400 text-center py-4">
              لا توجد جلسات اليوم
            </p>
          )}
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
