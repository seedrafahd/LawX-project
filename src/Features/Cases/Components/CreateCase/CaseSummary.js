import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";

export default function CaseSummary({ formData }) {
  console.log(formData);
  return (
    <div className="space-y-4">
      <div className="bg-white rounded-xl p-5 shadow-sm">
        <h3 className="font-semibold mb-4 border-b-2">ملخص القضية</h3>

        <div className="space-y-3 text-sm">
          {formData.client_id && (
            <Row label="العميل" value={formData.client_name} />
          )}
          {formData.type && <Row label="نوع القضية" value={formData.type} />}
          {formData.payment_plan && (
            <Row label="خطة الدفع" value={formData.payment_plan} />
          )}
          {formData.lawyer && <Row label="المحامي" value={formData.lawyer} />}
        </div>

        {formData.fees > 0 && (
          <div className="border-t mt-4 pt-4 flex justify-between font-semibold">
            <span>إجمالي الأتعاب</span>
            <span>${formData.fees}</span>
          </div>
        )}
      </div>

      {/* Alert */}
      <div
        className="bg-variable-collection-primary-color/10 text-variable-collection-primary-color border border-gray-300 
      flex gap-3 px-[15px] py-[14px] rounded-xl text-sm"
      >
        <ErrorOutlineOutlinedIcon />
        سيتم ارسال اشعار للعميل فور اعتماد القضية لبدء إجراءات التعاقد
        الإلكتروني
      </div>
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex flex-col justify-between">
      <span className="text-gray-500">{label}</span>
      <span>{value}</span>
    </div>
  );
}
