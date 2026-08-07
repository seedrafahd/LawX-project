import { useMemo, useState } from "react";
import { useDeleteDocument, useDocuments } from "../hooks/useDocuments";
import Loader from "../../../shared/components/Loading";
import PDFModal from "./OpenPDFModal";
import DeleteModal from "../../../shared/components/DeleteModal";
import DocumentUploadModal from "./UploadFile/DocumentUploadModal";
import { useModal } from "../../../shared/hooks/useModal";
import { DOCUMENTS_TABS } from "../helpers/constants";
import DocumentsList from "../pages/DocumentsList";
import SendSignatureRequestsList from "../../ElectronicSignature/pages/SendSignaturRequestsList";
import RequireToSignPage from "../../ElectronicSignature/pages/RequireToSignPage";

export default function DocumentLibrary({ caseId }) {
  const { data: files = [], isPending } = useDocuments(caseId);
  const [activeTab, setActiveTab] = useState("documents");
  const uploadModal = useModal();
  const [selectedPreviewFile, setSelectedPreviewFile] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const { mutate, isPending: isDeleting } = useDeleteDocument(
    caseId,
    selectedFile?.id,
  );
  console.log("files", files);
  const allTags = useMemo(() => {
    const tagSet = new Set();
    files.forEach((file) => {
      (file.ai_tags || []).forEach((tag) => tagSet.add(tag));
    });
    return Array.from(tagSet);
  }, [files]);

  const filteredFiles = useMemo(() => {
    if (!searchQuery.trim()) return files;
    const q = searchQuery.trim().toLowerCase();
    return files.filter((file) => {
      const matchesTag = (file.ai_tags || []).some((tag) =>
        tag.toLowerCase().includes(q),
      );
      const matchesName = (file.File_name || "").toLowerCase().includes(q);
      return matchesTag || matchesName;
    });
  }, [files, searchQuery]);

  const onDelete = () => {
    mutate({}, { onSuccess: () => setSelectedFile(null) });
  };

  const handleTagClick = (tag) => {
    setSearchQuery((prev) => (prev === tag ? "" : tag));
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm p-8 space-y-8">
        <div className="flex gap-6 border-b">
          {DOCUMENTS_TABS.map((tap) => (
            <button
              key={tap.id}
              onClick={() => setActiveTab(tap.id)}
              className={`pb-3 text-sm font-medium border-b-2 transition-all ${
                activeTab === tap.id
                  ? "border-blue-600 text-blue-700"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              {tap.label}
            </button>
          ))}
        </div>

        {isPending ? (
          <Loader />
        ) : activeTab === "documents" ? (
          <DocumentsList
            tags={allTags}
            searchQuery={searchQuery}
            filteredFiles={filteredFiles}
            setSelectedFile={setSelectedFile}
            onSearchChange={setSearchQuery}
            onTagClick={handleTagClick}
            openModal={uploadModal.toggle}
          />
        ) : activeTab === "sent_requests" ? (
          <SendSignatureRequestsList caseId={caseId} />
        ) : (
          <RequireToSignPage />
        )}
      </div>

      <DocumentUploadModal
        isOpen={uploadModal.isOpen}
        caseId={caseId}
        onClose={uploadModal.toggle}
        documents={files}
      />

      <DeleteModal
        isOpen={!!selectedFile}
        onClose={() => setSelectedFile(null)}
        onConfirm={onDelete}
        isDeleting={isDeleting}
        title="حذف الملف"
        description="هل أنت متأكد من حذف هذا الملف؟ لا يمكن التراجع عن هذا الإجراء بمجرد تأكيده"
      />

      <PDFModal
        isOpen={!!selectedPreviewFile}
        onClose={() => setSelectedPreviewFile(null)}
        file={selectedPreviewFile}
      />
    </>
  );
}
