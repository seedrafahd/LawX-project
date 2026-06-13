import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { useDeleteTask, useUpdateTask } from "../hooks/useTasks";
import DeleteModal from "../../../shared/Components/DeleteModal";
import TaskModal from "./TaskModal";
import IconActionButton from "../../../shared/Components/IconActionButton";
import Loader from "../../../shared/Components/Loading";
import { StatusDropdown } from "../../../shared/Components/sharedBadge";
import { statusOptions } from "../helpers/constants";

function isOverdue(dueDate) {
  if (!dueDate || dueDate === "null") return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const due = new Date(dueDate.split("T")[0]);
  return due < today;
}

export default function TaskRow({ task }) {
  const overdue =
    task.task_status !== "completed" && isOverdue(task.task_due_date);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [editTarget, setEditTarget] = useState(null);
  const { mutate: deleteTask, isPending: isDeleting } = useDeleteTask();
  const { mutate: updateTask, isPending: isUpdating } = useUpdateTask();

  if (isUpdating) return <Loader />;
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 lg:gap-0 items-center px-5 lg:px-7 py-6 border-b border-[#F0F0F2] hover:bg-[#FAFAFB] transition-all">
        {/* Task */}
        <div>
          <h3 className="text-base font-bold text-gray-900 leading-relaxed">
            {task.task_title}
          </h3>
          <p className="text-gray-500 text-sm">{task.task_description}</p>
        </div>

        {/* Case */}
        <div className="text-center">
          <h3 className="text-base font-bold text-gray-900 leading-relaxed">
            {task.case_title}
          </h3>
          <p className="text-gray-500 text-sm">
            {task.case_number} _ {task.case_category}
          </p>
        </div>
        {/* Assignee */}
        {/* <div className="flex justify-start lg:justify-center">
          <div className="flex items-center gap-2">
            <img
              src={task.avatar}
              alt={task.assignee}
              className="w-8 h-8 rounded-full object-cover"
            />
            <span className="text-sm text-gray-900 font-medium">
              {task.assignee}
            </span>
          </div>
        </div> */}
        {/* Due */}
        <div className="text-center">
          <div
            className={`text-sm font-bold ${overdue ? "text-[#BA1A1A]" : "text-gray-900"}`}
          >
            {task.task_due_date}
          </div>
        </div>
        {/* Status */}
        <div className="flex justify-center">
          <StatusDropdown
            value={task.task_status}
            options={statusOptions}
            onChange={(e) => {
              updateTask({
                task_id: task.task_id,
                status: e,
              });
            }}
          />
        </div>
        {/* Actions */}
        <div className="flex justify-start lg:justify-center lg:gap-3">
          {/* <button
            onClick={() => setEditTarget(task)}
            className="text-[#0050CB] p-1 sm:p-2 hover:scale-110 transition-transform"
          >
            <Pencil size={16} strokeWidth={2.3} />
          </button>

          <button
            onClick={() => setDeleteTarget(task)}
            className="text-variable-collection-error-color p-1 lg:p-2 hover:scale-110 transition-transform"
          >
            <Trash2 size={16} strokeWidth={2.3} />
          </button> */}

          <IconActionButton icon={Pencil} onClick={() => setEditTarget(task)} />
          <IconActionButton
            icon={Trash2}
            variant="danger"
            onClick={() => setDeleteTarget(task)}
          />
        </div>
      </div>

      <DeleteModal
        isOpen={!!deleteTarget}
        title="حذف المهمة"
        description={`هل أنت متأكد من حذف المهمة "${deleteTarget?.task_title}"؟`}
        onConfirm={() => {
          deleteTask({
            id: deleteTarget.task_id,
            case_id: deleteTarget.case_id,
          });
          setDeleteTarget(null);
        }}
        onClose={() => setDeleteTarget(null)}
        isDeleting={isDeleting}
      />

      <TaskModal
        isOpen={!!editTarget}
        case_id={task.case_id}
        editTask={editTarget}
        onClose={() => setEditTarget(null)}
      />
    </>
  );
}
