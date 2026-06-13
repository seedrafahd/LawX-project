export default function StatCard({ title, value, icon, color }) {
  return (
    <div
      className={`flex items-center gap-4 p-6 rounded-lg shadow-sm ${color ? "bg-variable-collection-primary-color text-white" : "bg-white text-gray-900"}`}
    >
      <div
        className={`w-12 h-12 mr-12 rounded-lg flex items-center justify-center ${color ? "bg-white/20" : "bg-[#EFF6FF]"}`}
      >
        {icon}
      </div>

      <div>
        <p className="text-sm">{title}</p>
        <h2 className="text-xl font-bold">{value}</h2>
      </div>
    </div>
  );
}
