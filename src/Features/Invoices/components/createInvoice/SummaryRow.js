export default function SummaryRow({ title, value }) {
  return (
    <div className="flex items-center justify-between text-xs text-gray-700">
      <span>{title}</span>

      <span>{value}</span>
    </div>
  );
}
