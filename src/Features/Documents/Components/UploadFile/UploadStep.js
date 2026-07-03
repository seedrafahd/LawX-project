import SharedField from "../../../../shared/components/SharedFeild";
import SelectField from "../SelectField";
import FileAttachmentField from "../../../../shared/components/FileAttachmentField";
import { ChevronLeft } from "lucide-react";

export default function UploadStep({
  form,
  updateField,
  chooseFile,
  handleDrop,
  handleFileChange,
  fileInputRef,
  file,
  setFile,
  documents,
}) {
  return (
    <>
      <SharedField label="نوع المستند">
        <SelectField
          value={form.type}
          onChange={(value) => updateField("type", value)}
          placeholder="اختر نوع المستند"
        />
      </SharedField>

      {documents.length > 0 && (
        <SharedField label="المستند الأصلي">
          <select
            value={form.parent_id ?? ""}
            onChange={(event) => updateField("parent_id", event.target.value)}
            className="h-[57px] w-full appearance-none rounded-[10px] border border-[#c9c6d1] bg-[#f8f8f9] px-12 py-3 text-right text-[15px] font-medium text-[#303541] outline-none transition focus:border-[#344474] focus:bg-white focus:ring-4 focus:ring-[#344474]/10"
          >
            <option value="">{form.parent_id || "اختر المستند الأصلي"}</option>
            {documents.map((doc) => (
              <option key={doc.id} value={doc.id}>
                {doc.File_name}
              </option>
            ))}
          </select>
          <ChevronLeft
            className="pointer-events-none absolute left-6 top-1/2 -translate-y-1/2 text-[#252b36]"
            size={25}
            strokeWidth={2.8}
          />
        </SharedField>
      )}

      <FileAttachmentField
        chooseFile={chooseFile}
        handleDrop={handleDrop}
        handleFileChange={handleFileChange}
        fileInputRef={fileInputRef}
        file={file}
        onDelete={() => setFile(null)}
      />
    </>
  );
}
