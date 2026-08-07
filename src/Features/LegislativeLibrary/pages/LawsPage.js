import React, { useState, useEffect, useRef, useMemo } from "react";
import { useAuth } from "../../Auth/hooks/useAuth";
import { Plus } from "lucide-react";
import LawsTable from "../components/LawsTable";
import { useNavigate } from "react-router-dom";
import { useLawCategories, useLaws, useSearchLaw } from "../hooks/useLaws";
import Loader from "../../../shared/components/Loading";
import { INITIAL_LIBRARY_FILTERS } from "../helpers/constants";
import LegislationCard from "../components/LegislationCard";
import FilterBar from "../components/FilterBar";
import { useFilters } from "../../../shared/hooks/useFilters";

export default function LawsPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const role = user.role;
  const isSyndicate = role === "syndicate";

  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const debounceRef = useRef(null);
  const { filters, updateFilter } = useFilters(INITIAL_LIBRARY_FILTERS);

  const { data, isPending } = useLaws(
    searchQuery ? { ...filters, search: "" } : filters,
    role,
  );
  console.log(data);
  const { data: categoriesData } = useLawCategories(role);
  const {
    mutate,
    data: searchData,
    isPending: isSearching,
  } = useSearchLaw(role);
  const categories = useMemo(
    () => categoriesData?.data.categories ?? [],
    [categoriesData],
  );
  const countries = useMemo(
    () => categoriesData?.data.countries ?? [],
    [categoriesData],
  );
  const isSearchActive = !!searchQuery;
  const legislations = isSearchActive
    ? (searchData?.data ?? [])
    : (data?.legislations ?? []);
  const pagination = isSearchActive ? null : (data?.pagination ?? null);
  const loading = isSearchActive ? isSearching : isPending;

  const countryOptions = useMemo(() => {
    return [
      { value: "", label: "البلد: الكل" },
      ...countries.map((c) => ({ value: c, label: c })),
    ];
  }, [countries]);

  const categoriesOptions = useMemo(() => {
    return [
      { value: "", label: "التصنيف: الكل" },
      ...categories.map((c) => ({ value: c.id, label: c.name })),
    ];
  }, [categories]);

  const handleOpenDetails = (id) => {
    navigate(`/laws/law_details/${id}`);
  };

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      const trimmedSearch = searchInput.trim();

      if (trimmedSearch) {
        setSearchQuery(trimmedSearch);
        mutate({ q: trimmedSearch });
      } else {
        setSearchQuery("");
      }
    }, 1000);

    return () => clearTimeout(debounceRef.current);
  }, [searchInput, mutate]);

  return (
    <div className="space-y-4">
      {loading && <Loader />}
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="">
          <h1 className="text-xl font-bold text-gray-900">
            {isSyndicate ? "عرض كل القوانين" : "المكتبة التشريعية الذكية"}
          </h1>
          <p className="mt-1 text-gray-600">
            {isSyndicate
              ? "إدارة جميع القوانين التشريعية"
              : "بحث في آلاف القوانين والمراسيم باستخدام محرك البحث القانوني المدعوم بالذكاء الاصطناعي"}
          </p>
        </div>

        {isSyndicate && (
          <button
            type="button"
            onClick={(e) => navigate(`/laws/create`)}
            className="flex items-center px-6 py-3 gap-2 bg-variable-collection-primary-color text-white rounded-xl"
          >
            <Plus size={18} /> إضافة قانون
          </button>
        )}
      </div>

      <FilterBar
        filters={filters}
        onFilterChange={updateFilter}
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        countryOptions={countryOptions}
        categoriesOptions={categoriesOptions}
      />

      {/* Table Card */}
      {legislations.length ? (
        isSyndicate ? (
          <LawsTable
            laws={legislations}
            pagination={pagination}
            onPageChange={(page) => updateFilter("page", page)}
          />
        ) : (
          <section className="space-y-6">
            <h2 className="text-xl font-bold text-gray-900">أحدث التشريعات</h2>

            {legislations.map((item) => (
              <LegislationCard
                key={item.id}
                item={item}
                handleOpenDetails={() => handleOpenDetails(item.id)}
              />
            ))}
          </section>
        )
      ) : (
        <div className="rounded-xl bg-white p-8 text-center text-sm font-semibold text-gray-500">
          لا يوجد قوانين بعد
        </div>
      )}
    </div>
  );
}
