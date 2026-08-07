import { useState } from "react";
import PdfViewer from "./PdfViewer";
import SignersSidebar from "./SignersSidebar";
import StepNavigation from "./StepNavigation";
import Toolbar from "./Toolbar";
import PropertiesPanel from "./PropertiesPanel";
import SignatureRequestFooter from "./SignatureRequestFooter";

export default function SelectSignaturesPlaces({
  file,
  signature,
  selectedSigners,
  onNext,
  onBack,
  onSubmit,
  isSubmitting,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [zoom, setZoom] = useState(850);
  const [numPages, setNumPages] = useState(0);

  const allPlaced =
    selectedSigners.length > 0 && selectedSigners.every((s) => s.completed);

  return (
    <>
      <div className="mt-6 rounded-xl bg-white shadow">
        <Toolbar
          zoom={zoom}
          setZoom={setZoom}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          numPages={numPages}
        />

        <div className="grid grid-cols-12">
          {/* Signers */}

          <div className="col-span-2 border-l">
            <SignersSidebar
              signers={selectedSigners}
              selectedSigner={signature.selectedSigner}
              setSelectedSigner={signature.setSelectedSigner}
              setIsPlacingSignature={signature.setIsPlacingSignature}
            />
          </div>

          {/* PDF */}

          <div className="col-span-8">
            <PdfViewer
              file={file}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              numPages={numPages}
              setNumPages={setNumPages}
              zoom={zoom}
              signers={selectedSigners}
              selectedSigner={signature.selectedSigner}
              setSelectedSigner={signature.setSelectedSigner}
              updateSigner={signature.updateSigner}
              isPlacingSignature={signature.isPlacingSignature}
              setIsPlacingSignature={signature.setIsPlacingSignature}
            />
          </div>

          {/* Pages */}

          <div className="col-span-2 border-r">{/* <Thumbnails /> */}</div>
        </div>
      </div>

      <div className="mt-5">
        <PropertiesPanel
          signers={selectedSigners}
          selectedSigner={signature.selectedSigner}
          updateSigner={signature.updateSigner}
        />
      </div>

      <StepNavigation onBack={onBack} />
      <SignatureRequestFooter
        onSubmit={onSubmit}
        isSubmitting={isSubmitting}
        disabled={!allPlaced}
      />
    </>
  );
}
