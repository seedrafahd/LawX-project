import DeleteModal from "../../../../shared/components/DeleteModal";
import { useModal } from "../../../../shared/hooks/useModal";
import { useDeleteOffer } from "../hooks/useOffers";

export default function DeleteOfferAction({ offerId, children, onSuccess }) {
  const deleteModal = useModal();

  const { mutate, isPending } = useDeleteOffer();

  const handleOpen = (e) => {
    e.stopPropagation();
    deleteModal.open();
  };

  const handleDelete = () => {
    mutate(offerId, {
      onSuccess: () => {
        deleteModal.close();

        onSuccess?.();
      },
    });
  };

  return (
    <>
      <div onClick={handleOpen}>{children}</div>

      <div onClick={(e) => e.stopPropagation()}>
        <DeleteModal
          isOpen={deleteModal.isOpen}
          title="حذف الطلب"
          description="هل أنت متأكد من حذف هذا الطلب؟ لا يمكن التراجع عن هذا الإجراء بمجرد تأكيده"
          onClose={deleteModal.close}
          onConfirm={handleDelete}
          isDeleting={isPending}
        />
      </div>
    </>
  );
}
