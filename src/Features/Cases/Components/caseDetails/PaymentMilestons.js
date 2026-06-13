import React from "react";
import { getDate, getTime } from "../../../../shared/helpers/date";

const statusConfig = {
  paid: {
    label: "مدفوعة",
    className: "bg-emerald-100 text-emerald-700",
  },
  pending: {
    label: "قيد الانتظار",
    className: "bg-orange-100 text-orange-700",
  },
  overdue: {
    label: "متأخرة",
    className: "bg-orange-100 text-orange-700",
  },
};

function StatusBadge({ status }) {
  const config = statusConfig[status];

  return (
    <span
      className={`
        inline-flex items-center justify-center
        px-3 py-1
        text-xs font-semibold
        rounded-full
        whitespace-nowrap
        ${config.className}
      `}
    >
      {config.label}
    </span>
  );
}

export default function PaymentMilestons({ payments }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 md:p-6">
      {/* Title */}
      <div className="mb-4">
        <h2 className="text-lg font-bold text-gray-900">مراحل دفع القضية</h2>
      </div>

      {/* Responsive Wrapper */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[700px]">
          <thead>
            <tr className="border-b-2 border-gray-300">
              <th className="pb-4 text-right text-sm font-bold text-gray-500">
                عنوان الدفعة
              </th>

              <th className="pb-4 text-right text-sm font-bold text-gray-500">
                تاريخ الاستحقاق
              </th>

              <th className="pb-4 text-right text-sm font-bold text-gray-500">
                قيمة الدفعة
              </th>

              <th className="pb-4 text-right text-sm font-bold text-gray-500">
                الحالة
              </th>
            </tr>
          </thead>

          <tbody>
            {payments.map((invoice) => (
              <tr
                key={invoice.id}
                className="
                  border-b border-gray-100
                  transition-colors duration-200
                  hover:bg-gray-50
                "
              >
                {/* Invoice Title */}
                <td className="py-4">
                  <span className="text-sm font-semibold text-gray-900">
                    {invoice.title}
                  </span>
                </td>

                {/* Due Date */}
                <td className="py-4 text-sm font-semibold text-gray-800">
                  <p>{getDate(invoice.due_date)}</p>
                  <p>{getTime(invoice.due_date)}</p>
                </td>

                {/* Amount */}
                <td className="py-4">
                  <span className="text-sm  font-semibold text-gray-900">
                    {invoice.amount} ل.س
                  </span>
                </td>

                {/* Status */}
                <td className="py-4">
                  <StatusBadge status={invoice.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
