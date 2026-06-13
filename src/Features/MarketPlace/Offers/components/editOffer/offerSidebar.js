import SharedField from "../../../../../shared/Components/SharedFeild";
import { CURRENCY_OPTIONS } from "../../../../../shared/Constants/currencyOptions";
import SharedButton from "../../../../../shared/Components/SharedButton";

export default function OfferSidebar({ form, errors, updateField }) {
  return (
    <aside className="bg-white rounded-lg shadow-sm p-6 space-y-6 self-start">
      {/* Title */}
      <h3 className="text-lg font-bold text-gray-900">تفاصيل التنفيذ</h3>

      {/* Price */}
      <SharedField label=" السعر المقترح" error={errors.price}>
        <div
          className={`flex px-4 h-12 overflow-hidden rounded-lg border bg-[#f8f9fb]`}
        >
          <input
            type="number"
            min="0"
            step="1"
            value={form.price}
            onChange={(e) => updateField("price", e.target.value)}
            placeholder="0.00"
            className="w-full bg-transparent text-sm text-gray-500 outline-none placeholder:text-gray-300"
          />
          <select
            value={form.price_currency}
            onChange={(event) =>
              updateField("price_currency", event.target.value)
            }
            aria-label="عملة السعر"
            className="min-w-[74px] border-r border-gray-300 bg-transparent pr-3 text-sm font-bold text-gray-700 outline-none"
          >
            {CURRENCY_OPTIONS.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </div>
      </SharedField>

      {/* Duration */}
      <SharedField label=" المدة المتوقعة" error={errors.estimated_days}>
        <input
          type="text"
          value={form.estimated_days}
          placeholder="3 أشهر مثلاً"
          onChange={(event) =>
            updateField("estimated_days", event.target.value)
          }
          className="h-12 w-full rounded-lg border border-gray-300 bg-gray-50 px-4 text-sm text-gray-700 outline-none transition placeholder:text-gray-400"
        />
      </SharedField>
      
      <SharedField label="شروط الدفع" error={errors.payment_terms}>
        <input
          type="text"
          value={form.payment_terms}
          onChange={(event) => updateField("payment_terms", event.target.value)}
          className="h-12 w-full rounded-lg border border-gray-300 bg-gray-50 px-4 pl-11 text-right text-sm text-gray-700 outline-none transition placeholder:text-gray-400"
        />
      </SharedField>

      <SharedField label="العرض متاح حتى:" error={errors.valid_until}>
        <input
          type="date"
          lang="en-CA"
          value={form.valid_until}
          onChange={(event) => updateField("valid_until", event.target.value)}
          className="hearing-date-input h-12 w-full rounded-lg border border-gray-300 bg-gray-50 px-4 pl-11 text-center text-sm text-gray-700 outline-none transition placeholder:text-gray-400"
        />
      </SharedField>

      {/* Actions */}
      <div className="space-y-3">
        <SharedButton
          children=" حفظ التعديلات"
          className="w-full"
          type="submit"
        />
      </div>
    </aside>
  );
}
