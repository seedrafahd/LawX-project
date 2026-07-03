import { ArrowRight } from "lucide-react";

export default function DocDetailsHeader({ fileName, caseTitle, handleBack }) {
  return (
    <header className="space-y-2">
      {/* Right Side */}
      <div className="flex items-center gap-2 text-sm text-blue-600">
        <button
          className="flex items-center justify-center transition hover:text-blue-800"
          onClick={handleBack}
        >
          <ArrowRight className="h-5 w-5" />
        </button>

        <h1 className="flex items-center gap-2">
          تفاصيل القضية
          <span>{caseTitle}</span>
        </h1>
      </div>

      <div className="flex items-center gap-3">
        <h1 className="text-xl font-bold text-gray-900">{fileName}</h1>
        <span className="rounded-full bg-blue-500 px-3 py-1 text-sm font-semibold text-white">
          الإصدار V3
        </span>

        <span className="rounded-full bg-[#163A6B] px-3 py-1 text-sm font-semibold text-white">
          PDF
        </span>
      </div>
    </header>
  );
}
