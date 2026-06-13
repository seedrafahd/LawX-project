import { Percent, CircleDollarSign } from "lucide-react";

export default function FinancialInfoCard({ caseData }) {
  const Item = ({ label, value }) => (
    <div className="flex flex-col gap-1">
      <span className="text-xs text-gray-500">{label}</span>

      <span className="text-sm font-semibold text-gray-800">
        {value || "-"}
      </span>
    </div>
  );

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-200 px-5 py-3 bg-[#f8f8f8]">
        <div className="flex items-center gap-2">
          <CircleDollarSign size={16} className="text-gray-600" />

          <h2 className="text-base font-semibold text-gray-800">
            المعلومات المالية
          </h2>
        </div>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Right Side */}
        <div className="space-y-8 p-6">
          <Item label="التكلفة الكلية" value={caseData.price} />

          <Item label="نوع الدفع" value={caseData.billing_type} />
        </div>

        {/* Left Side */}
        <div className="border-t border-gray-200 p-6 lg:border-r lg:border-t-0">
          <div className="space-y-8">
            <Item
              label="حالة الدفع"
              value={caseData.financialSummary?.payment_status}
            />

            <div className="flex flex-col gap-1">
              <span className="text-xs text-gray-500">نسبة التحصيل</span>

              <div className="flex items-center gap-2">
                <Percent size={14} className="text-gray-500" />
                <span className="text-sm font-semibold text-gray-800">
                  {caseData.collection_percentage}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
