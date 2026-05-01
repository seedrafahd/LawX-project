import CaseCard from "./CaseCard";

export default function AllCasesView({ cases }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
      {cases?.map((c) => (
        <CaseCard key={c.id} c={c} />
      ))}
    </div>
  );
}
