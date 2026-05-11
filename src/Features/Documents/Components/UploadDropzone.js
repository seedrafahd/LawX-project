import { CloudUpload } from "lucide-react";

export default function UploadDropzone({ chooseFile, handleDrop }) {
  return (
    <button
      type="button"
      onClick={chooseFile}
      onDrop={handleDrop}
      onDragOver={(event) => event.preventDefault()}
      className="flex min-h-[276px] w-full flex-col items-center justify-center border-2 border-dashed border-[#354a80] bg-[#f8f9fc] px-5 text-center transition hover:bg-[#f4f6fb]"
    >
      <span className="mb-5 flex h-[72px] w-[72px] items-center justify-center rounded-full bg-[#b7cdfb] text-[#354a80]">
        <CloudUpload size={36} strokeWidth={2.8} />
      </span>

      <span className="text-[17px] font-extrabold text-[#222831]">
        اختر ملف او اسحب وافلت هنا
      </span>

      <span className="mt-2 text-[15px] font-medium text-[#8795b6]">
        PDF, PNG, CSV (Max 10MB)
      </span>

      <span className="mt-4 rounded-[10px] bg-[#344474] px-6 py-3 text-[16px] font-bold text-white shadow-sm transition hover:bg-[#293963]">
        تصفح الملفات
      </span>
    </button>
  );
}
