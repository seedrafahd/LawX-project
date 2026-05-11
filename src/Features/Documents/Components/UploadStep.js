import SharedField from "../../../shared/Components/SharedFeild";
import UploadDropzone from "./UploadDropzone";
import CompactFilePreview from "./CompactFilePreview";
import SelectField from "./SelectField";

export default function UploadStep({
  selectedType,
  updateSelectedType,
  chooseFile,
  handleDrop,
  handleFileChange,
  fileInputRef,
  file,
  setFile,
}) {
  return (
    <>
      <SharedField label="نوع المستند">
        <SelectField
          value={selectedType}
          onChange={updateSelectedType}
          placeholder="اختر نوع المستند"
        />
      </SharedField>

      <SharedField label="مرفقات الملفات">
        <UploadDropzone chooseFile={chooseFile} handleDrop={handleDrop} />

        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.png,.csv"
          className="hidden"
          onChange={handleFileChange}
        />
      </SharedField>

      {file && (
        <CompactFilePreview file={file} onDelete={() => setFile(null)} />
      )}
    </>
  );
}
