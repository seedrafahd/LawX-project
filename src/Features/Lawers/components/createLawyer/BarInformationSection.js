import { Landmark } from "lucide-react";

import SectionCard from "./SectionCard";
import SharedField from "../../../../shared/components/SharedFeild";

export default function BarInformationSection({ form, updateField, errors }) {
  return (
    <SectionCard
      title="معلومات النقابة"
      icon={<Landmark size={16} className="text-gray-900" />}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-6">
        <SharedField
          label="رقم بطاقة النقابة"
          error={errors.syndicate_card_number}
        >
          <input
            className="h-12 w-full rounded-lg border border-gray-300 bg-gray-50 px-4 text-sm text-gray-700 outline-none transition placeholder:text-gray-400"
            placeholder="110xxxx"
            type="number"
            value={form.syndicate_card_number}
            onChange={(e) =>
              updateField("syndicate_card_number", e.target.value)
            }
          />
        </SharedField>

        <SharedField label="فرع النقابة" error={errors.syndicate_branch}>
          <input
            className="h-12 w-full rounded-lg border border-gray-300 bg-gray-50 px-4 text-sm text-gray-700 outline-none transition placeholder:text-gray-400"
            placeholder="دمشق"
            value={form.syndicate_branch}
            onChange={(e) => updateField("syndicate_branch", e.target.value)}
          />
        </SharedField>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            حالة المحامي *
          </label>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => updateField("lawyer_state", "licensed")}
              className={`flex-1 py-2.5 rounded-xl border text-sm font-semibold transition-all ${
                form.lawyer_state === "licensed"
                  ? "bg-variable-collection-primary-color text-white border-variable-collection-primary-color"
                  : "bg-white text-gray-600 border-[#D9DEE8] hover:border-variable-collection-primary-color"
              }`}
            >
              محامي
            </button>
            <button
              type="button"
              onClick={() => updateField("lawyer_state", "trainee")}
              className={`flex-1 py-2.5 rounded-xl border text-sm font-semibold transition-all ${
                form.lawyer_state === "trainee"
                  ? "bg-variable-collection-primary-color text-white border-variable-collection-primary-color"
                  : "bg-white text-gray-600 border-[#D9DEE8] hover:border-variable-collection-primary-color"
              }`}
            >
              متدرب
            </button>
          </div>
        </div>
      </div>
    </SectionCard>
  );
}
