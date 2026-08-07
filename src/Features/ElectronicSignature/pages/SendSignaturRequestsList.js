import { FileText } from "lucide-react";
import { useFilesToSign } from "../hooks/useSignature";
import Header from "../components/SendRequests/Header";
import { useFilters } from "../../../shared/hooks/useFilters";
import FilterBar from "../components/SendRequests/FilterBar";
import { useNavigate } from "react-router-dom";
import { useCaseDetails } from "../../Cases/hooks/useCases";
import SharedBadge from "../../../shared/components/sharedBadge";
import { statusStyles } from "../helper/constants";
import { getDate } from "../../../shared/helpers/date";
import Loader from "../../../shared/components/Loading";

const SIGNER_COLORS = {
  lawyer: "#2563eb",
  client: "#16a34a",
  bar: "#9333ea",
};

const buildSigner = (person, role) => ({
  id: crypto.randomUUID(),
  user_id: person?.user_id || person?.id || "",
  name: person?.name || person?.client_name || person?.full_name || "موقع جديد",
  email: person?.email || "",
  role,
  type: "signature",
  color: SIGNER_COLORS[role] || SIGNER_COLORS.bar,
  page: null,
  x: 0,
  y: 0,
  width: 140,
  height: 60,
  completed: false,
  status: "pending_position",
});

const buildSignersFromCase = (caseData) => {
  const signers = [];
  (caseData?.clients || []).forEach((client) =>
    signers.push(buildSigner(client, "client")),
  );
  (caseData?.team || []).forEach((member) =>
    signers.push(buildSigner(member, "lawyer")),
  );
  if (caseData?.Leader_lawyer_data) {
    signers.push(buildSigner(caseData.Leader_lawyer_data, "lawyer"));
  }
  return signers;
};

export default function SendSignatureRequestsList({ caseId }) {
  const navigate = useNavigate();
  const { filters, updateFilter } = useFilters({ status: "all", search: "" });
  const { data, isPending } = useFilesToSign();
  const { data: caseDetails } = useCaseDetails(caseId);
  const caseData = caseDetails?.data?.case;

  const documents = (data?.data || [])
    .filter((doc) => {
      const title = doc?.title || "";
      const matchesSearch =
        !filters.search ||
        title.toLowerCase().includes(filters.search.toLowerCase());
      const matchesStatus =
        !filters.status ||
        filters.status === "all" ||
        doc?.status === filters.status;
      return matchesSearch && matchesStatus;
    })
    .map((doc) => {
      const signers = doc?.signers || [];
      const signedCount = signers.filter((s) => s?.signed_at).length;
      const totalCount = signers.length;
      return {
        ...doc,
        signedCount,
        totalCount,
        progressPercent: totalCount
          ? Math.round((signedCount / totalCount) * 100)
          : 0,
        clientName:
          signers.find((s) => s?.role === "client")?.user?.full_name || "—",
        lawyerName:
          signers.find((s) => s?.role === "lawyer")?.user?.full_name || "—",
      };
    });
  console.log("documents", documents);

  const handleSignRequestClick = () => {
    const signers = buildSignersFromCase(caseData);
    navigate("/cases/send_sign_request", {
      state: {
        caseId,
        signers,
      },
    });
  };

  return (
    <div className="max-w-7xl mx-auto space-y-4">
      {isPending && <Loader />}
      {/* Header Section */}
      <Header onSignRequestClick={handleSignRequestClick} />

      {/* Filter Control Bar */}
      <FilterBar
        filters={filters}
        updateFilter={updateFilter}
        searchInput={filters.search}
        setSearchInput={(value) => updateFilter("search", value)}
      />

      {/* Data Table / Document List Section */}
      <section className="bg-[#F8FAFC] rounded-xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-right">
            {/* Table Header */}
            <thead>
              <tr className="border-b border-slate-200 bg-[#F1F5F9]/60 text-slate-600 text-xs font-bold">
                <th className="py-3.5 px-6">اسم المستند</th>
                <th className="py-3.5 px-6">المحامي / العميل</th>
                <th className="py-3.5 px-6">تاريخ الإنشاء</th>
                <th className="py-3.5 px-6">الحالة</th>
                <th className="py-3.5 px-6">توقيعات</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-slate-200/80 bg-white">
              {documents.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="py-10 text-center text-sm text-slate-400"
                  >
                    لا توجد مستندات
                  </td>
                </tr>
              )}

              {documents.map((doc) => {
                const status = statusStyles[doc?.status] || "";
                return (
                  <tr
                    key={doc.id}
                    className="hover:bg-slate-50/70 transition-colors"
                  >
                    {/* Document Info */}
                    <td className="py-4 px-6 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <PdfIcon color="red" />
                        <div>
                          <div className="text-sm font-bold text-slate-900">
                            {doc.title || "بدون اسم"}
                          </div>
                          <div className="text-xs text-slate-400 mt-0.5">
                            مستند PDF
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Lawyer / Client */}
                    <td className="py-4 px-6 whitespace-nowrap">
                      <div className="text-sm font-medium text-slate-800">
                        {doc.lawyerName}
                      </div>
                      <div className="text-xs text-slate-400 mt-0.5">
                        العميل: {doc.clientName}
                      </div>
                    </td>

                    {/* Date */}
                    <td className="py-4 px-6 whitespace-nowrap text-sm text-slate-600">
                      {getDate(doc?.created_at)}
                    </td>

                    {/* Status Badge */}
                    <td className="py-4 px-6 whitespace-nowrap">
                      <SharedBadge text={status.text} color={status.color} />
                    </td>

                    {/* Signatures Progress */}
                    <td className="py-4 px-6 whitespace-nowrap">
                      <div className="w-40 space-y-1.5">
                        <div className="text-xs font-medium text-slate-600">
                          تم توقيع {doc.signedCount} من {doc.totalCount}
                        </div>

                        {/* Progress Bar Container */}
                        <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden flex flex-row-reverse">
                          <div
                            className="h-full rounded-full transition-all bg-teal-700"
                            style={{ width: `${doc.progressPercent}%` }}
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

// Custom PDF Icon Component to mirror the red/gray icon style
function PdfIcon({ color = "red" }) {
  const isRed = color === "red";

  return (
    <div
      className={`relative flex items-center justify-center w-8 h-9 rounded-md border ${
        isRed ? "bg-red-50 border-red-200" : "bg-slate-100 border-slate-200"
      }`}
    >
      <FileText
        className={`w-5 h-5 ${isRed ? "text-red-500" : "text-slate-400"}`}
      />
      <span
        className={`absolute -bottom-1 -right-1 text-[8px] font-bold px-0.5 rounded ${
          isRed ? "bg-red-600 text-white" : "bg-slate-500 text-white"
        }`}
      >
        PDF
      </span>
    </div>
  );
}
