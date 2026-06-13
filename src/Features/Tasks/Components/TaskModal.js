import SharedModal from "../../../shared/Components/SharedModal";
import SuccessModal from "../../../shared/Components/SuccessModal";
import Loader from "../../../shared/Components/Loading";
import { useTaskForm } from "../hooks/useTaskForm";
import TaskForm from "./TaskForm";

export default function TaskModal({ case_id, isOpen, onClose, editTask }) {
  const {
    form,
    errors,
    isSuccess,
    isPending,
    isEditMode,
    updateField,
    handleSubmit,
    closeModal,
  } = useTaskForm(case_id, onClose, editTask);

  if (isSuccess)
    return (
      <SuccessModal
        onDone={closeModal}
        title="تم بنجاح"
        description={
          isEditMode
            ? "تم تعديل المهمة بنجاح"
            : "تمت إضافة المهمة بنجاح وتحديث ملف القضية"
        }
        notice={isEditMode ? "" : "تم إخبار المسؤول آلياً بالمهمة الجديدة"}
      />
    );

  return (
    <SharedModal
      isOpen={isOpen}
      title={isEditMode ? " تعديل المهمة" : " إضافة مهمة جديدة"}
      description={
        isEditMode
          ? " قم بتعديل تفاصيل المهمة"
          : " قم بكتابة التفاصيل ثم تعيين مهمة قانونية للفريق"
      }
      titleId="task-create-modal-title"
      onClose={closeModal}
      primaryLabel={isEditMode ? " حفظ التعديلات" : " حفظ المهمة"}
      secondaryLabel="إلغاء"
      primaryType="submit"
      primaryForm="task-form"
      onSecondaryClick={closeModal}
    >
      {isPending && <Loader />}

      <TaskForm
        form={form}
        errors={errors}
        updateField={updateField}
        handleSubmit={handleSubmit}
      />
    </SharedModal>
  );
}
