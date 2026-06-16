import { ArrowRight } from "lucide-react";
import { replace, useLocation, useNavigate, useParams } from "react-router-dom";
import Loader from "../../../../shared/components/Loading";
import OfferForm from "../components/offerForm";
import { useOfferForm } from "../hooks/useOfferForm";
import { useOfferSubmission } from "../hooks/useOfferSubmission";
import { useFileUpload } from "../../../../shared/hooks/useFileUpload";

export default function SendOfferPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const title_request = location.state?.title_request;
  const { form, errors, file, setFile, updateField, validate } = useOfferForm();
  const { fileInputRef, chooseFile, handleFileChange, handleDrop } =
    useFileUpload(setFile);

  const { submit, isPending } = useOfferSubmission({
    form,
    file,
    requestId: id,
    validate,
    navigate,
  });

  const handleCancel = () => {
    if (id) {
      navigate(`/marketplace/requests/request_details/${id}`, replace);
      return;
    }
    navigate("/marketplace");
  };

  return (
    <main className="space-y-4">
      {isPending && <Loader />}

      <div className="flex items-center justify-between">
        <div className="flex gap-4">
          <button
            type="button"
            onClick={handleCancel}
            className="flex h-10 w-10 items-center text-[#111827]"
          >
            <ArrowRight />
          </button>

          <div>
            <h1 className="text-2xl font-bold text-gray-900">إرسال عرض</h1>
            <p className="text-sm text-gray-600">
              تقديم مقترح قانوني للطلب #{title_request || "غير محدد"}
            </p>
          </div>
        </div>
      </div>

      <OfferForm
        form={form}
        errors={errors}
        file={file}
        isPending={isPending}
        chooseFile={chooseFile}
        handleDrop={handleDrop}
        handleFileChange={handleFileChange}
        fileInputRef={fileInputRef}
        updateField={updateField}
        setFile={setFile}
        handleSubmit={submit}
        handleCancel={handleCancel}
      />
    </main>
  );
}
