import { Plus } from "lucide-react";
import AddHearing from "../Components/AddHearingModal";
import HearingsList from "../Components/HearingsList";
import { useDeleteHearing, useHearings } from "../Hooks/useHearings";
import { useParams } from "react-router-dom";
import DeleteModal from "../../../shared/Components/DeleteModal";
import Loader from "../../../shared/Components/Loading";
import { useModal } from "../../../shared/Hooks/useModal";
import { useState } from "react";

export default function HearingsPage() {
  const { id } = useParams();
  const [selectedHearing, setSelectedHearing] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const { data, isPending } = useHearings(id);
  const hearings = data?.data?.sessions ?? [];
  // console.log(hearings);
  const hearingModal = useModal();
  const { mutate: deleteHearing, isPending: isDeleting } = useDeleteHearing();

  const handleEdit = (hearing) => {
    setSelectedHearing(hearing);
    hearingModal.open();
  };

  const handleClose = () => {
    setSelectedHearing(null);
    hearingModal.close();
  };

  const handleAdd = () => {
    setSelectedHearing(null);
    hearingModal.toggle();
  };

  const handleDelete = () => {
    if (!deleteTarget) return;
    deleteHearing(
      { id: deleteTarget.session_id, case_id: id },
      { onSuccess: () => setDeleteTarget(null) },
    );
  };

  return (
    <div className="flex-1 flex flex-col gap-5">
      {isPending && <Loader />}
      <div className="flex justify-between items-center">
        <div className="space-y-2">
          <div className="flex items-center gap-3 text-gray-500 text-sm">
            <span>القضايا</span>
            <span>/</span>
            <span>قضية رقم {hearings[0]?.case_number}</span>
            <span>/</span>
            <span className="text-xs text-variable-collection-primary-color font-bold">
              سجل الجلسات
            </span>
          </div>
          <h2 className="text-gray-900 text-xl font-bold">الجلسات</h2>
        </div>

        <button
          type="button"
          onClick={handleAdd}
          className="flex items-center px-6 py-3 gap-2 bg-variable-collection-primary-color text-white rounded-xl"
        >
          <Plus size={18} /> إضافة جلسة
        </button>
      </div>

      <HearingsList
        hearings={hearings}
        setEditTarget={handleEdit}
        setDeleteTarget={setDeleteTarget}
      />

      <AddHearing
        isOpen={hearingModal.isOpen}
        caseId={id}
        onClose={handleClose}
        selectedHearing={selectedHearing}
      />

      <DeleteModal
        isOpen={!!deleteTarget}
        title="حذف الجلسة"
        description="هل أنت متأكد من حذف هذه الجلسة؟ هذا الإجراء لا يمكن التراجع عنه."
        onConfirm={handleDelete}
        onClose={() => setDeleteTarget(null)}
        isDeleting={isDeleting}
      />
    </div>
  );
}
