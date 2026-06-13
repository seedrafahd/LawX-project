import SharedButton from "../../../../shared/Components/SharedButton";
import FileAttachmentField from "../../../../shared/Components/FileAttachmentField";
import SummaryRow from "./SummaryRow";
import { useFileUpload } from "../../../../shared/Hooks/useFileUpload";
import { useMemo } from "react";
import TipCard from "./TipCard";

export default function InvoiceSummarySidebar({
  form,
  file,
  setFile,
  handleSubmit,
}) {
  const { fileInputRef, chooseFile, handleFileChange, handleDrop } =
    useFileUpload(setFile);

  const itemsTotal = useMemo(() => {
    return (form.items || []).reduce(
      (sum, item) => sum + Number(item.amount || 0),
      0,
    );
  }, [form]);

  return (
    <aside className="space-y-4">
      {/* Summary Card */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
        <h2 className="font-bold text-gray-900">ملخص الفاتورة</h2>

        <div className="space-y-3">
          <SummaryRow title="تاريخ الاستحقاق" value={form.due_date} />

          {form.items?.length > 0 && (
            <SummaryRow title="عدد البنود" value={form.items.length} />
          )}

          <div className="border-t-2 border-gray-300 pt-4">
            <div className="flex items-center justify-between text-sm text-blue-700 font-black">
              <span>الإجمالي</span>
              <span>{itemsTotal} SYP</span>
            </div>
          </div>
        </div>

        {/* Upload Area */}
        <div className="pt-4 space-y-4">
          <FileAttachmentField
            chooseFile={chooseFile}
            handleDrop={handleDrop}
            handleFileChange={handleFileChange}
            fileInputRef={fileInputRef}
            file={file}
            onDelete={() => setFile(null)}
          />
        </div>

        {/* Actions */}
        <SharedButton
          onClick={handleSubmit}
          children="إنشاء الفاتورة"
          className="w-full"
        />
        <SharedButton
          children="حفظ كمسودة"
          colors="bg-slate-100 text-gray-700 hover:bg-gray-200"
          className="w-full"
        />
      </div>

      {/* Tip Card */}
      <TipCard />
    </aside>
  );
}
