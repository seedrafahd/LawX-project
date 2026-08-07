import { Document, Page } from "react-pdf";

export default function ThumbnailPanel({
  file,

  numPages,

  currentPage,

  setCurrentPage,

  signers,
}) {
  return (
    <div className="overflow-y-auto h-[80vh] p-3 space-y-4">
      <Document file={file}>
        {Array.from(new Array(numPages), (_, i) => (
          <div
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`cursor-pointer rounded-lg border p-1 transition

${currentPage === i + 1 ? "border-blue-500 shadow" : "border-gray-300"}

`}
          >
            <Page pageNumber={i + 1} width={120} />

            <div className="mt-2 text-center text-xs">صفحة {i + 1}</div>

            {signers.filter((s) => s.page === i + 1).length > 0 && (
              <div className="mt-1 rounded bg-blue-600 py-1 text-center text-xs text-white">
                {signers.filter((s) => s.page === i + 1).length}
                توقيع
              </div>
            )}
          </div>
        ))}
      </Document>
    </div>
  );
}
