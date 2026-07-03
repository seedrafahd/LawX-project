import { useParams } from "react-router-dom";
import TemplateCreateSidebar from "../components/createTemplate/TemplateCreateSidebar";
import FormSection from "../components/createTemplate/FormSection";
import { useTemplateForm } from "../hooks/useTemplateForm";
import { useTemplateDetails } from "../hooks/useTemplates";
import Loader from "../../../shared/components/Loading";
import { useFileUpload } from "../../../shared/hooks/useFileUpload";
import SuccessModal from "../../../shared/components/SuccessModal";

export default function CreateTemplatePage() {
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const { data, isLoading: isFetching } = useTemplateDetails(id, {
    enabled: isEditMode,
  });
  const editTemplate = data?.data?.data ?? null;

  const {
    form,
    errors,
    file,
    isSuccess,
    isPending,
    setFile,
    setErrors,
    updateField,
    closeModal,
    handleSubmit,
  } = useTemplateForm({ editTemplate });

  const { fileInputRef, chooseFile, handleFileChange, handleDrop } =
    useFileUpload(setFile);

  const loading = isPending || (isEditMode && isFetching);

  if (loading) return <Loader />;

  if (isSuccess) {
    return (
      <SuccessModal
        onDone={closeModal}
        title="تم بنجاح"
        description={
          isEditMode
            ? "تم تعديل القالب بنجاح"
            : "تمت إضافة القالب بنجاح وتحديث ملف القضية"
        }
      />
    );
  }
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-gray-600 font-bold mb-1">
          القوالب &gt; {isEditMode ? "تعديل القالب" : "إنشاء قالب جديد"}
        </p>

        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          {isEditMode ? "تعديل القالب" : "إنشاء قالب جديد"}
        </h1>

        <p className="text-gray-600 text-base">
          {isEditMode
            ? "قم بتعديل بيانات القالب وتحديث ملف الـ Word المرجعي."
            : "أضف تفاصيل القالب الجديد وقم برفع ملف الـ Word المرجعي لبدء المعالجة الذكية."}
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 lg:grid-cols-3 gap-4"
      >
        <FormSection
          form={form}
          errors={errors}
          updateField={updateField}
          file={file}
          setFile={setFile}
          chooseFile={chooseFile}
          handleDrop={handleDrop}
          handleFileChange={(e) => {
            handleFileChange(e);
            setErrors((currentErrors) => ({
              ...currentErrors,
              file: "",
            }));
          }}
          fileInputRef={fileInputRef}
          isEditMode={isEditMode}
          editTemplate={editTemplate}
        />

        <TemplateCreateSidebar
          isEditMode={isEditMode}
          handleCancel={closeModal}
        />
      </form>
    </div>
  );
}
