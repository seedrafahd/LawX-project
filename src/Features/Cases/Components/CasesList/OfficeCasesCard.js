import CaseCard from "../CaseCard";

export default function OfficeListView({ cases }) {
  return (
    <div className="space-y-4">
      {cases?.length ? (
        cases?.map((c) => <CaseCard key={c.id} c={c} />)
      ) : (
        <p className="text-sm font-semibold text-gray-500">لا توجد قضايا بعد</p>
      )}
    </div>
  );
}
