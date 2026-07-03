import { useLocation, useNavigate } from "react-router-dom";
import ActionBar from "../Components/Details/ActionBar";
import AITagsCard from "../Components/Details/AITagsCard";
import DocDetailsHeader from "../Components/Details/DocDetailsHeader";
import DocumentInfoCard from "../Components/Details/DocumentInfoCard";
import DocumentViewer from "../Components/Details/DocumentViewer";
import OCRTextCard from "../Components/Details/OCRTextCard";
import DocumentUploadModal from "../Components/UploadFile/DocumentUploadModal";
import DeleteModal from "../../../shared/components/DeleteModal";
import { useDeleteDocument } from "../hooks/useDocuments";
import { useModal } from "../../../shared/hooks/useModal";
import VersionsModal from "../Components/VersionsModal";

export default function DocumentDetailsPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const file = location.state?.file || {};
  console.log("file", file);

  const uploadModal = useModal();
  const deleteModal = useModal();
  const versionsModal = useModal();
  const { mutate, isPending: isDeleting } = useDeleteDocument(
    file?.case?.id,
    file?.id,
  );

  const handleBack = () => {
    window.history.back();
  };
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = file?.file_url;
    link.download = file?.File_name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const onDelete = () => {
    mutate(
      {},
      {
        onSuccess: () => {
          deleteModal.toggle();
          navigate(-1);
        },
      },
    );
  };

  return (
    <div>
      {/* Header */}
      <DocDetailsHeader
        fileName={file.File_name}
        caseTitle={file.case.title}
        handleBack={handleBack}
      />

      <div className="mx-auto max-w-[1700px] py-6">
        {/* ===============  TOP SECTION ===================== */}

        <div className="grid gap-4 lg:grid-cols-2">
          <DocumentInfoCard file={file} />

          <AITagsCard tags={file.ai_tags || []} />
        </div>

        {/* =============== MAIN CONTENT ====================== */}

        <div className="mt-5 grid gap-5 xl:grid-cols-[420px_1fr]">
          {/* OCR */}
          <OCRTextCard ai_summary={file.ai_summary} />

          {/* Viewer */}
          <DocumentViewer fileUrl={file.file_url} />
        </div>
      </div>

      {/* Bottom Actions */}
      <ActionBar
        isVersions={file.versions_files?.length > 0}
        handleDelete={() => deleteModal.toggle()}
        handleDownload={handleDownload}
        handleReUpload={uploadModal.toggle}
        handleVersions={() => versionsModal.toggle()}
      />

      <VersionsModal
        isOpen={versionsModal.isOpen}
        onClose={versionsModal.toggle}
        currVersion={file}
        versions={file?.versions_files || []}
        // onViewVersion={(id) => navigate(`/cases/document_details/${id}`)}
      />

      <DocumentUploadModal
        isOpen={uploadModal.isOpen}
        caseId={file?.case?.id}
        onClose={uploadModal.toggle}
        documents={[file]}
      />

      <DeleteModal
        isOpen={deleteModal.isOpen}
        onClose={deleteModal.toggle}
        onConfirm={onDelete}
        isDeleting={isDeleting}
        title="حذف الملف"
        description="هل أنت متأكد من حذف هذا الملف؟ لا يمكن التراجع عن هذا الإجراء بمجرد تأكيده"
      />
    </div>
  );
}
