import { useFileUpload } from "../../../../shared/hooks/useFileUpload";
import FileAttachmentField from "../../../../shared/components/FileAttachmentField";
import StepNavigation from "./StepNavigation";

export default function SelectPdf({ file, setFile, onNext }) {
  const { fileInputRef, chooseFile, handleFileChange, handleDrop } =
    useFileUpload((file) => setFile(file));

  return (
    <div>
      <FileAttachmentField
        label=""
        chooseFile={chooseFile}
        handleDrop={handleDrop}
        handleFileChange={handleFileChange}
        fileInputRef={fileInputRef}
        file={file}
        onDelete={() => setFile(null)}
      />
      <StepNavigation onNext={onNext} disableNext={!file} />
    </div>
  );
}
