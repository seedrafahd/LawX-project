import FileAttachmentField from "../../../../shared/components/FileAttachmentField";
import SharedField from "../../../../shared/components/SharedFeild";
import { CURRENCY_OPTIONS } from "../../../../shared/constants/currencyOptions";

export default function OfferForm({
  form,
  errors,
  file,
  isPending,
  chooseFile,
  handleDrop,
  handleFileChange,
  fileInputRef,
  updateField,
  setFile,
  handleSubmit,
  handleCancel,
}) {
  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl bg-white p-8 space-y-4 text-[#111827]"
    >
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <SharedField label=" السعر المقترح" error={errors.price}>
          <div
            className={`flex px-4 h-12 overflow-hidden rounded-lg border bg-[#f8f9fb]`}
          >
            <input
              type="number"
              min="0"
              step="1"
              value={form.price}
              onChange={(event) => updateField("price", event.target.value)}
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

        <SharedField label=" المدة المتوقعة" error={errors.estimated_days}>
          <input
            type="text"
            value={form.estimated_days}
            placeholder="3 أشهر مثلاً"
            onChange={(event) =>
              updateField("estimated_days", event.target.value)
            }
            className="h-12 w-full rounded-lg border border-gray-300 bg-gray-50 px-4 pl-11 text-right text-sm text-gray-700 outline-none transition placeholder:text-gray-400"
          />
        </SharedField>
      </div>
      <SharedField label="العرض متاح حتى:" error={errors.valid_until}>
        <input
          type="date"
          lang="en-CA"
          value={form.valid_until}
          onChange={(event) => updateField("valid_until", event.target.value)}
          className="hearing-date-input h-12 w-full rounded-lg border border-gray-300 bg-gray-50 px-4 pl-11 text-center text-sm text-gray-700 outline-none transition placeholder:text-gray-400"
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

      <SharedField label=" وصف العرض" error={errors.message_for_client}>
        <textarea
          rows={7}
          value={form.message_for_client}
          onChange={(event) =>
            updateField("message_for_client", event.target.value)
          }
          placeholder="اكتب تفاصيل عرضك، منهجية العمل، والخدمات التي ستقدمها..."
          className="w-full resize-none rounded-lg border bg-[#f8f9fb] p-5 text-sm outline-none placeholder:text-[#c5cada] border-[#c9c7d6]"
        />
      </SharedField>

      <FileAttachmentField
        chooseFile={chooseFile}
        handleDrop={handleDrop}
        handleFileChange={handleFileChange}
        fileInputRef={fileInputRef}
        file={file}
        onDelete={() => setFile(null)}
      />
      {errors.file && <p className="text-xs text-red-600">{errors.file}</p>}

      <div className="border-t border-[#e1e5ef] pt-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <button
            type="submit"
            disabled={isPending}
            className="h-14 rounded-lg bg-variable-collection-primary-color text-base font-bold text-white shadow-lg shadow-[#44598f]/25 hover:bg-[#2b3b66] disabled:cursor-not-allowed disabled:opacity-70"
          >
            إرسال عرض
          </button>

          <button
            type="button"
            onClick={handleCancel}
            disabled={isPending}
            className="h-14 rounded-lg bg-[#f3f3f3] text-base font-bold text-gray-500 hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-70"
          >
            إلغاء
          </button>
        </div>
      </div>
    </form>
  );
}
