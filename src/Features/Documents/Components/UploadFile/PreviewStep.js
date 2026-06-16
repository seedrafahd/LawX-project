import SharedField from "../../../../shared/components/SharedFeild";
import CompactFilePreview from "../CompactFilePreview";
import SelectField from "../SelectField";

export default function PreviewStep({
  file,
  selectedType,
  updateSelectedType,
}) {
  return (
    <>
      <CompactFilePreview file={file} />

      <SharedField label="نوع المستند">
        <SelectField
          value={selectedType}
          onChange={updateSelectedType}
          compactValue="عقد"
        />
      </SharedField>
    </>
  );
}
