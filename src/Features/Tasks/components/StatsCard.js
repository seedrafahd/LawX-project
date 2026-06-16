import StatCard from "../../../shared/components/statCard";

export default function StatsCards({ stats }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {stats.map((item, index) => (
        <StatCard key={index} item={item} />
      ))}
    </div>
  );
}
