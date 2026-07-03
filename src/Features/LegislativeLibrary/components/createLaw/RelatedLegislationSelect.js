import { useState, useMemo } from "react";
import { Link2, Search, X, Check } from "lucide-react";
import { useLaws } from "../../hooks/useLaws";
import SharedField from "../../../../shared/components/SharedFeild";

export default function RelatedLegislationSelect({
  selectedIds,
  onChange,
  error,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const { data, isLoading } = useLaws();

  const legislations = useMemo(() => {
    return data?.legislations ?? [];
  }, [data]);

  const filtered = useMemo(() => {
    if (!search.trim()) return legislations;
    const q = search.trim().toLowerCase();
    return legislations.filter(
      (law) =>
        law.title?.toLowerCase().includes(q) ||
        law.law_number?.toLowerCase().includes(q),
    );
  }, [legislations, search]);

  const selectedLaws = legislations.filter((law) =>
    selectedIds.includes(law.id),
  );

  const toggleLaw = (lawId) => {
    const next = selectedIds.includes(lawId)
      ? selectedIds.filter((id) => id !== lawId)
      : [...selectedIds, lawId];
    onChange(next);
  };

  return (
    <>
      <SharedField label="التشريعات المرتبطة" error={error}>
        <div
          onClick={() => setIsOpen(true)}
          className="flex min-h-12 w-full cursor-pointer flex-wrap items-center gap-2 rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-sm text-gray-700 transition hover:border-blue-400"
        >
          {selectedLaws.length === 0 ? (
            <span className="text-gray-400">اختر التشريعات المرتبطة...</span>
          ) : (
            selectedLaws.map((law) => (
              <span
                key={law.id}
                className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800"
              >
                {law.title}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleLaw(law.id);
                  }}
                  className="hover:text-blue-600"
                >
                  <X size={14} />
                </button>
              </span>
            ))
          )}
          <Link2 size={16} className="mr-auto text-gray-400" />
        </div>
      </SharedField>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#00000066] px-4 py-6 backdrop-blur-[6px]"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="flex max-h-[80vh] w-full max-w-lg flex-col rounded-xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-gray-100 p-4">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="rounded-full p-2 text-gray-600 hover:bg-gray-200"
              >
                <X size={20} />
              </button>
              <h2 className="font-bold text-gray-900">التشريعات المرتبطة</h2>
            </div>

            <div className="border-b border-gray-100 p-4">
              <div className="relative">
                <Search
                  size={18}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  className="h-10 w-full rounded-lg border border-gray-300 bg-gray-50 pr-10 text-sm text-gray-700 outline-none transition placeholder:text-gray-400"
                  placeholder="بحث عن تشريع..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  autoFocus
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-2">
              {isLoading ? (
                <p className="py-8 text-center text-sm text-gray-400">
                  جاري التحميل...
                </p>
              ) : filtered.length === 0 ? (
                <p className="py-8 text-center text-sm text-gray-400">
                  لا توجد تشريعات
                </p>
              ) : (
                filtered.map((law) => {
                  const isSelected = selectedIds.includes(law.id);
                  return (
                    <div
                      key={law.id}
                      onClick={() => toggleLaw(law.id)}
                      className={`flex cursor-pointer items-center gap-3 rounded-lg px-3 py-3 transition hover:bg-blue-50 ${
                        isSelected ? "bg-blue-50" : ""
                      }`}
                    >
                      <span
                        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 transition ${
                          isSelected
                            ? "border-blue-600 bg-blue-600 text-white"
                            : "border-gray-300 bg-white"
                        }`}
                      >
                        {isSelected && <Check size={14} strokeWidth={3} />}
                      </span>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">
                          {law.title}
                        </p>
                        <p className="text-xs text-gray-500">
                          {law.law_number && `${law.law_number} • `}
                          {law.country}
                        </p>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            <div className="flex items-center justify-between border-t border-gray-100 bg-gray-50 p-4">
              <span className="text-sm text-gray-600">
                {selectedIds.length > 0
                  ? `تم اختيار ${selectedIds.length} تشريع${selectedIds.length > 2 ? "ات" : selectedIds.length > 1 ? "ين" : ""}`
                  : "لم يتم اختيار أي تشريع"}
              </span>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="rounded-lg bg-blue-700 px-6 py-2 text-sm font-semibold text-white transition hover:bg-blue-800"
              >
                تأكيد
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
