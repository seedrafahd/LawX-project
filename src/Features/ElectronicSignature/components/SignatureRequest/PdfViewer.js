import { Document, Page, pdfjs } from "react-pdf";
import SignatureBox from "./SignatureBox";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

export default function PdfViewer({
  file,
  currentPage,
  setCurrentPage,
  numPages,
  setNumPages,
  zoom,
  signers,
  selectedSigner,
  setSelectedSigner,
  updateSigner,
  isPlacingSignature,
  setIsPlacingSignature,
}) {
  function onLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <div className="h-[80vh] overflow-auto bg-slate-200 p-8">
      <Document file={file} onLoadSuccess={onLoadSuccess}>
        <div
          onClick={(e) => {
            if (!isPlacingSignature) return;

            const rect = e.currentTarget.getBoundingClientRect();

            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            updateSigner(selectedSigner, {
              page: currentPage,
              x,
              y,
              completed: true,
            });

            setIsPlacingSignature(false);
          }}
          className={`relative mx-auto w-fit shadow-xl ${
            isPlacingSignature ? "cursor-crosshair" : "cursor-default"
          }`}
        >
          <Page pageNumber={currentPage} width={zoom} />

          {signers
            .filter((s) => s.page === currentPage)
            .map((signer) => (
              <SignatureBox
                key={signer.id}
                signer={signer}
                active={selectedSigner === signer.id}
                updateSigner={updateSigner}
                setSelectedSigner={setSelectedSigner}
              />
            ))}
        </div>
      </Document>
    </div>
  );
}
