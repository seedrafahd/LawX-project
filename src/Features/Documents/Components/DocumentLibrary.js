import { useState } from "react";
import { Upload } from "lucide-react";
import SharedButton from "../../../shared/Components/SharedButton";
import { useDeleteDocument, useDocuments } from "../Hooks/useDocuments";
import Loader from "../../../shared/Components/Loading";
import PDFModal from "./OpenPDFModal";
import DocumentItem from "./DocumentItem";
import DeleteModal from "../../../shared/Components/DeleteModal";
import DocumentUploadModal from "./UploadFile/DocumentUploadModal";
import { useModal } from "../../../shared/Hooks/useModal";

export default function DocumentLibrary({ caseId }) {
  const { data: files = [], isPending } = useDocuments(caseId);
  const uploadModal = useModal();
  const [selectedPreviewFile, setSelectedPreviewFile] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const { mutate, isPending: isDeleting } = useDeleteDocument(
    caseId,
    selectedFile?.id,
  );

  const onDelete = () => {
    mutate({}, { onSuccess: () => setSelectedFile(null) });
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {isPending ? (
            <Loader />
          ) : files.length ? (
            files.map((file) => {
              return (
                <DocumentItem
                  key={file.id}
                  file={file}
                  onViewClick={setSelectedPreviewFile}
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
