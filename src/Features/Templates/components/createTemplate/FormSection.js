import FileAttachmentField from "../../../../shared/components/FileAttachmentField";
import SharedField from "../../../../shared/components/SharedFeild";
import { FileText } from "lucide-react";

export default function FormSection({
  form,
  updateField,
  errors,
  file,
  chooseFile,
  handleDrop,
  handleFileChange,
  fileInputRef,
  setFile,
  isEditMode,
  editTemplate,
}) {
  return (
    <section className="bg-white rounded-lg border border-gray-300 p-6 md:p-8 lg:col-span-2">
      <div className="space-y-4">
        {/* Template Title */}
        <section>
          <SharedField label="عنوان القالب" error={errors.title}>
            <input
              className="h-12 w-full rounded-lg border border-gray-300 bg-gray-50 px-4 text-sm text-gray-700 outline-none transition placeholder:text-gray-400"
              placeholder="مثال: عقد زواج موحد"
              value={form.title}
              onChange={(e) => updateField("title", e.target.value)}
            />
          </SharedField>

          <p className="text-sm text-gray-500 mt-3">
            سيظهر هذا الاسم في قوائم البحث للأعضاء والمحامين.
          </p>
        </section>

        {/* Description */}
        <SharedField label="وصف القالب" error={errors.template_desc}>
          <textarea
            rows={5}
            className="w-full resize-none rounded-lg border border-gray-300 bg-gray-50 px-4 py-4 text-sm text-gray-700 outline-none transition placeholder:text-gray-400"
            placeholder="أدخل وصف القالب..."
            value={form.template_desc}
            onChange={(e) => updateField("template_desc", e.target.value)}
          />
        </SharedField>

        {/* Category */}
        <SharedField label="التصنيف" error={errors.category}>
          <input
            className="h-12 w-full rounded-lg border border-gray-300 bg-gray-50 px-4 text-sm text-gray-700 outline-none transition placeholder:text-gray-400"
            placeholder="ادخل التصنيف..."
            value={form.category}
            onChange={(e) => updateField("category", e.target.value)}
          />
        </SharedField>

        <h2 className="text-lg font-bold text-gray-900 pt-2">تعديل الملف</h2>

        {isEditMode && !file && editTemplate?.Template_file && (
          <div className="flex items-center justify-between rounded-lg border border-gray-200 px-4 py-4 hover:shadow-sm transition-all">
            {/* Icon */}
            <div
              className={
                "w-12 h-12 rounded-xl flex items-center justify-center bg-red-50"
              }
            >
              <FileText className="w-5 h-5 text-red-500" />
            </div>

            {/* Info */}
            <div className="flex-1 px-4 text-right overflow-hidden">
              <h4 className="font-medium text-[#1E293B] truncate">
                {form.file.name}
              </h4>

              <p className="text-sm text-gray-400 mt-1">{form.file?.size}</p>
            </div>
          </div>
        )}

        {/* Upload */}
        <FileAttachmentField
          label="رفع ملف word"
          chooseFile={chooseFile}
          handleDrop={handleDrop}
          handleFileChange={handleFileChange}
          fileInputRef={fileInputRef}
          file={file}
          onDelete={() => setFile(null)}
        />
        {errors.file && <p className="text-xs text-red-600">{errors.file}</p>}
      </div>
    </section>
  );
}
