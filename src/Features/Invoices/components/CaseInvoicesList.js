import { useNavigate, useParams } from "react-router-dom";
import SharedButton from "../../../shared/Components/SharedButton";
import { InvoiceCard } from "./InvoiceCard";

export default function CaseInvoicesList({ invoices }) {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <section className="bg-white rounded-xl shadow-sm p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        {/* Title */}
        <h3 className="text-lg font-bold text-gray-900">فواتير القضية</h3>
        {/* Button */}
        <SharedButton onClick={() => navigate(`/invoices/create/${id}`)}>
          إنشاء فاتورة جديدة
        </SharedButton>
      </div>

      {/* Invoices List */}
      {invoices.length ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {invoices?.map((invoice, index) => (
            <InvoiceCard key={index} invoice={invoice} />
          ))}
        </div>
      ) : (
        <p className="rounded-xl bg-white p-8 text-center text-sm font-semibold text-gray-500">
          لا توجد فواتير بعد
        </p>
      )}
    </section>
  );
}
