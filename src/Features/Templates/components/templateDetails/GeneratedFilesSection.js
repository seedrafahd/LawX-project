import { Archive, FileCog, Sparkles } from "lucide-react";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";

export default function GeneratedFilesSection({
  name,
  generatedFiles,
  handleOpenGenerate,
}) {
  return (
    <div className="bg-white rounded-xl border border-[#D9E0EA] overflow-hidden shadow-sm">
      <div className="px-8 py-6 border-b border-[#E4E8EF] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xl font-semibold text-gray-800">
          <FileCog />
          <div>
            <h3>الملفات المولدة</h3>
            <h5 className="text-[#6B7280] text-sm">
              إجمالي الملفات: {generatedFiles.length}
            </h5>
          </div>
        </div>

        <button
          onClick={handleOpenGenerate}
          className="px-8 py-4 rounded-lg bg-[#3C4F87] text-white font-semibold flex items-center gap-3 shadow-md hover:bg-[#455a97] transition"
        >
          <Sparkles size={20} />
          توليد ملف جديد الآن
        </button>
      </div>

      {generatedFiles.length ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-8">
          {generatedFiles.map((file, index) => (
            <div
              key={index}
              className="relative flex min-h-[72px] items-center gap-4 overflow-hidden rounded-[7px] bg-[#f1f1f2] px-5 py-3 shadow-sm"
            >
              <span className="absolute bottom-0 right-0 top-0 w-1 bg-[#0b64ff]" />

              <PictureAsPdfIcon className="text-[#DC2626]" />

              <div className="w-full">
                <div className="flex justify-between">
                  <p className="truncate text-[13px] font-extrabold text-[#20242d]">
                    {name}
                  </p>

                  <p className="mt-1 text-[12px] font-medium text-[#6f7581]">
                    {file.file_size}
                  </p>
                </div>
                <p className="text-[12px] font-medium text-[#6f7581]">
                  رُفع من قِبل : {file.User_Who_create}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center px-8 py-12 text-center">
          <div className="p-4 rounded-xl bg-[#EEF0F3] flex items-center justify-center mb-6">
            <Archive size={40} className="text-[#B1B5BE]" />
          </div>

          <h3 className="text-3xl font-semibold text-[#394150]">
            لا توجد ملفات مولدة حالياً
          </h3>

          <p className="text-[#7B8391] leading-6">
            لم يتم توليد أي مستندات قانونية باستخدام هذا القالب حتى الآن.
            <br />
            يمكنك البدء بتوليد ملف جديد باستخدام بيانات العميل.
          </p>
        </div>
      )}
    </div>
  );
}
