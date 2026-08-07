import { useNavigate, useParams } from "react-router-dom";
import LawSidebar from "../components/createLaw/LawSidebar";
import LegalTextSection from "../components/createLaw/LegalTextSection";
import LawInfoSection from "../components/createLaw/LawInfoSection";
import { useLawForm } from "../hooks/useLawForm";
import { useLawCategories, useLawDetails } from "../hooks/useLaws";
import Loader from "../../../shared/components/Loading";
import { useAuth } from "../../Auth/hooks/useAuth";

export default function CreateLawPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const { user } = useAuth();

  const { data: categoriesData, isPending: isFetchingCategories } =
    useLawCategories(user.role);
  const { data, isLoading: isFetching } = useLawDetails(id, user.role, {
    enabled: isEditMode,
  });

  const categories = categoriesData?.data.categories ?? [];
  const law = data?.data;
  const {
    form,
    errors,
    updateField,
    submit,
    isPending,
    addArticle,
    removeArticle,
    updateArticle,
  } = useLawForm(law, isEditMode);

  const loading = isPending || isFetching || isFetchingCategories;

  const handleCancel = () => {
    navigate("/laws");
  };

  return (
    <div className="space-y-5">
      {loading && <Loader />}
      {/* Header */}
      <div>
        <div className="text-sm text-gray-500 mb-2">
          إدارة القوانين /
          <span className="text-blue-600 font-semibold">
            {isEditMode ? " تعديل القانون" : " إضافة قانون جديد"}
          </span>
        </div>

        <h1 className="text-xl font-bold text-gray-900">
          {isEditMode ? "تعديل القانون" : "إضافة قانون جديد"}
        </h1>
      </div>

      <form
        onSubmit={submit}
        className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-4"
      >
        {/* ================= RIGHT COLUMN ================= */}
        <main className="space-y-6">
          {/* Basic Information */}
          <LawInfoSection
            form={form}
            errors={errors}
            updateField={updateField}
            categoriesOptions={categories}
          />

          {/* Legal Text */}
          <LegalTextSection
            form={form}
            errors={errors}
            updateField={updateField}
            addArticle={addArticle}
            removeArticle={removeArticle}
            updateArticle={updateArticle}
          />
        </main>

        {/* ================= LEFT COLUMN ================= */}
        <LawSidebar
          form={form}
          errors={errors}
          updateField={updateField}
          handleCancel={handleCancel}
        />
      </form>
    </div>
  );
}
