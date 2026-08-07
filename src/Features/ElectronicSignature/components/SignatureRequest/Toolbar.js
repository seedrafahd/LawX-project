import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from "lucide-react";

export default function Toolbar({
  zoom,
  setZoom,
  currentPage,
  setCurrentPage,
  numPages,
}) {
  return (
    <div className="flex items-center justify-between border-b bg-white p-4">
      <div className="flex gap-2">
        <button
          onClick={() => setZoom((z) => Math.max(400, z - 100))}
          className="rounded border p-2"
        >
          <ZoomOut />
        </button>

        <button
          onClick={() => setZoom((z) => Math.min(1600, z + 100))}
          className="rounded border p-2"
        >
          <ZoomIn />
        </button>
      </div>

      <div className="flex items-center gap-3">
        <button
          disabled={currentPage === numPages}
          onClick={() => setCurrentPage((p) => p + 1)}
          className="rounded border p-2"
        >
          <ChevronRight />
        </button>

        <div>
          {currentPage}/{numPages}
        </div>

        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => p - 1)}
          className="rounded border p-2"
        >
          <ChevronLeft />
        </button>
      </div>
    </div>
  );
}
