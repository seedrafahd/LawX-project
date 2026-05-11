import SharedField from "../../../shared/Components/SharedFeild";
import FileHero from "./FileHero";
import SelectField from "./SelectField";

export default function PreviewStep({
  file,
  selectedType,
  updateSelectedType,
}) {
  return (
    <>
      <FileHero file={file} />

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
