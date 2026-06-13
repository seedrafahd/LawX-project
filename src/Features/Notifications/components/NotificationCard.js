import { Eye } from "lucide-react";
import { getNotificationStyle } from "../helpers/constants";

export default function NotificationCard({ item, onClick }) {
  const { icon, bg } = getNotificationStyle(item.type);

  return (
    <div
      // onClick={onClick}
      className={`bg-white rounded-xl border border-gray-100 shadow-md px-4 md:px-6 py-4 flex items-center justify-between gap-4 hover:shadow-lg transition ${
        !item.isRead
          ? "border-r-4 border-r-blue-600"
          : "border-r-4 border-r-green-600"
      }`}
    >
      <div className="flex items-center gap-5">
        <div className={`rounded p-2 text-white ${bg}`}>{icon}</div>

        <div>
          <h3 className="font-semibold text-gray-900">{item.title}</h3>

          <p className="text-sm text-gray-500">{item.description}</p>
        </div>
      </div>

      <div>
        {!item.isRead && (
          <Eye
            size={18}
            className="w-full text-blue-500 cursor-pointer"
            onClick={onClick}
          />
        )}
        <span className="text-xs text-gray-400 whitespace-nowrap">
          {item.time}
        </span>
      </div>
    </div>
  );
}
