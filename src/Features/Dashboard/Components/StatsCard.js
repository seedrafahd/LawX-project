export default function StatCard({ title, number, value, icon, positive }) {
  return (
    <div className="flex flex-col gap-2 px-5 py-[26px] bg-white p-5 rounded-2xl border border-border ">
      <div className="flex justify-between">
        <div className="bg-variable-collection-primary-color/25 text-variable-collection-primary-color p-[10px] rounded-full">
          {icon}
        </div>

        <span
          className={`w-[68px] h-[36px] flex items-center justify-center text-lg font-bold px-[2px] py-[6px] rounded-xl ${
            positive ? "bg-green-100 text-green-600" : "bg-red-100 text-red-500"
          }`}
        >
          {value}
        </span>
      </div>

      <div>
        <p className="text-gray-500 mt-2">{title}</p>
        <h3 className="text-2xl font-bold">{number}</h3>
      </div>
    </div>
  );
}
