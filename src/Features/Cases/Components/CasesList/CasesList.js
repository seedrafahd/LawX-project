import AllCasesView from "./AllCasesCard";

export default function CasesList({ activeTab, data }) {
  return (
    <div className="transition-all duration-300">
      <AllCasesView cases={data} />
    </div>
  );
}
