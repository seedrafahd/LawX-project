import { stats } from "../Constants/TaskConfig";

export default function StatsCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {stats.map((item, index) => (
        <div
          key={index}
          className={`${item.bg} rounded-lg h-[100px] px-4 py-3 shadow-[0_2px_10px_rgba(0,0,0,0.03)]`}
        >
          <div className={`text-xs font-semibold ${item.text} opacity-90`}>
            {item.title}
          </div>
          <div className={`text-lg font-bold ${item.text}`}>{item.value}</div>
        </div>
      ))}
    </div>
  );
}
