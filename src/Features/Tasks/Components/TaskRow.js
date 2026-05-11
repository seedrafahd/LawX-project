import { Pencil, Trash2 } from "lucide-react";
import StatusBadge from "./StatusBadge";

export default function TaskRow({ task }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr_1fr_1fr_120px] gap-4 lg:gap-0 items-center px-5 lg:px-7 py-6 border-b border-[#F0F0F2] hover:bg-[#FAFAFB] transition-all">
      {/* Task */}
      <div>
        <h3 className="text-base font-bold text-gray-900 leading-relaxed">
          {task.title}
        </h3>
        <p className="text-gray-500 text-sm">{task.caseNo}</p>
      </div>
      {/* Phase */}
      {/* <div className="flex justify-start lg:justify-center">
                  <span
                    className={`px-5 py-2 rounded-full text-[14px] font-bold ${phaseConfig[task.phase]}`}
                  >
                    {task.phase}
                  </span>
                </div> */}
      {/* Assignee */}
      <div className="flex justify-start lg:justify-center">
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
      </div>
      {/* Due */}
      <div className="text-right lg:text-center">
        <div
          className={`text-sm font-bold ${
            task.overdue ? "text-[#BA1A1A]" : "text-gray-900"
          }`}
        >
          {task.due}
        </div>

        {task.overdue && (
          <div className="text-gray-500 text-xs">{task.overdueText}</div>
        )}
      </div>
      {/* Status */}
      <StatusBadge status={task.status} />
      {/* Actions */}
      <div className="flex justify-start lg:justify-center gap-3">
        <button className="text-[#0050CB] p-2 hover:scale-110 transition-transform">
          <Pencil size={16} strokeWidth={2.3} />
        </button>

        <button className="text-variable-collection-error-color p-2 hover:scale-110 transition-transform">
          <Trash2 size={16} strokeWidth={2.3} />
        </button>
      </div>
    </div>
  );
}
