import React, { useState, useEffect, useRef } from "react";
import { Plus, Search } from "lucide-react";
import LawsTable from "../components/LawsTable";
import { useNavigate } from "react-router-dom";
import { useLawCategories, useLaws, useSearchLaw } from "../hooks/useLaws";
import Loader from "../../../shared/components/Loading";
import { STATUS_OPTIONS } from "../helpers/constants";

export default function LawsPage() {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    page: 1,
    search: "",
    category_id: "",
    status: "",
    country: "",
  });
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const debounceRef = useRef(null);
  const { data, isPending } = useLaws(
    searchQuery ? { ...filters, search: "" } : filters,
  );
  const { data: categoriesData } = useLawCategories();
  const { mutate, data: searchData, isPending: isSearching } = useSearchLaw();
  const categories = categoriesData?.data.categories ?? [];
  const countries = categoriesData?.data.countries ?? [];
  const isSearchActive = !!searchQuery;
  const legislations = isSearchActive
    ? (searchData?.data ?? [])
    : (data?.legislations ?? []);
  const pagination = isSearchActive ? null : (data?.pagination ?? null);
  const loading = isSearchActive ? isSearching : isPending;

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      if (searchInput) {
        setSearchQuery(searchInput);
        mutate({ q: searchInput });
      } else {
        setSearchQuery("");
      }
    }, 1000);
    return () => clearTimeout(debounceRef.current);
  }, [searchInput]);

  return (
    <div className="space-y-4">
      {loading && <Loader />}
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="">
          <h1 className="text-xl font-bold text-gray-900">عرض كل القوانين</h1>
          <p className="mt-1 text-gray-600">إدارة جميع القوانين التشريعية</p>
        </div>

        <button
          type="button"
          onClick={(e) => navigate(`/laws/create`)}
          className="flex items-center px-6 py-3 gap-2 bg-variable-collection-primary-color text-white rounded-xl"
        >
          <Plus size={18} /> إضافة قانون
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-[#d8deea] shadow-sm p-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-end">
          {/* Search */}
          <div className="lg:col-span-6">
            <div className="relative">
              <Search
                size={20}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                type="text"
                placeholder="ابحث باسم القانون"
                className="w-full h-14 rounded-lg border border-gray-300 bg-[#fafbfd] pr-12 pl-4 outline-none focus:border-2"
              />
            </div>
          </div>

          {/* Dropdowns */}
          <div className="lg:col-span-2">
            <label className="block text-xs text-gray-500 mb-1 px-2">
              التصنيف القانوني
            </label>

            <select
              value={filters.category_id}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  category_id: e.target.value,
                  page: 1,
                }))
              }
              className="w-full h-10 rounded-lg border border-gray-300 bg-[#fafbfd] p-2 text-xs text-gray-900"
            >
              <option value="">الكل</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="lg:col-span-2">
            <label className="block text-xs text-gray-500 mb-1 px-2">
              حالة القانون
            </label>

            <select
              value={filters.status}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  status: e.target.value,
                  page: 1,
                }))
              }
              className="w-full h-10 rounded-lg border border-gray-300 bg-[#fafbfd] p-2 text-xs text-gray-900"
            >
              {STATUS_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="lg:col-span-2">
            <label className="block text-xs text-gray-500 mb-1 px-2">
              الدولة
            </label>

            <select
              value={filters.country}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  country: e.target.value,
                  page: 1,
                }))
              }
              className="w-full h-10 rounded-lg border border-gray-300 bg-[#fafbfd] p-2 text-xs text-gray-900"
            >
              <option value="">الكل</option>
              {countries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Table Card */}
      {legislations.length ? (
        <LawsTable
          laws={legislations}
          pagination={pagination}
          onPageChange={(page) =>
            setFilters((prev) => ({
              ...prev,
              page,
            }))
          }
        />
      ) : (
        <div className="rounded-xl bg-white p-8 text-center text-sm font-semibold text-gray-500">
          لا يوجد قوانين بعد
        </div>
      )}
    </div>
  );
}
