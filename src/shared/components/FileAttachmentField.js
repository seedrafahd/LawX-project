import SharedField from "./SharedFeild";
import CompactFilePreview from "../../Features/Documents/Components/CompactFilePreview";
import UploadDropzone from "./UploadDropzone";

export default function FileAttachmentField({
  label = "مرفقات الملفات",
  chooseFile,
  handleDrop,
  handleFileChange,
  fileInputRef,
  file,
  onDelete,
  accept = ".pdf,.png,.csv,.docx",
}) {
  return (
    <>
      <SharedField label={label}>
        <UploadDropzone chooseFile={chooseFile} handleDrop={handleDrop} />

        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          className="hidden"
          onChange={handleFileChange}
        />
      </SharedField>

      {file && <CompactFilePreview file={file} onDelete={onDelete} />}
    </>
  );
}
