import SharedField from "../../../../../shared/Components/SharedFeild";

export default function OfferDescriptionCard({ form, errors, updateField }) {
  return (
    <section className="bg-white rounded-lg shadow-sm p-6 md:p-8 space-y-6">
     
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
    </section>
  );
}
