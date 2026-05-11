import Pagination from "./Pagination";
import TaskRow from "./TaskRow";

const tasksData = [
  {
    id: 1,
    title: "مراجعة مذكرات الدفاع النهائية",
    caseNo: "قضية رقم 4412 - نزاع تجاري",
    phase: "الجلسات",
    assignee: "خالد الفيصل",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
    due: "24 أكتوبر",
    overdue: true,
    overdueText: "منذ يومين",
    status: "pending",
  },
  {
    id: 2,
    title: "تجهيز مستندات الملكية",
    caseNo: "قضية رقم 3982 - إفراغ عقاري",
    phase: "التوثيق",
    assignee: "سارة الهاشم",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
    due: "27 أكتوبر",
    overdue: false,
    status: "progress",
  },
  {
    id: 3,
    title: "مقابلة الشهود الأولية",
    caseNo: "قضية رقم 5501 - جنائي",
    phase: "التحقيق",
    assignee: "منصور الحربي",
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format&fit=crop",
    due: "تم في 22 أكتوبر",
    overdue: false,
    status: "done",
  },
];

export default function TasksTable() {
  return (
    <div className="bg-white rounded-[24px] overflow-hidden">
      <div className="hidden lg:grid grid-cols-[2fr_1fr_1fr_1fr_120px] bg-[#F3F4F5] px-8 py-5 text-gray-700 text-xs font-bold">
        <div>المهمة والقضية</div>
        {/* <div className="text-center">المرحلة</div> */}
        <div className="text-center">المسؤول</div>
        <div className="text-center">تاريخ الاستحقاق</div>
        <div className="text-center">الحالة</div>
        <div className="text-center">الإجراءات</div>
      </div>

      {/* Pagination */}
      <div className="max-h-[600px] overflow-y-auto">
        {tasksData.map((task) => (
          <TaskRow key={task.id} task={task} />
        ))}
      </div>

      <Pagination />
    </div>
  );
}
