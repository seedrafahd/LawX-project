import { File } from "lucide-react";
import ArticlesSection from "./ArticlesSection";

export default function LegalTextSection({
  form,
  errors,
  updateField,
  addArticle,
  removeArticle,
  updateArticle,
}) {
  return (
    <section className="rounded-xl shadow-sm border border-gray-300 bg-white p-6">
      <div className="flex items-center gap-2 text-gray-900 font-semibold pb-2 border-b-2 border-gray-300">
        <File size={18} className="text-blue-700" />
        <span>النص القانوني الكامل</span>
      </div>

      <div className="mt-4">
        <textarea
          rows={7}
          value={form.content}
          onChange={(event) => updateField("content", event.target.value)}
          placeholder="ابدأ بكتابة النص القانوني هنا بصورة تفصيلية..."
          className="w-full resize-none rounded-lg border bg-[#f8f9fb] p-5 text-sm outline-none placeholder:text-[#c5cada] border-[#c9c7d6]"
        />
      </div>

      {/* ===== ARTICLES SECTION ===== */}
      <div className="mt-8 pt-6 border-t-2 border-gray-200">
        <div className="flex items-center justify-between gap-2 text-gray-900 font-semibold pb-4">
          <div className="flex items-center gap-2">
            <File size={18} className="text-blue-700" />
            <span>الفقرات</span>
          </div>
        </div>

        <div className="space-y-4">
          {form.articles.length === 0 && (
            <p className="text-sm text-gray-500">
              لم يتم إضافة أي فقرات بعد. أدخل عنوان الفقرة ومحتواها أدناه وقم
              بإضافتها.
            </p>
          )}
          <ArticlesSection form={form} setForm={updateField} errors={errors} />
        </div>
      </div>
    </section>
  );
}
