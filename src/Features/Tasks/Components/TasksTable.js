import Pagination from "./Pagination";
import TaskRow from "./TaskRow";

export default function TasksTable({
  tasks,
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  currentItems,
}) {
  return (
    <>
      {tasks.length ? (
        <div className="bg-white rounded-[24px] overflow-hidden">
          <div className="hidden md:grid grid-cols-5  bg-[#F3F4F5] px-8 py-5 text-gray-700 text-xs font-bold">
            <div>المهمة </div>
            <div className="text-center">القضية</div>
            {/* <div className="text-center">المسؤول</div> */}
            <div className="text-center">تاريخ الاستحقاق</div>
            <div className="text-center">الحالة</div>
            <div className="text-center">الإجراءات</div>
          </div>

          <div className="max-h-[600px] overflow-y-auto">
            {tasks.map((task) => (
              <TaskRow key={task.task_id} task={task} />
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
            totalItems={totalItems}
            currentItems={currentItems}
          />
        </div>
      ) : (
        <p className="text-sm font-semibold text-gray-500">لا توجد جلسات بعد</p>
      )}
    </>
  );
}
