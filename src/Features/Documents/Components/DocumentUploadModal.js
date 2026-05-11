import { useRef, useState } from "react";
import { UploadCloud } from "lucide-react";
import toast from "react-hot-toast";
import SharedModal from "../../../shared/Components/SharedModal";
import { useUploadDocument } from "../Hooks/useDocuments";
import UploadingState from "./UploadingState";
import SuccessState from "./SuccessState";
import PreviewStep from "./PreviewStep";
import UploadStep from "./UploadStep";

export default function DocumentUploadModal({
  isOpen = true,
  caseId,
  onClose,
  onSubmit,
}) {
  const fileInputRef = useRef(null);
  const [step, setStep] = useState("upload");
  const [selectedType, setSelectedType] = useState("");
  // const [notes, setNotes] = useState("");
  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [progress, setProgress] = useState(0);
  const { mutate, isPending, isSuccess, reset } = useUploadDocument();

  if (!isOpen) return null;

  const isPreview = step === "preview";

  const chooseFile = () => {
    fileInputRef.current?.click();
  };

  const setSelectedFile = (nextFile) => {
    setFile(nextFile);
    setErrors((currentErrors) => ({ ...currentErrors, file: "" }));
  };

  const handleFileChange = (event) => {
    const nextFile = event.target.files?.[0];
    if (!nextFile) return;
    setSelectedFile(nextFile);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const nextFile = event.dataTransfer.files?.[0];
    if (!nextFile) return;
    setSelectedFile(nextFile);
  };

  const updateSelectedType = (value) => {
    setSelectedType(value);
    setErrors((currentErrors) => ({ ...currentErrors, documentType: "" }));
  };

  const onOk = () => {
    setStep("upload");
    handleClose();
  };

  const handleClose = () => {
    setFile(null);
    setSelectedType("");
    setErrors({});
    setProgress(0);
    reset();
    // setIsPreviewing(false);

    onClose?.();
  };

  const handleSubmit = () => {
    if (!caseId || !selectedType || !file) {
      setErrors({
        documentType: !selectedType ? "هذا الحقل مطلوب" : "",
        file: !file ? "يرجى اختيار ملف" : "",
      });

      if (!caseId) {
        toast.error("لا يمكن رفع الملف بدون رقم القضية");
      }
      return;
    }

    if (isPreview) {
      const formData = new FormData();
      formData.append("case_id", caseId);
      formData.append("file", file);
      formData.append("type", selectedType);
      // formData.append("notes", notes.trim());

      mutate(
        {
          formData,
          onUploadProgress: (percent) => {
            setProgress(percent);
          },
        },
        {
          onError: (error) => {
            toast.error(error.message);
          },
        },
      );
      return;
    }

    setStep("preview");
  };

  if (isPending) {
    return (
      <UploadingState
        file={file}
        progress={progress}
        onCancel={() => {
          setProgress(0);
          // setStep("select");
        }}
      />
    );
  }
  if (isSuccess) {
    return (
      <SuccessState
        file={file}
        onDone={onOk}
        // onViewDocument={onViewDocument}
      />
    );
  }
  return (
    <SharedModal
      isOpen={isOpen}
      title={isPreview ? "معاينة الملف" : "رفع مستند"}
      description={
        isPreview
          ? "راجع بيانات الملف قبل رفعه إلى مكتبة مستندات القضية"
          : "أضف مستنداً جديداً إلى ملف القضية"
      }
      titleId="document-upload-modal-title"
      icon={<UploadCloud size={22} />}
      onClose={handleClose}
      secondaryLabel={isPreview ? "تغيير الملف" : "إلغاء"}
      onSecondaryClick={isPreview ? () => setStep("upload") : onClose}
      primaryLabel={isPreview ? "رفع الملف" : "التالي"}
      primaryIcon={isPreview ? <UploadCloud size={18} /> : null}
      onPrimaryClick={handleSubmit}
    >
      <div className="space-y-5 p-8">
        {(errors.documentType || errors.file) && (
          <div className="rounded-lg bg-red-50 px-4 py-3 text-right text-xs font-semibold text-red-600">
            {errors.documentType || errors.file}
          </div>
        )}
        {isPreview ? (
          <PreviewStep
            file={file}
            selectedType={selectedType}
            updateSelectedType={updateSelectedType}
          />
        ) : (
          <UploadStep
            selectedType={selectedType}
            updateSelectedType={updateSelectedType}
            chooseFile={chooseFile}
            handleDrop={handleDrop}
            handleFileChange={handleFileChange}
            fileInputRef={fileInputRef}
            file={file}
            setFile={setFile}
          />
        )}
      </div>
    </SharedModal>
  );
}
