import { Eye } from "lucide-react";

export default function DocumentViewer({ fileUrl }) {
  return (
    <section className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm p-6">
      {/* ================= HEADER ================= */}

      <div className="flex flex-col gap-4 border-b border-gray-200 lg:flex-row lg:items-center lg:justify-between">
        {/* Title */}
        <div className="flex items-center gap-2 text-xl font-semibold text-gray-900 pb-4">
          <Eye className="h-5 w-5" />

          <h2>معاينة المستند</h2>
        </div>
      </div>

      {/* ================= PDF AREA ================= */}
      <div className="bg-gray-100 p-8 mt-6">
        <div className="mx-auto flex  max-w-4xl items-center justify-center rounded-lg border border-gray-300 bg-white shadow-lg">
          <iframe
            src={fileUrl}
            className="flex-1 w-full h-full bg-gray-200 order-2 sm:order-1"
            title="PDF Preview"
          />
        </div>
      </div>
    </section>
  );
}
