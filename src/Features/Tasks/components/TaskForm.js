import SharedField from "../../../shared/components/SharedFeild";
import { ChevronDown, Sparkles } from "lucide-react";
import { useAuth } from "../../Auth/hooks/useAuth";

export default function TaskForm({ form, errors, updateField, handleSubmit }) {
  const { user } = useAuth();
  const assignableUsers = [
    {
      id: user.ID,
      name: user.full_name,
    },
  ];
  return (
    <form id="task-form" onSubmit={handleSubmit} className="space-y-6 p-8">
      {/* Title */}
      <SharedField label=" عنوان المهمة" error={errors.title}>
        <input
          name="title"
          type="text"
          value={form.title}
          onChange={updateField}
          placeholder="مثلاً: مراجعة العقد الابتدائي للموكل"
          className="h-16 w-full rounded-2xl border border-slate-200 bg-[#FAFAFC] px-5 text-base text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-300 focus:bg-white focus:ring-4 focus:ring-indigo-100 hover:border-slate-300"
        />
      </SharedField>

      {/* Description */}
      <SharedField label=" وصف المهمة" error={errors.description}>
        <textarea
          name="description"
          rows={5}
          value={form.description}
          onChange={updateField}
          placeholder="اكتب تفاصيل المهمة والمتطلبات هنا..."
          className="w-full resize-none rounded-2xl border border-slate-200 bg-[#FAFAFC] px-5 py-4 text-base text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-300 focus:bg-white focus:ring-4 focus:ring-indigo-100 hover:border-slate-300"
        />
      </SharedField>

      {/* Row */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* Due Date */}
        <SharedField label=" تاريخ الاستحقاق" error={errors.due_date}>
          <div className="relative">
            <input
              name="due_date"
              type="date"
              value={form.due_date}
              onChange={updateField}
              placeholder="mm/dd/yyyy"
              className="h-14 w-full rounded-2xl border border-slate-200 bg-[#FAFAFC] pr-2 pl-4 text-base text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-300 focus:bg-white focus:ring-4 focus:ring-indigo-100 hover:border-slate-300"
            />
          </div>
        </SharedField>

        {/* Assign Responsible */}
        <SharedField label=" تعيين المسؤول" error={errors.assigned_to}>
          <div className="relative">
            <select
              name="assigned_to"
              value={form.assigned_to}
              onChange={updateField}
              className="h-14 w-full appearance-none rounded-2xl border border-slate-200 bg-[#FAFAFC] px-4 text-base text-slate-500 outline-none transition focus:border-indigo-300 focus:bg-white focus:ring-4 focus:ring-indigo-100 hover:border-slate-300"
            >
              <option value="" disabled>
                اختر المسؤول
              </option>
              {assignableUsers.map((ass) => (
                <option key={ass.id} value={ass.id}>
                  {ass.name}
                </option>
              ))}
            </select>

            <ChevronDown
              size={20}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
            />
          </div>
        </SharedField>
      </div>

      {/* Info Box */}
      <div className="flex items-start gap-3 rounded-2xl border border-blue-100 bg-[#F5F8FF] px-4 py-4">
        <div className="mt-0.5">
          <Sparkles size={20} className="text-indigo-500" />
        </div>

        <p className="text-sm leading-7 text-slate-600">
          بناءً على تاريخ الاستحقاق، سيقوم النظام تلقائياً بتذكير المسؤول قبل 24
          ساعة من الموعد النهائي.
        </p>
      </div>
    </form>
  );
}
