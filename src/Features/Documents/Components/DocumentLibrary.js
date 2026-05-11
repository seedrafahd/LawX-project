import { useState } from "react";
import { Upload, Download, FileText, BookOpenIcon, Trash2 } from "lucide-react";
import DocumentUploadModal from "./DocumentUploadModal";
import SharedButton from "../../../shared/Components/SharedButton";
import { useDocuments } from "../Hooks/useDocuments";
import Loader from "../../../shared/Components/Loading";
import PDFModal from "./OpenPDFModal";

export default function DocumentLibrary({ caseId }) {
  const { data, isPending } = useDocuments(caseId);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [selectedFileUrl, setSelectedFileUrl] = useState(null);
  const files = data?.data.data;

  return (
    <div className="bg-white rounded-xl shadow-sm p-8 space-y-8">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold text-gray-900">مكتبة المستندات</h3>
        <SharedButton
          icon={<Upload size={18} />}
          onClick={() => setIsUploadModalOpen(true)}
        >
          رفع ملف جديد
        </SharedButton>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {isPending ? (
          <Loader />
        ) : files.length ? (
          files.map((file) => {
            const name = getFileName(file);
            const type = file.type?.toUpperCase() || "FILE";
            const size =
              file.size || file.file_size || file.fileSize || "غير متوفر";
            const date = file.uploaded_AT || file.uploaded_at || "-";
            const fixedUrl = file.file_url.replace(
              "http://localhost",
              "http://127.0.0.1:8000",
            );

            return (
              <div
                key={file.id}
                className="bg-[#EFF1F8]/40 rounded-xl border border-[#EFF1F8] shadow-sm p-4 flex items-center justify-between gap-2"
              >
                <div className="flex min-w-0 flex-1 gap-3 text-gray-400  overflow-hidden">
                  <div
                    className={`w-8 h-8 flex items-center justify-center rounded-xl`}
                  >
                    <FileText />
                  </div>

                  <div>
                    <h5 className="truncate text-base text-black">{name}</h5>
                    <p className="text-xs">
                      {type} • {size} • {date}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <a
                    href={fixedUrl}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="تحميل المستند"
                    className="p-[10px] bg-variable-collection-primary-color/20 text-variable-collection-primary-color rounded-full"
                  >
                    <Download size={16} />
                  </a>
                  <button
                    onClick={() => setSelectedFileUrl(fixedUrl)}
                    className="p-[10px] bg-variable-collection-primary-color/20 text-variable-collection-primary-color rounded-full"
                  >
                    <BookOpenIcon size={16} />
                  </button>
                  <button className="p-[10px] bg-variable-collection-error-color/20 text-variable-collection-error-color rounded-full">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-sm font-semibold text-gray-500">
            لا توجد مستندات بعد
          </p>
        )}
      </div>

      <DocumentUploadModal
        isOpen={isUploadModalOpen}
        caseId={caseId}
        onClose={() => setIsUploadModalOpen(false)}
        onSubmit={() => {
          setIsUploadModalOpen(false);
        }}
      />

      <PDFModal
        isOpen={!!selectedFileUrl}
        onClose={() => setSelectedFileUrl(null)}
        pdfFile={selectedFileUrl}
      />
    </div>
  );
}

function getFileName(file) {
  if (file.name) return file.name;
  if (!file.file_url) return "مستند";

  const fileName = file.file_url.split("/").pop();
  return decodeURIComponent(fileName || "مستند");
}
