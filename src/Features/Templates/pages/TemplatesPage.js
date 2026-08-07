import { useState, useEffect, useRef } from "react";
import { Plus, Search, ChevronRight, ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTemplateCategories, useTemplates } from "../hooks/useTemplates";
import TemplateCard from "../components/TemplateCard";
import Loader from "../../../shared/components/Loading";
import { useAuth } from "../../Auth/hooks/useAuth";

export default function TemplatesPage() {
  const { user } = useAuth();
  const isSyndicate = user.role === "syndicate";
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    page: 1,
    title: "",
    category: "",
  });
  const { data, isPending } = useTemplates(filters, user.role);
  const { data: categoriesData } = useTemplateCategories(user.role);
  const categories = categoriesData?.data ?? [];

  const templates = data?.data.data ?? [];
  const pagination = data?.data.pagination ?? null;

  const [searchInput, setSearchInput] = useState("");
  const debounceRef = useRef(null);
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setFilters((prev) => ({
        ...prev,
        title: searchInput,
        page: 1,
      }));
    }, 1000);
    return () => clearTimeout(debounceRef.current);
  }, [searchInput]);

  const handleOpenDetails = (item) => {
    navigate(`/templates/template_details/${item.Template_id}`, {
      state: { template: item },
    });
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= (pagination?.total_pages || 1)) {
      setFilters((prev) => ({
        ...prev,
        page: newPage,
      }));
    }
  };

  const getPageNumbers = () => {
    const total = pagination?.total_pages || 1;
    const current = pagination?.current_page || 1;

    if (total <= 7) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }

    const pages = [1];

    if (current - 1 > 2) pages.push("...");

    const start = Math.max(2, current - 1);
    const end = Math.min(total - 1, current + 1);
    for (let i = start; i <= end; i++) pages.push(i);

    if (current + 1 < total - 1) pages.push("...");

    if (total > 1) pages.push(total);

    return pages;
  };

  return (
    <div className="space-y-5">
      {isPending && <Loader />}
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold text-gray-900">مكتبة القوالب</h1>

          <p className="text-gray-500 mt-1">
            استكشف وأدر القوالب القانونية المعتمدة في النقابة.
          </p>
        </div>

        {isSyndicate && (
          <button
            type="button"
            onClick={() => navigate("/templates/create")}
            className="flex items-center px-6 py-3 gap-2 bg-variable-collection-primary-color text-white rounded-xl"
          >
            <Plus size={18} /> إضافة قالب
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex flex-col lg:flex-row gap-6 items-center">
          <div className="relative w-full lg:w-3/4">
            <Search
              size={20}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              type="text"
              placeholder="ابحث عن عنوان القانون"
              className="w-full h-14 rounded-lg border border-gray-300 bg-[#fafbfd] pr-12 pl-4 outline-none focus:border-2"
            />
          </div>

          <div className="w-full lg:w-1/4">
            <label className="block text-xs text-gray-500 mb-1 px-2">
              التصنيف القانوني
            </label>

            <select
              value={filters.category}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  category: e.target.value,
                  page: 1,
                }))
              }
              className="w-full h-10 rounded-lg border border-gray-300 bg-[#fafbfd] p-2 text-xs text-gray-900 outline-none"
            >
              <option value="">الكل</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Cards */}
      {templates.length ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {templates.map((template, idx) => (
              <TemplateCard
                key={template.Template_id}
                template={template}
                handleOpenDetails={handleOpenDetails}
                isSyndicate={isSyndicate}
              />
            ))}
          </div>

          {/* Pagination */}
          {pagination && pagination.total_pages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-10">
              <button
                onClick={() => handlePageChange(pagination.current_page - 1)}
                disabled={pagination.current_page === 1}
                className="w-10 h-10 border border-gray-600 rounded-md flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronRight size={18} />
              </button>

              {getPageNumbers().map((p, i) =>
                p === "..." ? (
                  <span key={`ellipsis-${i}`} className="px-2 text-gray-400">
                    ...
                  </span>
                ) : (
                  <button
                    key={p}
                    onClick={() => handlePageChange(p)}
                    className={`w-10 h-10 rounded-md ${
                      p === pagination.current_page
                        ? "bg-[#123B75] text-white"
                        : "border border-gray-600"
                    }`}
                  >
                    {p}
                  </button>
                ),
              )}

              <button
                onClick={() => handlePageChange(pagination.current_page + 1)}
                disabled={pagination.current_page === pagination.total_pages}
                className="w-10 h-10 border border-gray-600 rounded-md flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronLeft size={18} />
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="rounded-xl bg-white p-8 text-center text-sm font-semibold text-gray-500">
          لا يوجد قوالب بعد
        </div>
      )}
    </div>
  );
}
