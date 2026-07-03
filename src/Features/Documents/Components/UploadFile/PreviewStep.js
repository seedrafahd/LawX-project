import SharedField from "../../../../shared/components/SharedFeild";
import CompactFilePreview from "../CompactFilePreview";
import SelectField from "../SelectField";

export default function PreviewStep({ file, form, updateField }) {
  return (
    <>
      <CompactFilePreview file={file} />

      <SharedField label="نوع المستند">
        <SelectField
          value={form.type}
          onChange={(value) => updateField("type", value)}
          compactValue="عقد"
        />
      </SharedField>
      {form.parent_id && (
        <SharedField label="المستند الأصلي">
          <div
            value={form.parent_id}
            className="h-[57px] w-full appearance-none rounded-[10px] border border-[#c9c6d1] bg-[#f8f8f9] px-12 py-3 text-right text-[15px] font-medium text-[#303541] outline-none transition focus:border-[#344474] focus:bg-white focus:ring-4 focus:ring-[#344474]/10"
          >
            {form.parent_id}
          </div>
        </SharedField>
      )}
    </>
  );
}
