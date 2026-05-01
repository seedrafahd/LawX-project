export default function ScheduleItem({ title, time }) {
  return (
    <div className="flex justify-between items-center py-3 border-b border-border">
      <div>
        <h4 className="font-semibold">{title}</h4>
        <p className="text-sm text-muted">مكتب الاجتماعات 1</p>
      </div>
      <span className="text-sm text-gray-500">{time}</span>
    </div>
  );
}
