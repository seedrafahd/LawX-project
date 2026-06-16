import { Plus } from "lucide-react";
import { useMemo } from "react";
import { FilterToolbar } from "../Components/CasesFilter";
import { useNavigate } from "react-router-dom";
import { useCases } from "../hooks/useCases";
import CasesList from "../Components/CasesList/CasesList";
import Loader from "../../../shared/components/Loading";
import SharedButton from "../../../shared/components/SharedButton";
import { useFilters } from "../../../shared/hooks/useFilters";
import { CASES_TABS, INITIAL_CASES_FILTERS } from "../helpers/constants";
import { useFilteredCases } from "../hooks/useFilteredCases";

export default function CasesPage() {
  const navigate = useNavigate();
  const { data, isPending } = useCases();
  const cases = data?.data?.data?.cases;

  const teamMembers = useMemo(() => {
    if (!cases) return [];
    const map = new Map();
    cases.forEach((c) => {
      (c.team || []).forEach((m) => {
        const name = m.name || m;
        if (!map.has(name)) map.set(name, { name });
      });
    });
    return Array.from(map.values());
  }, [cases]);

  const { filters, updateFilter } = useFilters(INITIAL_CASES_FILTERS);
  const filteredCases = useFilteredCases({
    cases,
    filters,
  });

  if (isPending) return <Loader />;
  return (
    <div className="space-y-5 min-h-screen">
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
            onClick={() => navigate("/cases/create")}
          >
            إنشاء قضية
          </SharedButton>
        </div>

        <div className="flex flex-col gap-8 bg-white px-6 pt-8 pb-6">
          {/* Tabs */}
          <div className="flex gap-6 border-b">
            {CASES_TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => updateFilter("tab", tab.id)}
                className={`pb-3 text-sm font-medium border-b-2 transition-all ${
                  filters.tab === tab.id
                    ? "border-blue-600 text-blue-700"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Filters */}
          <FilterToolbar
            handleChange={updateFilter}
            teamMembers={teamMembers}
          />
        </div>
        <CasesList activeTab={filters.tab} data={filteredCases} />
      </div>

      {/* <EditCaseModal isOpen={caseModal.isOpen} setEditOpen={caseModal.toggle} /> */}
    </div>
  );
}
