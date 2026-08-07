import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import LawRow from "./LawRow";
import { useNavigate } from "react-router-dom";
import { useDeleteLaw } from "../hooks/useLaws";
import DeleteModal from "../../../shared/components/DeleteModal";
import { useState } from "react";

export default function LawsTable({ laws, pagination, onPageChange }) {
  const navigate = useNavigate();
  const [deleteTarget, setDeleteTarget] = useState(null);
  const { mutate: deleteLaw, isPending: isDeleting } = useDeleteLaw();

  const handleOpenDetails = (id) => {
    navigate(`/laws/law_details/${id}`);
  };

  const handleEditLaw = (id) => {
    navigate(`/laws/edit/${id}`);
  };

  // const handleDeleteLaw = (id) => {
  //   mutate(id);
  // };

  const currentPage = pagination?.current_page ?? 1;
  const totalPages = pagination?.total_pages ?? 1;
  const totalItems = pagination?.total_items ?? 0;

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  const handleDelete = () => {
    if (!deleteTarget) return;
    deleteLaw(deleteTarget.id, { onSuccess: () => setDeleteTarget(null) });
  };

  return (
    <div className="bg-white border border-[#d8deea] rounded-xl overflow-hidden shadow-sm">
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1100px]">
          <thead>
            <tr className="bg-[#fbfcfe] border-b border-[#e8edf5] text-right text-xs font-bold text-gray-500">
              <th className="py-5 px-6">عنوان القانون</th>
              <th className="py-5 px-6">رقم القانون</th>
              <th className="py-5 px-6">التصنيف</th>
              <th className="py-5 px-6">الدولة</th>
              <th className="py-5 px-6">تاريخ النفاذ</th>
              <th className="py-5 px-6">الحالة</th>
              <th className="py-5 px-6 text-center">الإجراءات</th>
            </tr>
          </thead>

          <tbody>
            {laws.map((law) => (
              <LawRow
                key={law.id}
                law={law}
                handleOpenDetails={() => handleOpenDetails(law.id)}
                handleEdit={() => handleEditLaw(law.id)}
                setDeleteTarget={() => setDeleteTarget(law)}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer Pagination */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-5 px-6 py-4 bg-[#fafbfd]">
        {/* Right */}
        <div className="flex items-center gap-3 text-[#6f7890]">
          <span>إظهار</span>

          <span className="text-sm">1 من {totalItems} سجلات</span>
        </div>

        {/* Left */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => onPageChange(1)}
            disabled={currentPage <= 1}
            className="w-9 h-9 rounded-lg border border-[#d5dbe8] bg-white flex items-center justify-center disabled:opacity-40"
          >
            <ChevronsRight size={16} />
          </button>

          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage <= 1}
            className="w-9 h-9 rounded-lg border border-[#d5dbe8] bg-white flex items-center justify-center disabled:opacity-40"
          >
            <ChevronRight size={16} />
          </button>

          {pages.map((p) => (
            <button
              key={p}
              onClick={() => onPageChange(p)}
              className={`w-9 h-9 rounded-lg flex items-center justify-center font-semibold ${
                p === currentPage
                  ? "bg-[#34456f] text-white"
                  : "border border-[#d5dbe8] bg-white"
              }`}
            >
              {p}
            </button>
          ))}

          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage >= totalPages}
            className="w-9 h-9 rounded-lg border border-[#d5dbe8] bg-white flex items-center justify-center disabled:opacity-40"
          >
            <ChevronLeft size={16} />
          </button>

          <button
            onClick={() => onPageChange(totalPages)}
            disabled={currentPage >= totalPages}
            className="w-9 h-9 rounded-lg border border-[#d5dbe8] bg-white flex items-center justify-center disabled:opacity-40"
          >
            <ChevronsLeft size={16} />
          </button>
        </div>
      </div>

      <DeleteModal
        isOpen={!!deleteTarget}
        title="حذف القانون"
        description="هل أنت متأكد من حذف هذا القانون؟ هذا الإجراء لا يمكن التراجع عنه."
        onConfirm={handleDelete}
        onClose={() => setDeleteTarget(null)}
        isDeleting={isDeleting}
      />
    </div>
  );
}
