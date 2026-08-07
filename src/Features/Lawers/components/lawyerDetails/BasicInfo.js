import { User } from "lucide-react";
import InfoItem from "./InfoItem";
import { getDate } from "../../../../shared/helpers/date";

export default function BasicInfo({ lawyer }) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2">
          <User className="w-4 h-4 text-gray-800" />

          <h2 className="font-bold text-gray-900">المعلومات الأساسية</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
        <InfoItem title="اسم الأب" value={lawyer.father_name} />

        <InfoItem title="اسم الأم" value={lawyer.mother_name} />

        <InfoItem title="اسم عائلة الأم" value={lawyer.mother_family_name} />

        <InfoItem title="رقم الهوية الوطنية" value={lawyer.national_id} />

        <InfoItem title="مكان الولادة" value={lawyer.birth_place} />

        <InfoItem title="تاريخ الولادة" value={lawyer.birth_date} />

        <InfoItem
          title="رقم السجل المدني"
          value={lawyer.civil_registry_number}
        />

        <InfoItem
          title="رقم البطاقة النقابية"
          value={lawyer.syndicate_card_number}
        />

        <InfoItem title="فرع النقابة" value={lawyer.syndicate_branch} />

        <InfoItem title="تاريخ التسجيل" value={getDate(lawyer.created_at)} />
      </div>
    </div>
  );
}
