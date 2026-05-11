import { statusConfig } from "../Constants/TaskConfig";

export default function StatusBadge({ status }) {
  const config = statusConfig[status];

  return (
    <div className="flex justify-start lg:justify-center">
      <div
        className={`inline-flex items-center gap-[6px] px-3 py-1 rounded-full text-xs font-bold ${config.bg} ${config.text}`}
      >
        {config.icon}
        {config.label}
      </div>
    </div>
  );
}
