import { Check, CirclePlus, Clock } from "lucide-react";
import SharedButton from "../../../shared/Components/SharedButton";
import { useTasksForCase } from "../Hooks/useTasksForCase";
import AddTaskModal from "../Pages/CreateTaskModal";
import { useState } from "react";
// [
//           {
//             title: "تقديم لائحة الدعوى الافتتاحية",
//             done: true,
//             date: "تم توثيق وتقديم كافة المستندات عبر بوابة ناجز - 14 أكتوبر 2023",
//             status: "مكتمل",
//           },
//           {
//             title: "عقد الجلسة التحضيرية الأولى",
//             done: true,
//             date: "02 نوفمبر 2023",
//             status: "مكتمل",
//           },
//           {
//             title: "جلسة النطق بالحكم التمهيدي",
//             done: false,
//             date: "غداً، 10:30 صباحاً",
//             status: "قيد الانتظار",
//           },
//         ]
export default function TasksListForCase({ case_id }) {
  const { data } = useTasksForCase(case_id);
  const tasks = data?.data.data.tasks;
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  console.log(tasks);
  return (
    <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-8 space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-gray-900 font-bold">جدول مهام القضية</h3>
        <SharedButton
          onClick={() => setIsAddTaskOpen(true)}
          icon={<CirclePlus size={18} />}
        >
          إضافة مهمة
        </SharedButton>
      </div>

      <div className="relative border-r border-gray-200 pr-10 space-y-6">
        {/* Item */}
        {tasks?.map((item, i) => (
          <div
            key={i}
            className="relative flex flex-col gap-3 rounded-lg py-1 sm:flex-row sm:items-start sm:justify-between"
          >
            <div className="absolute right-[-58px] top-0">
              {item.status === "completed" ? (
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white">
                  <Check className="h-4 w-4 stroke-[4]" />
                </div>
              ) : (
                <div className="flex h-9 w-9 items-center justify-center rounded-full border-[2px] border-blue-100 bg-white text-blue-600">
                  <Clock className="h-4 w-4" />
                </div>
              )}
            </div>

            <div className="min-w-0 flex-1 space-y-2">
              <h4
                className={`text-sm font-bold text-gray-900
                    }`}
              >
                {item.title}
              </h4>
              <div className="flex gap-2">
                <p className="text-xs font-medium text-[#586579]">
                  {item.description}
                </p>
                <p className="text-xs font-medium text-[#586579]">
                  {item.created_at}
                </p>
              </div>
            </div>

            <span
              className={`inline-flex items-center gap-1 min-w-20 justify-center border rounded-full px-2 py-1 text-xs ${
                item.status === "completed"
                  ? "bg-[#DCFCE7] border-[#22C55E]/60 text-[#22C55E]"
                  : item.status === "pending"
                    ? "bg-orange-100 border-orange-500 text-orange-500"
                    : "bg-blue-100 border-blue-500 text-blue-500"
              }`}
            >
              <div
                className={`h-1.5 w-1.5 rounded-full ${
                  item.status === "completed"
                    ? "bg-[#22C55E]"
                    : item.status === "pending"
                      ? "bg-orange-500"
                      : "bg-blue-100 border-blue-500 text-blue-500"
                }`}
              />

              <span>{item.status}</span>
            </span>
          </div>
        ))}
      </div>

      <AddTaskModal
        isOpen={isAddTaskOpen}
        case_id={case_id}
        onClose={() => setIsAddTaskOpen(false)}
      />
    </div>
  );
}
