export default function StatCard({ item }) {
  return (
    <div
      className={`${item.bg ?? "bg-white"} ${item.text} h-[80px] min-w-[182px] rounded-lg px-4 py-3 shadow-[0_2px_10px_rgba(0,0,0,0.03)]`}
    >
      <p className={`text-xs font-semibold opacity-90`}>{item.title}</p>
      <p className={`text-lg font-bold`}>{item.value}</p>
    </div>
  );
}
