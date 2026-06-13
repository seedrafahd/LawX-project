import { Download, FileText, ImageIcon, Paperclip } from "lucide-react";

function getFileIcon(fileName) {
  const ext = fileName?.split(".").pop()?.toLowerCase();
  return ext === "pdf" ? FileText : ImageIcon;
}

function isPdf(fileName) {
  return fileName?.split(".").pop()?.toLowerCase() === "pdf";
}

export default function RequestAttachmentsCard({ documents }) {
  return (
    <div className="rounded-xl bg-white p-8 space-y-6">
      <h3 className="flex items-center gap-3 font-bold text-gray-900">
        <Paperclip size={18} />
        المرفقات ({documents.length})
      </h3>

      {documents?.length ? (
        <div className="space-y-3">
          {documents.map((file, index) => {
            const fileName = file.File_name || file.name;
            const Icon = getFileIcon(fileName);

            return (
              <div
                key={index}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-[#E1E3E4]/20 border border-gray-300 rounded-xl p-4"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      isPdf(fileName) ? "bg-[#FFDAD6]" : "bg-blue-50"
                    }`}
                  >
                    <Icon
                      className={
                        isPdf(fileName) ? "text-red-600" : "text-blue-500"
                      }
                      size={20}
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold text-gray-900 truncate">
                      {fileName}
                    </p>
                    <p className="text-gray-500 text-sm">
                      {file.file_size || file.size}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button className="text-blue-700 font-bold items-center px-4 py-2">
                    عرض
                  </button>
                  <a
                    href={file.file_url || file.url}
                    download={file.File_name || file.type}
                    className="text-gray-600 font-bold inline-flex items-center gap-1 px-4 py-2"
                  >
                    <Download size={17} />
                    تحميل
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-sm text-gray-500">لا توجد مرفقات</p>
      )}
    </div>
  );
}
