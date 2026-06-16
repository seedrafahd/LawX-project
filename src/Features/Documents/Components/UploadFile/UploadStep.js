import SharedField from "../../../../shared/components/SharedFeild";
import SelectField from "../SelectField";
import FileAttachmentField from "../../../../shared/components/FileAttachmentField";

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
