import OfficeListView from "./OfficeCasesCard";
import MyCasesView from "./MyCasesCard";
import AllCasesView from "./AllCasesCard";

export default function CasesList({ activeTab, data }) {
  console.log(data);
  return (
    <div className="transition-all duration-300">
      {activeTab === "all" ? (
        <AllCasesView cases={data} />
      ) : activeTab === "office" ? (
        <OfficeListView />
      ) : (
        <MyCasesView />
      )}
    </div>
  );
}
