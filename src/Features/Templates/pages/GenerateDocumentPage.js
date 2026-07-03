import { useNavigate, useParams } from "react-router-dom";
import DocumentPreview from "../components/Generate/DocumentPreview";
import GenerateHeader from "../components/Generate/GenerateHeader";
import GenerateVariables from "../components/Generate/GenerateVariables";
import { useGenerateDoc, useTemplateDetails } from "../hooks/useTemplates";
import Loader from "../../../shared/components/Loading";
import { useState } from "react";

export default function GenerateDocumentPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isPending: isTemplateLoading } = useTemplateDetails(id);
  const template = data?.data.data;
  const { mutate, isPending } = useGenerateDoc(id);
  const [customValues, setCustomValues] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isPending) return;
    mutate(
      {
        template_id: id,
        custom_values: customValues,
      },
      {
        onSuccess: () => {
          navigate(`/templates/template_details/${id}`);
        },
      },
    );
  };

  if (isPending || isTemplateLoading) return <Loader />;
  return (
    <form onSubmit={handleSubmit}>
      <GenerateHeader template={template} />

      <div className="mt-5 grid grid-cols-1 gap-6 xl:grid-cols-12">
        <div className="xl:col-span-5">
          <GenerateVariables
            variables={template.Template_variables}
            customValues={customValues}
            setCustomValues={setCustomValues}
          />
        </div>

        <div className="xl:col-span-7">
          <DocumentPreview file={template.Template_file} />
        </div>
      </div>
    </form>
  );
}
