import { Eye, FileText, Pencil, Trash2 } from "lucide-react";
import { statusStyles } from "../helpers/constants";
import { getDate } from "../../../shared/helpers/date";

const getStatusClasses = (status) => {
  const style = statusStyles[status];
  if (!style) return "bg-slate-100 text-slate-600";
  const colorMap = {
    green: "bg-emerald-100 text-emerald-700",
    yellow: "bg-amber-100 text-amber-700",
    red: "bg-red-100 text-red-600",
  };
  return colorMap[style.color] ?? "bg-slate-100 text-slate-600";
};

export default function LawRow({
  law,
  handleOpenDetails,
  handleEdit,
  setDeleteTarget,
}) {
  return (
    <tr
      key={law.id}
      className="border-b border-[#edf1f6] text-sm text-[#5f6880] hover:bg-[#fafcff] transition"
    >
      {/* Law Name */}
      <td className="px-6 py-6">
        <div className="flex items-center gap-2">
          <div className="bg-[#eef2fb] rounded-lg w-9 h-9 flex items-center justify-center">
            <FileText size={18} className="text-[#5d6d9f]" />
          </div>

          <span className="font-bold text-[#24365e]">{law.title}</span>
        </div>
      </td>

      <td className="px-6 py-6">{law.law_number}</td>
      <td className="px-6 py-6">{law.category?.name}</td>
      <td className="px-6 py-6">{law.country}</td>
      <td className="px-6 py-6">{getDate(law.publish_date)}</td>
      <td className="px-6 py-6">
        <span
          className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold ${getStatusClasses(
            law.status,
          )}`}
        >
          <span className="w-2 h-2 rounded-full bg-current opacity-80" />
          {statusStyles[law.status]?.text ?? law.status}
        </span>
      </td>

      <td className="px-6 py-6">
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={handleOpenDetails}
            className="text-[#47557f] hover:text-[#2e3e6b]"
          >
            <Eye size={20} />
          </button>

          <button
            onClick={handleEdit}
            className="text-[#5a6383] hover:text-[#2e3e6b]"
          >
            <Pencil size={18} />
          </button>

          <button
            onClick={setDeleteTarget}
            className="text-red-600 hover:text-red-700"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </td>
    </tr>
  );
}
