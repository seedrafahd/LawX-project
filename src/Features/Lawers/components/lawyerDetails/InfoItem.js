export default function InfoItem({ title, value }) {
  return (
    <div className="flex flex-col">
      <span className="text-gray-500 text-sm mb-1">{title}</span>

      <div className="font-semibold text-gray-800 ">{value}</div>
    </div>
  );
}
