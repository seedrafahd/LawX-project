import { Plus } from "lucide-react";
import { FilterToolbar } from "../Components/CasesFilter";
import { useNavigate } from "react-router-dom";
import { useCases } from "../Hooks/useCases";
import { useMemo, useState } from "react";
import CasesList from "../Components/CasesList/CasesList";
import Loader from "../../../shared/Components/Loading";
import SharedButton from "../../../shared/Components/SharedButton";

export default function CasesPage() {
  const navigate = useNavigate();
  const { data, isPending } = useCases();
  const [activeTab, setActiveTab] = useState("all");
  const cases = data?.data?.data?.cases;

  const tabs = [
    { id: "all", label: "كل القضايا" },
    { id: "my", label: "قضاياي" },
    { id: "office", label: "قضايا المكتب" },
  ];

  const [filters, setFilters] = useState({
    tab: "all",
    status: "",
    lawyer: "",
    type: "",
    court: "",
  });

  //   Filter
  const filteredCases = useMemo(() => {
    return cases?.filter((c) => {
      if (filters.tab === "my" && c.assignedTo !== 1) return false;
      if (filters.tab === "office" && !c.isOfficeCase) return false;

      if (filters.status && c.status !== filters.status) return false;
      if (filters.lawyer && c.lawyer !== filters.lawyer) return false;
      if (filters.type && c.type !== filters.type) return false;
      if (filters.court && c.court !== filters.court) return false;

      return true;
    });
  }, [cases, filters]);

  const handleChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleClickTap = (tab) => {
    setActiveTab(tab.id);
    setFilters((prev) => ({
      ...prev,
      tab: tab.id,
    }));
  };

  return (
    <div className="space-y-5 min-h-screen">
      {isPending && <Loader />}
      <div className="flex flex-col gap-5">
        {/* Header */}
        <div className="flex items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">القضايا</h1>
            <p className="text-sm text-gray-500">
              نظرة عامة على جميع ملفات القضايا والنزاعات القانونية النشطة في
              المكتب.
            </p>
          </div>
          <SharedButton
            icon={<Plus size={18} />}
            onClick={(e) => navigate("/cases/create")}
          >
            إنشاء قضية
          </SharedButton>
        </div>

        <div className="flex flex-col gap-8 bg-white px-6 pt-8 pb-6">
          {/* Tabs */}
          <div className="flex gap-6 border-b">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleClickTap(tab)}
                className={`pb-3 text-sm font-medium border-b-2 transition-all ${
                  activeTab === tab.id
                    ? "border-blue-600 text-blue-700"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Filters */}
          <FilterToolbar handleChange={handleChange} />
        </div>
        <CasesList activeTab={activeTab} data={filteredCases} />
      </div>
    </div>
  );
}
