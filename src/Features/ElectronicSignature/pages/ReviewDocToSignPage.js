import React, { useEffect, useMemo, useState } from "react";
import { PenTool, ChevronLeft } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { statusStyles } from "../helper/constants";
import { getDate } from "../../../shared/helpers/date";
import { useReviewFile } from "../hooks/useSignature";
import SharedButton from "../../../shared/components/SharedButton";

export default function ReviewDocToSignPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const document = location.state?.document;
  const status =
    statusStyles[document?.request?.status] || statusStyles.in_progress;

  const { data } = useReviewFile({
    signature_request_id: document?.signature_request_id,
  });

  const pdfUrl = useMemo(
    () => (data ? URL.createObjectURL(data) : null),
    [data],
  );

  useEffect(() => {
    return () => {
      if (pdfUrl) URL.revokeObjectURL(pdfUrl);
    };
  }, [pdfUrl]);

  const [zoom, setZoom] = useState(100);

  return (
    <div className="max-w-7xl mx-auto space-y-4">
      {/* Breadcrumb Header */}
      <nav className="flex items-center gap-2 text-sm text-slate-500 font-medium">
        <span>القضايا</span>
        <ChevronLeft className="w-4 h-4 text-slate-400" />
        <span>قضية رقم 4529-2023</span>
        <ChevronLeft className="w-4 h-4 text-slate-400" />
        <span className="text-slate-900 font-bold">{"مراجعة المستند"}</span>
      </nav>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Side: Document Viewer (7 Columns on LG) */}
        <div className="lg:col-span-7 rounded-2xl border border-slate-200/80 shadow-xs">
          {/* Document Viewer Area */}
          <div className="p-4 sm:p-6 min-h-[640px] rounded-2xl bg-white">
            {!pdfUrl && (
              <p className="text-center text-slate-400 py-24 text-sm">
                جارٍ تحميل المستند...
              </p>
            )}

            {pdfUrl && (
              <div className="flex items-start justify-center overflow-auto">
                <iframe
                  src={pdfUrl}
                  title="معاينة المستند"
                  className="w-full rounded-lg border border-slate-200 bg-slate-50"
                  style={{
                    height: "640px",
                    transform: `scale(${zoom / 100})`,
                    transformOrigin: "top center",
                  }}
                />
              </div>
            )}
          </div>
          {/* </div> */}
        </div>

        {/* Right Side: Contract Metadata & Actions (5 Columns on LG) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Card 1: Document Main Info */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs relative">
            {/* Status Tag */}
            <div className="flex justify-start mb-2">
              <span className="bg-[#FEF8EC] text-[#D99B26] text-xs font-semibold px-3 py-1 rounded-md">
                {status.text}
              </span>
            </div>

            {/* Document Title */}
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mb-6">
              {document?.title || "مستند بدون اسم"}
            </h1>

            {/* Key-Value Details Table */}
            <div className="space-y-4 text-sm">
              {/* <div className="flex justify-between items-center py-1">
                <span className="text-slate-400 font-medium">النوع</span>
                <span className="text-slate-800 font-semibold">
                  اتفاقية قانونية
                </span>
              </div>

              <div className="flex justify-between items-center py-1">
                <span className="text-slate-400 font-medium">القضية</span>
                <span className="text-slate-800 font-semibold">
                  {document?.request?.case?.title || "لا يوجد قضية مرتبطة"}
                </span>
              </div> */}

              <div className="flex justify-between items-center py-1">
                <span className="text-slate-400 font-medium">
                  المحامي المسند
                </span>
                <span className="text-slate-800 font-semibold">
                  {document?.request?.lawyer?.full_name || "—"}
                </span>
              </div>

              <div className="flex justify-between items-center py-1">
                <span className="text-slate-400 font-medium">
                  تاريخ الإصدار
                </span>
                <span className="text-slate-800 font-semibold">
                  {getDate(document?.request?.created_at) || "—"}
                </span>
              </div>
            </div>
          </div>

          {/* Card 3: Signature Notice Box */}
          <div className="bg-[#F0F5FF] border border-[#DBE5FF] rounded-2xl p-5 shadow-xs flex items-center justify-between gap-4">
            <div className="space-y-1 text-right">
              <h3 className="text-sm font-bold text-[#2B3A67]">
                معلومات التوقيع
              </h3>
              <p className="text-xs text-[#526394] leading-relaxed">
                هذا المستند يتطلب توقيعك الإلكتروني. بعد الضغط على زر التوقيع
                سيتم نقلُك إلى منصة التوقيع الإلكتروني لإكمال العملية.
              </p>
            </div>

            <div className="w-11 h-11 rounded-xl bg-[#2B3A67] text-white flex items-center justify-center shrink-0 shadow-sm">
              <PenTool className="w-5 h-5" />
            </div>
          </div>

          <div className="flex justify-between items-center gap-4">
            <SharedButton
              onClick={() =>
                navigate(`/cases/required_signatures/${document.id}/sign`, {
                  replace: true,
                  state: {
                    signature_request_id: document.signature_request_id,
                    return_url: `http://localhost:3000/cases/document_details/${document.id}/review`,
                  },
                })
              }
            >
              توقيع المستند
            </SharedButton>

            <SharedButton
              colors="bg-gray-200 text-gray-700 hover:bg-gray-300"
              onClick={() => window.history.back()}
            >
              رجوع
            </SharedButton>
          </div>
        </div>
      </div>
    </div>
  );
}
