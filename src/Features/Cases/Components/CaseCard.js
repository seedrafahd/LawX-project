import {
  CalendarDays,
  EllipsisVertical,
  Paperclip,
  Trash2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { StatusDropdown } from "../../../shared/components/sharedBadge";
import TeamAvatars from "../../../shared/components/TeamAvatars";
import { useDeleteCase, useUpdateCase } from "../hooks/useCases";
import DeleteModal from "../../../shared/components/DeleteModal";
import Loader from "../../../shared/components/Loading";
import { useRef, useState } from "react";
import { statusOptions } from "../helpers/constants";

export default function CaseCard({ c }) {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const menuRef = useRef(null);
  const { mutate: deleteCase, isPending: isDeleting } = useDeleteCase();
  const { mutate: updateCase, isPending: isUpdating } = useUpdateCase(c.id);

  const handleDelete = () => {
    deleteCase(c.id, { onSuccess: () => setDeleteOpen(false) });
  };

  if (isUpdating) return <Loader />;

  return (
    <div className="bg-white rounded-2xl border-r-4 border-blue-600 p-6 space-y-4 font-[Cairo]">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-bold">
              {c?.title || "لا يوجد عنوان للقضية"}
            </h2>

            <StatusDropdown
              value={c.status}
              options={statusOptions}
              onChange={(e) => {
                updateCase({ status: e, case_id: c.id });
              }}
            />
          </div>

          <div className="text-sm text-gray-500">
            <span>{c?.description || "لا يوجد وصف"}</span>
          </div>
        </div>
        <TeamAvatars team={c?.team} />
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4">
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <CalendarDays size={16} />
            <span>آخر تحديث: {c.created_at} </span>
          </div>

          <div className="flex items-center gap-1">
            <Paperclip size={16} />
            <span>{c.documents_count} ملف</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() =>
              navigate(`/cases/case_details/${c.id}`, {
                state: { caseData: c },
              })
            }
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-1 md:px-4 py-2 rounded-lg text-sm"
          >
            عرض التفاصيل
          </button>

          <div className="relative" ref={menuRef}>
            <button onClick={() => setMenuOpen((prev) => !prev)}>
              <EllipsisVertical size={14} />
            </button>

            {menuOpen && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setMenuOpen(false)}
                />
                <div className="absolute left-0 bottom-full mb-1 z-20 min-w-36 rounded-lg bg-white shadow-lg border border-gray-200 py-1">
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      setDeleteOpen(true);
                    }}
                    className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    <Trash2 size={14} /> حذف
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <DeleteModal
        isOpen={deleteOpen}
        title="حذف القضية"
        description="هل أنت متأكد من حذف هذه القضية؟ هذا الإجراء لا يمكن التراجع عنه."
        onConfirm={handleDelete}
        onClose={() => setDeleteOpen(false)}
        isDeleting={isDeleting}
      />
    </div>
  );
}
