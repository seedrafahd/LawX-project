import { Calendar, FileTextIcon, UserRound, X } from "lucide-react";
import SharedButton from "../../../shared/components/SharedButton";

export default function PDFModal({ isOpen, onClose, file }) {
  if (!isOpen) return null;
  console.log(file);

  const fileName = file?.File_name || "مستند";
  const fileSize = file?.file_size || "غير متوفر";
  const fileUrl = file?.file_url;
  const fileDate = file?.uploaded_AT || "منذ ثوانٍ";
  const uploadedBy = file?.uploaded_by?.name;

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-[1200px] h-full overflow-hidden flex flex-col">
        {/* Header Bar */}
        <div className="flex justify-between px-8 py-5">
          <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FFDAD6] text-[#BA1A1A]">
              <FileTextIcon />
            </div>

            <div className="flex flex-col gap-1">
              <h1 className="text-base font-bold text-gray-900">{fileName}</h1>
              <span className="text-gray-500 text-xs">{fileSize}</span>
            </div>
          </div>

          <button onClick={onClose} className="hover:bg-gray-200 rounded-lg">
            <X size={20} />
          </button>
        </div>

        <div className="flex flex-col sm:flex-row flex-1 min-h-0">
          {/* PDF Pages */}
          <iframe
            src={fileUrl}
            className="flex-1 w-full h-full bg-gray-200 order-2 sm:order-1"
            title="PDF Preview"
          />

          {/* Left Sidebar */}
          <div className="flex sm:h-full flex-col justify-between w-max-80 bg-white border-l border-gray-200 order-1 sm:order-2">
            {/* File Details */}
            <div className="p-3 sm:p-6 space-y-4">
              <h3 className="text-xs text-gray-500">تفاصيل الملف</h3>
              <div className=" flex sm:flex-col gap-4">
                <div className="flex items-start gap-3">
                  <Calendar className="w-4 h-4 text-blue-500" />
                  <div>
                    <p className="text-gray-600 text-[10px]">تاريخ الرفع</p>
                    <p className="text-gray-900 font-bold text-sm">
                      {fileDate}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <UserRound className="w-4 h-4 text-blue-500" />
                  <div>
                    <p className="text-gray-600 text-[10px]">بواسطة</p>
                    <p className="text-gray-900 font-bold text-sm">
                      {uploadedBy}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="p-4 flex justify-center space-x-2 rtl:space-x-reverse border-t border-gray-200">
              <SharedButton
                colors="bg-gray-200 text-gray-800"
                className="hover:bg-gray-300"
                onClick={onClose}
                children="إغلاق"
              />
              <SharedButton children=" تحميل الملف" onClick={handleDownload} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
