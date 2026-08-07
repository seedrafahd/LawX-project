import PersonIcon from "@mui/icons-material/Person";

import SectionCard from "./SectionCard";
import SharedField from "../../../../shared/components/SharedFeild";

export default function PersonalInformationSection({
  form,
  updateField,
  errors,
}) {
  return (
    <SectionCard
      title="المعلومات الشخصية"
      icon={<PersonIcon size={16} className="text-gray-900" />}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-x-6 gap-y-6">
        {/* الصف الأول */}

        <SharedField label="رقم الهوية الوطنية" error={errors.national_id}>
          <input
            className="h-12 w-full rounded-lg border border-gray-300 bg-gray-50 px-4 text-sm text-gray-700 outline-none transition placeholder:text-gray-400"
            placeholder="110203xxxx"
            type="number"
            value={form.national_id}
            onChange={(e) => updateField("national_id", e.target.value)}
          />
        </SharedField>

        <SharedField label="الاسم الكامل" error={errors.full_name}>
          <input
            className="h-12 w-full rounded-lg border border-gray-300 bg-gray-50 px-4 text-sm text-gray-700 outline-none transition placeholder:text-gray-400"
            placeholder="الاسم الأول والشهرة"
            value={form.full_name}
            onChange={(e) => updateField("full_name", e.target.value)}
          />
        </SharedField>

        <SharedField label="اسم الأب" error={errors.father_name}>
          <input
            className="h-12 w-full rounded-lg border border-gray-300 bg-gray-50 px-4 text-sm text-gray-700 outline-none transition placeholder:text-gray-400"
            value={form.father_name}
            onChange={(e) => updateField("father_name", e.target.value)}
          />
        </SharedField>
        <SharedField label="اسم الأم" error={errors.mother_name}>
          <input
            className="h-12 w-full rounded-lg border border-gray-300 bg-gray-50 px-4 text-sm text-gray-700 outline-none transition placeholder:text-gray-400"
            value={form.mother_name}
            onChange={(e) => updateField("mother_name", e.target.value)}
          />
        </SharedField>

        {/* الصف الثاني */}

        <SharedField label="اسم عائلة الأم" error={errors.mother_family_name}>
          <input
            className="h-12 w-full rounded-lg border border-gray-300 bg-gray-50 px-4 text-sm text-gray-700 outline-none transition placeholder:text-gray-400"
            value={form.mother_family_name}
            onChange={(e) => updateField("mother_family_name", e.target.value)}
          />
        </SharedField>

        <SharedField label="تاريخ الولادة" error={errors.birth_date}>
          <input
            type="date"
            className="h-12 w-full rounded-lg border border-gray-300 bg-gray-50 px-4 text-sm text-gray-700 outline-none transition placeholder:text-gray-400"
            value={form.birth_date}
            onChange={(e) => updateField("birth_date", e.target.value)}
          />
        </SharedField>

        <SharedField label="مكان الولادة" error={errors.birth_place}>
          <input
            className="h-12 w-full rounded-lg border border-gray-300 bg-gray-50 px-4 text-sm text-gray-700 outline-none transition placeholder:text-gray-400"
            value={form.birth_place}
            onChange={(e) => updateField("birth_place", e.target.value)}
          />
        </SharedField>

        <SharedField
          label="رقم السجل المدني"
          error={errors.civil_registry_number}
        >
          <input
            className="h-12 w-full rounded-lg border border-gray-300 bg-gray-50 px-4 text-sm text-gray-700 outline-none transition placeholder:text-gray-400"
            value={form.civil_registry_number}
            onChange={(e) =>
              updateField("civil_registry_number", e.target.value)
            }
          />
        </SharedField>
      </div>
    </SectionCard>
  );
}
