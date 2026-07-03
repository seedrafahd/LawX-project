import { ScanText } from "lucide-react";

export default function OCRTextCard({ ai_summary }) {
  return (
    <section className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm p-6">
      {/* Header */}
      <div className="flex items-center gap-2 text-xl font-semibold text-gray-900  border-b border-gray-200 mb-6 pb-4">
        <ScanText className="h-5 w-5" />

        <h2>النص المستخرج (OCR)</h2>
      </div>

      {/* OCR Body */}
      <div className="overflow-y-auto border border-gray-200 bg-gray-100 p-5">
        <pre className="whitespace-pre-wrap leading-9 text-[15px] font-medium text-gray-700 font-sans">
          {ai_summary || "لا يوجد نص مستخرج"}
        </pre>
      </div>
    </section>
  );
}
