export default function InfoBox({ title, value, icon }) {
  return (
    <div className="">
      <div className="mb-1 flex items-center gap-2 text-gray-600">
        {icon}

        <span className="text-xs font-bold">{title}</span>
      </div>

      <div className="font-bold text-gray-900">{value}</div>
    </div>
  );
}
