import { Info } from "lucide-react";

export default function TemplateInfoSection({ template }) {
  return (
    <div className="bg-white rounded-xl border border-[#D9E0EA] shadow-sm p-8">
      <div className="border-b border-[#E4E8EF] pb-4 mb-6">
        <div className="flex items-center gap-2 text-xl font-semibold text-gray-800">
          <Info />
          <h3>معلومات القالب</h3>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <InfoItem title="اسم القالب" value={template.Template_name} />

        <InfoItem title="الفئة" value={template.Template_category} />

        <InfoItem title="الوصف" value={template.Template_description} />

        <InfoItem title="تاريخ الإنشاء" value={template.Template_created_at} />

        <InfoItem title="آخر تعديل" value={template.Template_updated_at} />
      </div>
    </div>
  );
}

function InfoItem({ title, value }) {
  return (
    <div>
      <div className="text-gray-500 font-medium text-sm mb-1">{title}</div>

      <div className="font-bold text-gray-900">{value}</div>
    </div>
  );
}
