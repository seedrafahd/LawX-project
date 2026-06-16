export default function StatCard({ title, number, icon,colors }) {
  return (
    <div className="flex flex-col gap-2 px-5 py-[26px] bg-white p-5 rounded-2xl border border-border">
      <div className={`w-fit ${colors} p-[10px] rounded-full`}>
        {icon}
      </div>

      <div>
        <p className="text-gray-500 mt-2">{title}</p>
        <h3 className="text-2xl font-bold">{number}</h3>
      </div>
    </div>
  );
}
