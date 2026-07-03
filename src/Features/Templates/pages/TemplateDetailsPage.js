import { Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import SharedButton from "../../../shared/components/SharedButton";
import TemplateInfoSection from "../components/templateDetails/TemplateInfoSection";
import TemplateVariablesSection from "../components/templateDetails/TemplateVariablesSection";
import GeneratedFilesSection from "../components/templateDetails/GeneratedFilesSection";
import TemplateDetailsSidebar from "../components/templateDetails/TemplateDetailsSidebar";
import { useTemplateDetails, useDeleteTemplate } from "../hooks/useTemplates";
import { useParams, useNavigate } from "react-router-dom";
import Loader from "../../../shared/components/Loading";
import DeleteModal from "../../../shared/components/DeleteModal";

export default function TemplateDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [deleteOpen, setDeleteOpen] = useState(false);
  const { data, isPending } = useTemplateDetails(id);
  const { mutate: deleteTemplate, isPending: isDeleting } = useDeleteTemplate();
  const template = data?.data.data || {};
  console.log(data?.data.data);

  const handleDelete = () => {
    deleteTemplate(id, {
      onSuccess: () => {
        setDeleteOpen(false);
        navigate("/templates");
      },
    });
  };

  const handleOpenGenerate = () => {
    navigate(`/templates/generate/${id}`);
  };

  if (isPending) return <Loader />;
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5">
        <div>
          <div className="text-xs text-[#6B7280] mb-1">
            مكتبة القوالب /
            <span className="text-[#15396A] font-medium"> تفاصيل القالب</span>
          </div>

          <h1 className="text-2xl font-bold text-[#0F3667]">
            {template?.title || "عقد بيع موحد"}
          </h1>
        </div>

        <div className="flex flex-col md:flex-row gap-2">
          <SharedButton
            icon={<Pencil size={18} />}
            onClick={() => navigate(`/templates/edit/${id}`)}
          >
            تعديل
          </SharedButton>
          <SharedButton
            icon={<Trash2 size={18} />}
            colors="bg-red-700 text-white hover:bg-red-800"
            onClick={() => setDeleteOpen(true)}
          >
            حذف
          </SharedButton>
        </div>
      </div>

      <DeleteModal
        isOpen={deleteOpen}
        title="حذف القالب"
        description="هل أنت متأكد من حذف هذا القالب؟ هذا الإجراء لا يمكن التراجع عنه."
        onConfirm={handleDelete}
        onClose={() => setDeleteOpen(false)}
        isDeleting={isDeleting}
      />

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="space-y-6 lg:col-span-2">
          {/* Template Information */}
          <TemplateInfoSection template={template} />

          {/* Variables */}
          <TemplateVariablesSection
            variables={template.Template_variables || []}
          />
        </div>

        {/* Sidebar */}
        <TemplateDetailsSidebar
          name={template.Template_name}
          fileSize={template.template_file_size}
          filePath={template.Template_file}
        />
      </div>
      {/* Generated Files */}
      <GeneratedFilesSection
        name={template.Template_name}
        generatedFiles={template.Generated_Files || []}
        handleOpenGenerate={handleOpenGenerate}
      />
    </div>
  );
}
