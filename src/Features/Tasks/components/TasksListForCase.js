import { useState } from "react";
import { CirclePlus } from "lucide-react";
import SharedButton from "../../../shared/components/SharedButton";
import { useTasksForCase } from "../hooks/useTasksForCase";
import { useDeleteTask, useUpdateTask } from "../hooks/useTasks";
import TaskModal from "./TaskModal";
import DeleteModal from "../../../shared/components/DeleteModal";
import { useModal } from "../../../shared/hooks/useModal";
import Loader from "../../../shared/components/Loading";
import TaskRowForCase from "./TaskRowForCase";

export default function TasksListForCase({ case_id }) {
  const { data } = useTasksForCase(case_id);
  const tasks = data?.data.data.tasks ?? [];

  const addTaskModal = useModal();
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [editTarget, setEditTarget] = useState(null);
  const { mutate: updateTask, isPending: isUpdating } = useUpdateTask();
  const { mutate: deleteTask, isPending: isDeleting } = useDeleteTask();

  if (isUpdating) return <Loader />;
  return (
    <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-8 space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <h3 className="text-gray-900 font-bold">جدول مهام القضية</h3>
        </div>
        <SharedButton
          onClick={addTaskModal.toggle}
          icon={<CirclePlus size={18} />}
        >
          إضافة مهمة
        </SharedButton>
      </div>

      <div className="relative border-r border-gray-200 space-y-6">
        {/* Item */}
        {tasks.length ? (
          tasks.map((item, i) => (
            <TaskRowForCase
              key={i}
              item={item}
              updateTask={updateTask}
              setEditTarget={setEditTarget}
              setDeleteTarget={setDeleteTarget}
            />
          ))
        ) : (
          <p className="text-sm font-semibold text-gray-500">
            لا توجد مهام لهذه القضية بعد
          </p>
        )}
      </div>

      <TaskModal
        isOpen={addTaskModal.isOpen}
        case_id={case_id}
        onClose={addTaskModal.toggle}
      />

      <TaskModal
        isOpen={!!editTarget}
        case_id={case_id}
        editTask={editTarget}
        onClose={() => setEditTarget(null)}
      />

      <DeleteModal
        isOpen={!!deleteTarget}
        title="حذف المهمة"
        description={`هل أنت متأكد من حذف المهمة "${deleteTarget?.title}"؟`}
        onConfirm={() => {
          deleteTask({ id: deleteTarget.task_id, case_id });
          setDeleteTarget(null);
        }}
        onClose={() => setDeleteTarget(null)}
        isDeleting={isDeleting}
      />
    </div>
  );
}
