import { Calendar, EllipsisVertical, Pencil, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { useDeleteTemplate } from "../hooks/useTemplates";
import DeleteModal from "../../../shared/components/DeleteModal";

export default function TemplateCard({
  template,
  handleOpenDetails,
  isSyndicate,
}) {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const menuRef = useRef(null);
  const { mutate: deleteTemplate, isPending: isDeleting } = useDeleteTemplate();

  const handleEdit = (e) => {
    e.stopPropagation();
    setMenuOpen(false);
    navigate(`/templates/edit/${template.Template_id}`);
  };

  const handleDelete = () => {
    deleteTemplate(template.Template_id, {
      onSuccess: () => setDeleteOpen(false),
    });
  };

  return (
    <>
      <article
        onClick={() => handleOpenDetails(template)}
        className="bg-white cursor-pointer rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition p-6"
      >
        <div className="flex flex-col h-full">
          <div className="flex justify-between">
            <span className="mt-2 text-gray-600 text-xs font-bold">
              {template.category}
            </span>
            {isSyndicate && (
              <div className="relative" ref={menuRef}>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setMenuOpen((prev) => !prev);
                  }}
                  className="text-gray-400 hover:text-gray-600 transition"
                >
                  <EllipsisVertical size={18} />
                </button>

                {menuOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      onClick={(e) => {
                        e.stopPropagation();
                        setMenuOpen(false);
                      }}
                    />
                    <div className="absolute left-0 top-full mt-1 z-20 min-w-36 rounded-lg bg-white shadow-lg border border-gray-200 py-1">
                      <button
                        onClick={handleEdit}
                        className="flex w-full items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        <Pencil size={14} /> تعديل
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
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
            )}
          </div>

          <h3 className="mt-1 text-xl font-bold text-gray-900 leading-relaxed">
            {template.title}
          </h3>

          <div className="flex items-center gap-2 mt-4 text-gray-500 text-sm">
            <Calendar size={14} />
            {template.Created_At_Date}
          </div>
        </div>
      </article>

      <DeleteModal
        isOpen={deleteOpen}
        title="حذف القالب"
        description="هل أنت متأكد من حذف هذا القالب؟ هذا الإجراء لا يمكن التراجع عنه."
        onConfirm={handleDelete}
        onClose={() => setDeleteOpen(false)}
        isDeleting={isDeleting}
      />
    </>
  );
}
