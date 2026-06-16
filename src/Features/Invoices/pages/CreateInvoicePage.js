import React, { useState } from "react";
import InvoiceDetailsSection from "../components/createInvoice/InvoiceInfoSection";
import InvoicePaymentSection from "../components/createInvoice/InvoicePaymentSection";
import InvoiceSummarySidebar from "../components/createInvoice/InvoiceSummarySidebar";
import { useInvoicForm } from "../hooks/useInvoiceForm";
import { useInvoiceSubmission } from "../hooks/useInvoiceSubmission";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../../shared/components/Loading";

export default function CreateInvoicePage() {
  const navigate = useNavigate();
  const { case_id } = useParams();
  const [paymentMode, setPaymentMode] = useState("full");

  const { form, errors, file, setFile, updateField, validate } =
    useInvoicForm();

  const { submit, isPending } = useInvoiceSubmission({
    form,
    file,
    case_id,
    validate,
    navigate,
  });

  return (
    <div className="space-y-6 text-gray-900">
      {isPending && <Loader />}

      {errors.form && (
        <div className="rounded-lg bg-red-50 border border-red-200 p-4 text-sm text-red-700">
          {errors.form}
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <span>الفواتير</span>
          <span>/</span>
          <span className="font-bold text-blue-600">إنشاء فاتورة جديدة</span>
        </div>

        <h1 className="text-xl font-bold text-gray-900">إنشاء فاتورة</h1>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* ===========  MAIN CONTENT ===================== */}
        <main className="lg:col-span-2 space-y-4">
          {/* Case Details */}
          {/* <InvoiceCaseSection /> */}
          {/* Billing Details */}
          <InvoiceDetailsSection
            form={form}
            setForm={updateField}
            errors={errors}
          />
          {/* Payment Configuration */}
          <InvoicePaymentSection
            form={form}
            paymentMode={paymentMode}
            setPaymentMode={setPaymentMode}
            setForm={updateField}
            errors={errors}
          />
        </main>

        {/* ===========  SIDEBAR ====================== */}
        <InvoiceSummarySidebar
          form={form}
          file={file}
          setFile={setFile}
          handleSubmit={submit}
        />
      </div>
    </div>
  );
}
