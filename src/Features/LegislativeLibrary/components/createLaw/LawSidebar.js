import { FileArchive } from "lucide-react";
import SharedButton from "../../../../shared/components/SharedButton";
import { STATUS_OPTIONS } from "../../helpers/constants";

const statusDescriptions = {
  active: "القانون فعال ومطبق حالياً",
  amended: "تم إجراء تعديلات على نصه",
  repealed: "القانون غير ساري المفعول",
};

export default function LawSidebar({
  form,
  errors,
  updateField,
  handleCancel,
}) {
  const statusOptions = STATUS_OPTIONS.filter((option) => option.value);

  return (
    <aside className="space-y-4">
      {/* Status Card */}
      <div className="rounded-xl shadow-sm border border-gray-300 bg-white p-6">
        <div className="flex items-center gap-2 text-gray-900 font-semibold pb-2 border-b-2 border-gray-300">
          <FileArchive size={18} className="text-blue-700" />
          <span>حالة التشريع</span>
        </div>

        <div className="mt-4">
          <label className="font-medium text-slate-600">حالة القانون</label>

          <div className="space-y-2 mt-4">
            {statusOptions.map((option) => (
              <label
                key={option.value}
                className={`flex gap-2 transition cursor-pointer hover:bg-gray-100`}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="status"
                      value={option.value}
                      checked={form.status === option.value}
                      onChange={() => updateField("status", option.value)}
                      className="h-4 w-4 text-blue-600 border-slate-300 cursor-pointer focus:ring-blue-500"
                    />
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        option.value === "active"
                          ? "bg-emerald-100 text-emerald-700"
                          : option.value === "amended"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-rose-100 text-rose-700"
                      }`}
                    >
                      {option.label}
                    </span>
                  </div>

                  <span className="text-slate-700 text-sm">
                    {statusDescriptions[option.value]}
                  </span>
                </div>
              </label>
            ))}
          </div>

          <hr className="my-6 border-slate-200" />
        </div>
      </div>

      {/* Save Button */}
      <div className="space-y-3">
        <SharedButton
          children=" حفظ القانون"
          className="w-full"
          type="submit"
        />
        <SharedButton
          children=" إلغاء"
          colors="border border-slate-300 bg-white text-slate-600 font-semibold hover:bg-slate-50"
          className="w-full"
          onClick={handleCancel}
        />
      </div>
    </aside>
  );
}
