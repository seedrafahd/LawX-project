export default function ScheduleItem({ item }) {
  const time = item?.date
    ? new Date(item.date).toLocaleTimeString("ar-EG", {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";

  return (
    <div className="flex justify-between items-center py-3 border-b border-border">
      <div>
        <h4 className="font-semibold">{item?.title}</h4>
        <p className="text-sm text-muted">{item?.location || "مكتب الاجتماعات 1"}</p>
      </div>
      <span className="text-sm text-gray-500">{time}</span>
    </div>
  );
}
