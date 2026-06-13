import { useEffect, useMemo, useState } from "react";
import { UploadCloud } from "lucide-react";
import toast from "react-hot-toast";
import SharedModal from "../../../../shared/Components/SharedModal";
import { useUploadDocument } from "../../Hooks/useDocuments";
import UploadingState from "./UploadingState";
import SuccessState from "../SuccessState";
import PreviewStep from "./PreviewStep";
import UploadStep from "./UploadStep";
import PDFModal from "../OpenPDFModal";
import { useFileUpload } from "../../../../shared/Hooks/useFileUpload";

export default function DocumentUploadModal({
  isOpen = false,
  caseId,
  onClose,
}) {
  const [step, setStep] = useState("upload");
  const [selectedType, setSelectedType] = useState("");
  // const [notes, setNotes] = useState("");
  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [progress, setProgress] = useState(0);
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const { mutate, isPending, isSuccess, reset } = useUploadDocument();
  const { fileInputRef, chooseFile, handleFileChange, handleDrop } =
    useFileUpload(setFile);

  const previewFileUrl = useMemo(() => {
    return file ? URL.createObjectURL(file) : null;
  }, [file]);

  useEffect(() => {
    return () => {
      if (previewFileUrl) {
        URL.revokeObjectURL(previewFileUrl);
      }
    };
  }, [previewFileUrl]);

  if (!isOpen) return null;

  const isPreview = step === "preview";

  const updateSelectedType = (value) => {
    setSelectedType(value);
    setErrors((currentErrors) => ({ ...currentErrors, documentType: "" }));
  };

  const handleClose = () => {
    setStep("upload");
    setFile(null);
    setSelectedType("");
    setErrors({});
    setProgress(0);
    setIsPdfModalOpen(false);
    setUploadedFile(null);
    reset();

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

      setUploadedFile({
        File_name: file?.name || "مستند",
        file_url: previewFileUrl,
        file_size: file?.size ? `${(file.size / 1024).toFixed(2)} KB` : "غير متوفر",
        uploaded_AT: new Date().toLocaleString("ar-SA"),
        uploaded_by: { name: "أنت" },
      });
      mutate(
        {
          caseId,
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

  return (
    <>
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
        primaryLabel={isPreview ? "رفع الملف" : "التالي"}
        secondaryLabel={isPreview ? "تغيير الملف" : "إلغاء"}
        primaryIcon={isPreview ? <UploadCloud size={18} /> : null}
        onPrimaryClick={handleSubmit}
        onSecondaryClick={isPreview ? () => setStep("upload") : handleClose}
      >
        {isPending ? (
          <UploadingState file={file} progress={progress} />
        ) : isSuccess ? (
          <SuccessState
            file={file}
            onDone={handleClose}
            onViewDocument={() => setIsPdfModalOpen(true)}
          />
        ) : (
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
        )}
      </SharedModal>

      <PDFModal
        isOpen={isPdfModalOpen}
        onClose={() => setIsPdfModalOpen(false)}
        file={uploadedFile}
      />
    </>
  );
}
