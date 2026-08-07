import useSignatureProcess from "../hooks/useSignatureProcess";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import SignatureStepper from "../components/SignatureRequest/SignatureStepper";
import SelectPdf from "../components/SignatureRequest/SelectPdf";
import SelectSigners from "../components/SignatureRequest/SelectSigners";
import SelectSignaturesPlaces from "../components/SignatureRequest/SelectSignaturesPlaces";
import { useSendSignatureRequest } from "../hooks/useSignature";
import Loader from "../../../shared/components/Loading";

export default function SignatureRequestPage() {
  const location = useLocation();
  const preloadedSigners = location.state?.signers || [];
  const [file, setFile] = useState(null);
  const signature = useSignatureProcess(preloadedSigners);
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedSignerIds, setSelectedSignerIds] = useState([]);

  const { mutate, isPending } = useSendSignatureRequest();

  const selectedSigners = signature.signers.filter((s) =>
    selectedSignerIds.includes(s.id),
  );

  // const handleAddSigner = (signer) => {
  //   signature.addSigner(signer);
  //   setSelectedSignerIds((prev) => [...prev, signer.id]);
  // };

  const handleSelectSignersNext = (signers) => {
    setSelectedSignerIds(signers.map((s) => s.id));
    setCurrentStep(3);
  };

  const buildFormData = () => {
    const formData = new FormData();

    formData.append("title", file.name);

    formData.append("file", file);
    console.log("signature.signers", signature.signers);

    selectedSigners.forEach((signer, index) => {
      formData.append(`signers[${index}][user_id]`, signer.user_id);

      formData.append(`signers[${index}][role]`, signer.role);

      formData.append(
        `signers[${index}][is_seal]`,
        signer.type === "seal" ? 1 : 0,
      );

      formData.append(`signers[${index}][page_number]`, signer.page);

      formData.append(`signers[${index}][x_position]`, Math.round(signer.x));

      formData.append(`signers[${index}][y_position]`, Math.round(signer.y));

      formData.append(`signers[${index}][width]`, Math.round(signer.width));

      formData.append(`signers[${index}][height]`, Math.round(signer.height));

      formData.append(`signers[${index}][sign_type]`, signer.type);
    });

    return formData;
  };

  const handleSubmit = () => {
    const formData = buildFormData();

    mutate(formData, {
      onSuccess: () => {
        window.history.back();
      },
    });
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="mx-auto max-w-[1700px] p-6">
        {isPending && <Loader />}
        <SignatureStepper currentStep={currentStep} />
        {currentStep === 1 && (
          <SelectPdf
            file={file}
            setFile={setFile}
            onNext={() => setCurrentStep(2)}
          />
        )}

        {currentStep === 2 && (
          <SelectSigners
            signers={signature.signers}
            file={file}
            initialSelectedIds={selectedSignerIds}
            onNext={handleSelectSignersNext}
            onBack={() => setCurrentStep(1)}
          />
        )}

        {currentStep === 3 && (
          <SelectSignaturesPlaces
            file={file}
            signature={signature}
            selectedSigners={selectedSigners}
            onNext={() => setCurrentStep(4)}
            onBack={() => setCurrentStep(2)}
            onSubmit={handleSubmit}
            isSubmitting={isPending}
          />
        )}
      </div>
    </div>
  );
}
