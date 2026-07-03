import { useMemo, useState } from "react";
import { Upload } from "lucide-react";
import SharedButton from "../../../shared/components/SharedButton";
import { useDeleteDocument, useDocuments } from "../hooks/useDocuments";
import Loader from "../../../shared/components/Loading";
import PDFModal from "./OpenPDFModal";
import DocumentItem from "./DocumentItem";
import DeleteModal from "../../../shared/components/DeleteModal";
import DocumentUploadModal from "./UploadFile/DocumentUploadModal";
import { useModal } from "../../../shared/hooks/useModal";
import LibraryHeader from "./LibraryHeader";
import { useNavigate } from "react-router-dom";

export default function DocumentLibrary({ caseId }) {
  const navigate = useNavigate();
  const { data: files = [], isPending } = useDocuments(caseId);
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
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold text-gray-900">مكتبة المستندات</h3>
          <SharedButton
            icon={<Upload size={18} />}
            onClick={uploadModal.toggle}
          >
            رفع ملف جديد
          </SharedButton>
        </div>
        <LibraryHeader
          tags={allTags}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onTagClick={handleTagClick}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {isPending ? (
            <Loader />
          ) : filteredFiles.length ? (
            filteredFiles.map((file) => {
              return (
                <DocumentItem
                  key={file.id}
                  file={file}
                  onViewClick={() =>
                    navigate(`/cases/document_details/${file.id}`, {
                      state: { file },
                    })
                  }
                  onDeleteClick={() => setSelectedFile(file)}
                />
              );
            })
          ) : (
            <p className="text-sm font-semibold text-gray-500">
              لا توجد مستندات بعد
            </p>
          )}
        </div>
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
