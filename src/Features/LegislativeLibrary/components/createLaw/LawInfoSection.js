import { File } from "lucide-react";
import SharedField from "../../../../shared/components/SharedFeild";
import RelatedLegislationSelect from "./RelatedLegislationSelect";

export default function LawInfoSection({ form, errors, updateField }) {
  return (
    <section className="rounded-xl shadow-sm border border-gray-300 bg-white p-6">
      <div className="flex items-center gap-2 text-gray-900 font-semibold pb-2 border-b-2 border-gray-200">
        <File size={18} className="text-blue-700" />
        <h3>المعلومات الأساسية</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div className="md:col-span-2">
          <SharedField label="عنوان القانون" error={errors.title}>
            <input
              className="h-12 w-full rounded-lg border border-gray-300 bg-gray-50 px-4 text-sm text-gray-700 outline-none transition placeholder:text-gray-400"
              placeholder="مثال: قانون حماية البيانات الشخصية"
              value={form.title}
              onChange={(e) => updateField("title", e.target.value)}
            />
          </SharedField>
        </div>

        <SharedField label="رقم القانون" error={errors.number}>
          <input
            className="h-12 w-full rounded-lg border border-gray-300 bg-gray-50 px-4 text-sm text-gray-700 outline-none transition placeholder:text-gray-400"
            placeholder="مثال: 124/2023"
            value={form.number}
            onChange={(e) => updateField("number", e.target.value)}
          />
        </SharedField>

        <SharedField label="تاريخ السريان" error={errors.effective_date}>
          <input
            type="date"
            lang="en-CA"
            value={form.effective_date}
            onChange={(e) => updateField("effective_date", e.target.value)}
            className="hearing-date-input h-12 w-full rounded-lg border border-gray-300 bg-gray-50 px-4 pl-11 text-center text-sm text-gray-700 outline-none transition placeholder:text-gray-400"
          />
        </SharedField>

        <SharedField label="التصنيف القانوني" error={errors.category}>
          <select
            value={form.category}
            onChange={(e) => updateField("category", e.target.value)}
            className="h-12 w-full rounded-lg border border-gray-300 bg-gray-50 px-4 text-sm text-gray-700 outline-none transition placeholder:text-gray-400"
          >
            <option>اختر التصنيف...</option>
            <option value="2bcd9146-4982-4575-a78a-ad32886857c2">
              قضايا االعقارات
            </option>
          </select>
        </SharedField>

        <SharedField label="الدولة" error={errors.country}>
          <input
            className="h-12 w-full rounded-lg border border-gray-300 bg-gray-50 px-4 text-sm text-gray-700 outline-none transition placeholder:text-gray-400"
            placeholder="مثال: سوريا"
            value={form.country}
            onChange={(e) => updateField("country", e.target.value)}
          />
        </SharedField>

        <SharedField label="الكتاب" error={errors.book}>
          <input
            className="h-12 w-full rounded-lg border border-gray-300 bg-gray-50 px-4 text-sm text-gray-700 outline-none transition placeholder:text-gray-400"
            placeholder="مثال: الكتاب الأول: الالتزامات بوجه عام"
            value={form.book}
            onChange={(e) => updateField("book", e.target.value)}
          />
        </SharedField>
        <SharedField label="الباب" error={errors.part}>
          <input
            className="h-12 w-full rounded-lg border border-gray-300 bg-gray-50 px-4 text-sm text-gray-700 outline-none transition placeholder:text-gray-400"
            placeholder="مثال: الباب الأول: مصادر الالتزام"
            value={form.part}
            onChange={(e) => updateField("part", e.target.value)}
          />
        </SharedField>
        <SharedField label="الفصل" error={errors.chapter}>
          <input
            className="h-12 w-full rounded-lg border border-gray-300 bg-gray-50 px-4 text-sm text-gray-700 outline-none transition placeholder:text-gray-400"
            placeholder="مثال: الفصل الأول: العقد"
            value={form.chapter}
            onChange={(e) => updateField("chapter", e.target.value)}
          />
        </SharedField>
        <RelatedLegislationSelect
          selectedIds={form.related_legislation_ids}
          onChange={(ids) => updateField("related_legislation_ids", ids)}
          error={errors.related_legislation_ids}
        />
      </div>
    </section>
  );
}
