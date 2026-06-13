import React from "react";

const StatusBadge = ({ status }) => {
  const styles = {
    paid: "bg-green-100 text-green-700",
    unpaid: "bg-orange-100 text-orange-700",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold tracking-wide ${styles[status]}`}
    >
      {status}
    </span>
  );
};

export const InvoiceCard = ({ invoice }) => {
  return (
    <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-[#EFF1F8]/40 p-4 transition hover:shadow-sm">
      {/* Right Side - Invoice Info */}
      <div className="text-right">
        <h2 className="font-semibold text-gray-900">
          {invoice.details[0]?.title}
        </h2>

        <div className="flex gap-2">
          <p className="mt-1 text-sm font-medium text-gray-500">
            {invoice.details[0]?.description}
          </p>
          <p className="mt-1 text-sm font-medium text-gray-500">
            {invoice.due_date}
          </p>
        </div>
      </div>

      {/* Left Side - Amount & Status */}
      <div className="flex flex-col items-start gap-2">
        <h3 className="font-semibold text-gray-900">
          {invoice.total_amount + " $"}
        </h3>

        <StatusBadge status={invoice.status} />
      </div>
    </div>
  );
};
