import React from "react";
import { FileText, Search } from "lucide-react";
import SharedButton from "../../../shared/components/SharedButton";
import { useFilesRequireSign } from "../hooks/useSignature";
import SharedBadge from "../../../shared/components/sharedBadge";
import { statusStyles } from "../helper/constants";
import { getDate } from "../../../shared/helpers/date";
import { replace, useNavigate } from "react-router-dom";
import Loader from "../../../shared/components/Loading";

const DocumentCard = ({ document, onReview }) => {
  console.log(document);
  return (
    <div className="bg-[#FBFBFD] rounded-2xl border border-gray-200 p-4 shadow-sm">
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center gap-2">
          {/* PDF Icon Badge */}
          <div className="relative flex items-center justify-center w-10 h-11 bg-red-50 border border-red-200 rounded-lg shrink-0">
            <FileText className="w-6 h-6 text-red-500" />
            <span className="absolute -bottom-1 -right-1 text-[8px] font-bold px-0.5 rounded bg-red-600 text-white">
              PDF
            </span>
          </div>

          <div className="flex flex-col">
            <h3 className="text-gray-900 mb-2">
              {document.title || "اسم الملف"}
            </h3>

            <p className="text-gray-400 text-xs">
              المحامي:{" "}
              <span className="font-semibold text-gray-500">
                {document?.request.lawyer.full_name || "اسم المحامي"}
              </span>
            </p>
          </div>
        </div>
        <SharedBadge
          text={statusStyles[document.request.status]?.text || ""}
          color={statusStyles[document.request.status]?.color || "yellow"}
        />
      </div>

      <hr className="border-gray-200 my-2" />

      {/* Bottom Row: Action Button & Date */}
      <div className="flex justify-between items-center pt-1">
        <span className="text-gray-400 text-xs">
          تاريخ الإرسال: {getDate(document?.request.created_at)}
        </span>

        <SharedButton onClick={() => onReview(document)}>
          مراجعة المستند
        </SharedButton>
      </div>
    </div>
  );
};

export default function RequireToSignPage() {
  const { data, isPending } = useFilesRequireSign();
  const documents = data?.data || [];
  const navigate = useNavigate();

  const handleReview = (document) => {
    navigate(`/cases/document_details/${document.id}/review`, {
      state: { document },
    });
  };

  return (
    <div className="space-y-6">
      {isPending && <Loader />}
      {/* Search Bar */}
      <div className="relative">
        <Search
          size={20}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <input
          //   value={filters.search}
          //   onChange={(e) => updateFilter("search", e.target.value)}
          type="text"
          placeholder="ابحث باسم الملف"
          className="w-full h-14 rounded-lg border border-gray-300 bg-[#fafbfd] pr-12 pl-4 outline-none focus:border-2"
        />
      </div>
      {/* Document Cards */}
      {documents.length === 0 && (
        <div className="rounded-xl bg-white p-8 text-center text-sm font-semibold text-gray-500">
          لا يوجد مستندات لتوقيعها بعد
        </div>
      )}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {documents.map((doc) => (
          <DocumentCard key={doc.id} document={doc} onReview={handleReview} />
        ))}
      </div>
    </div>
  );
}
