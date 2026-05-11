import CaseCard from "../CaseCard";

export default function AllCasesView({ cases }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
      {cases?.length ? (
        cases?.map((c) => <CaseCard key={c.id} c={c} />)
      ) : (
        <p className="text-sm font-semibold text-gray-500">لا توجد قضايا بعد</p>
      )}
    </div>
  );
}
