import React, { useState, useEffect, useRef } from "react";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLawyers } from "../hooks/useLawyers";
import Loader from "../../../shared/components/Loading";
import FilterBar from "../components/FilterBar";
import { INITIAL_LAWYERS_FILTERS } from "../helpers/constants";
import LawyerCard from "../components/LawyerCard";
import LawyerPagination from "../components/LawyerPagination";
import { useFilters } from "../../../shared/hooks/useFilters";

export default function LawyersPage() {
  const navigate = useNavigate();
  const debounceRef = useRef(null);
  const [searchInput, setSearchInput] = useState("");
  const { filters, updateFilter } = useFilters(INITIAL_LAWYERS_FILTERS);

  const { data, isPending } = useLawyers(filters);

  const lawyers = data?.data.data ?? [];
  const pagination = data?.pagination ?? null;

  const handleOpenDetails = (lawyer) => {
    navigate(`/lawyers/lawyer_details/${lawyer.id}`, {
      state: { lawyerData: lawyer },
    });
  };

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      updateFilter("search_fullname", searchInput);
      updateFilter("page", 1);
    }, 1000);
    return () => clearTimeout(debounceRef.current);
  }, [searchInput, updateFilter]);

  return (
    <div className="space-y-4">
      {isPending && <Loader />}

      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold text-gray-900">عرض كل المحامين</h1>
          <p className="mt-1 text-gray-600">إدارة جميع المحامين المسجلين</p>
        </div>

        <button
          type="button"
          onClick={() => navigate("/lawyers/create")}
          className="flex items-center px-6 py-3 gap-2 bg-variable-collection-primary-color text-white rounded-xl"
        >
          <Plus size={18} /> إضافة محامي
        </button>
      </div>

      {/* Filter Bar */}
      <FilterBar
        filters={filters}
        updateFilter={updateFilter}
        searchInput={searchInput}
        setSearchInput={setSearchInput}
      />

      {lawyers.length ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lawyers.map((lawyer) => (
            <LawyerCard
              key={lawyer.id}
              data={lawyer}
              handleOpenDetails={handleOpenDetails}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-xl bg-white p-8 text-center text-sm font-semibold text-gray-500">
          لا يوجد محامين بعد
        </div>
      )}
      <LawyerPagination
        pagination={pagination}
        onPageChange={(page) => updateFilter("page", page)}
      />
    </div>
  );
}
