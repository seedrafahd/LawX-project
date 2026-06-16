import { Pencil, Trash2 } from "lucide-react";
import IconActionButton from "../../../shared/components/IconActionButton";
import { StatusDropdown } from "../../../shared/components/sharedBadge";
import TeamAvatars from "../../../shared/components/TeamAvatars";
import { statusOptions } from "../helpers/constants";

export default function TaskRowForCase({
  item,
  updateTask,
  setEditTarget,
  setDeleteTarget,
}) {
  return (
    <div className="relative flex flex-col gap-3 rounded-lg py-1 sm:flex-row sm:items-start sm:justify-between">
      <TeamAvatars team={item?.assigned_to} />

      <div className="min-w-0 flex-1 space-y-2">
        <h4 className="text-sm font-bold text-gray-900">{item.title}</h4>
        <div className="flex gap-2">
          <p className="text-xs font-medium text-[#586579]">
            {item.description}
          </p>
          <p className="text-xs font-medium text-[#586579]">{item.Due_date}</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <StatusDropdown
          value={item.status}
          options={statusOptions}
          onChange={(e) => {
            updateTask({
              task_id: item.task_id,
              status: e,
            });
          }}
        />

        <IconActionButton icon={Pencil} onClick={() => setEditTarget(item)} />
        <IconActionButton
          icon={Trash2}
          variant="danger"
          onClick={() => setDeleteTarget(item)}
        />
      </div>
    </div>
  );
}
