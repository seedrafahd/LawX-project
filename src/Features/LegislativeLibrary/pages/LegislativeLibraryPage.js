import React, { useMemo } from "react";
import LegislationCard from "../components/LegislationCard";
import { useLaws } from "../hooks/useLaws";
import FilterBar from "../components/FilterBar";
import { useFilters } from "../../../shared/hooks/useFilters";
import { INITIAL_LIBRARY_FILTERS } from "../helpers/constants";
import { useFilteredLibrary } from "../hooks/useFilteredLibrary";
import Loader from "../../../shared/components/Loading";

export default function LegislativeLibraryPage() {
  const { data, isPending } = useLaws();
  const legislations = useMemo(() => data?.legislations ?? [], [data]);

  const { filters, updateFilter } = useFilters(INITIAL_LIBRARY_FILTERS);

  const countryOptions = useMemo(() => {
    const countries = [
      ...new Set(legislations.map((c) => c.country).filter(Boolean)),
    ];
    return [
      { value: "", label: "البلد: الكل" },
      ...countries.map((c) => ({ value: c, label: c })),
    ];
  }, [legislations]);

  const filteredLegislations = useFilteredLibrary({
    legislations,
    filters,
  });

  return (
    <div className="space-y-8">
      {isPending && <Loader />}
      <div>
        <h1 className="text-xl font-bold text-gray-900 mb-1">
          {" "}
          المكتبة التشريعية الذكية
        </h1>
        <p className="text-sm text-gray-600">
          بحث في آلاف القوانين والمراسيم باستخدام محرك البحث القانوني المدعوم
          بالذكاء الاصطناعي
        </p>
      </div>
      {/* Filter Bar */}
      <FilterBar
        filters={filters}
        onFilterChange={updateFilter}
        countryOptions={countryOptions}
      />

      {/* Legislations */}
      {filteredLegislations.length > 0 ? (
        <section className="space-y-6">
          <h2 className="text-xl font-bold text-gray-900">أحدث التشريعات</h2>

          {filteredLegislations.map((item) => (
            <LegislationCard key={item.id} item={item} />
          ))}
        </section>
      ) : (
        <p className="rounded-xl bg-white p-8 text-center text-sm font-semibold text-gray-500">
          لا توجد تشريعات بعد
        </p>
      )}
    </div>
  );
}
