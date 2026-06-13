import { FileText, ImageIcon } from "lucide-react";
import FileAttachmentField from "../../../../../shared/Components/FileAttachmentField";

export default function OfferAttachmentsCard({
  attachments,
  file,
  errors,
  setFile,
  chooseFile,
  handleDrop,
  handleFileChange,
  fileInputRef,
}) {
  return (
    <section className="bg-white rounded-lg shadow-sm p-6 md:p-8 space-y-6">
      <div className="flex justify-between">
        <h2 className="text-lg font-bold text-gray-900">المرفقات</h2>
        <p className="text-sm text-gray-500">
          {attachments.length} ملفات مرفقة
        </p>
      </div>

      {/* Files */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {attachments.map((file) => (
          <div
            key={file.id}
            className="flex items-center justify-between rounded-lg border border-gray-200 px-4 py-4 hover:shadow-sm transition-all"
          >
            {/* Icon */}
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                file.type === "pdf" ? "bg-red-50" : "bg-blue-50"
              }`}
            >
              {file.type === "pdf" ? (
                <FileText className="w-5 h-5 text-red-500" />
              ) : (
                <ImageIcon className="w-5 h-5 text-blue-500" />
              )}
            </div>

            {/* Info */}
            <div className="flex-1 px-4 text-right overflow-hidden">
              <h4 className="font-medium text-[#1E293B] truncate">
                {file.name}
              </h4>

              <p className="text-sm text-gray-400 mt-1">{file.size}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Upload Zone */}

      <FileAttachmentField
        chooseFile={chooseFile}
        handleDrop={handleDrop}
        handleFileChange={handleFileChange}
        fileInputRef={fileInputRef}
        file={file}
        onDelete={() => setFile(null)}
      />
      {errors.file && <p className="text-xs text-red-600">{errors.file}</p>}
    </section>
  );
}
