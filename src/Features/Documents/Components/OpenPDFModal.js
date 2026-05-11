import {
  Calendar,
  FileTextIcon,
  LockKeyhole,
  UserRound,
  X,
} from "lucide-react";
import SharedButton from "../../../shared/Components/SharedButton";

const PDFModal = ({ isOpen, onClose, pdfFile }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-[1200px] h-full flex overflow-hidden">
        {/* Left Document Area */}
        <div className="flex-1 flex flex-col">
          {/* Header Bar */}
          <div className="flex items-center px-8 py-5 gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FFDAD6] text-[#BA1A1A]">
              <FileTextIcon />
            </div>

            <div className="flex flex-col gap-1">
              <h1 className="text-base font-bold text-gray-900">
                مذكرة الدفاع النهائية.pdf
              </h1>
              <span className="text-gray-500 text-xs">2.4 MB</span>
            </div>
          </div>

          {/* PDF Pages */}

          <iframe
            src={pdfFile}
            className="flex-1 w-full h-full"
            title="PDF Preview"
          />
        </div>

        {/* Right Sidebar */}
        <div className="w-80 bg-white border-l border-gray-200 flex flex-col justify-between">
          {/* Top Controls */}
          <div className="">
            <div className="flex justify-end px-8 py-5">
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-200 rounded-lg"
              >
                <X size={20} />
              </button>
            </div>

            {/* File Details */}
            <div className="p-6 space-y-4">
              <h3 className="text-xs text-gray-500">تفاصيل الملف</h3>
              <div className="flex items-start gap-3">
                <Calendar className="w-4 h-4 text-blue-500" />
                <div>
                  <p className="text-gray-600 text-[10px]">تاريخ الدفع</p>
                  <p className="text-gray-900 font-bold text-sm">
                    24 أكتوبر 2023
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <UserRound className="w-4 h-4 text-blue-500" />
                <div>
                  <p className="text-gray-600 text-[10px]">بواسطة</p>
                  <p className="text-gray-900 font-bold text-sm">
                    د. خالد الفيصل
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <LockKeyhole className="w-4 h-4 text-blue-500" />
                <span className="text-gray-600 text-[10px]">
                  مستوى الوصول: محدد
                </span>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="p-4 flex justify-center space-x-2 rtl:space-x-reverse border-t border-gray-200">
            
            <button
              onClick={onClose}
              className="bg-gray-200 text-gray-800 px-6 py-2 rounded-xl hover:bg-gray-300 transition"
            >
              إغلاق
            </button>
            <SharedButton children={" تحميل الملف"} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PDFModal;
