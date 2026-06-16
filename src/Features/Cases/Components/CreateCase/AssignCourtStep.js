import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import StepNavigation from "./StepNavigation";
import StepHeader from "./StepHeader";
import SharedField from "../../../../shared/components/SharedFeild";

export default function AssignCourtStep({
  formData,
  setFormData,
  errors,
  onBack,
}) {
  return (
    <div className="w-full max-w-3xl mx-auto bg-white rounded-2xl">
      {/* Header */}
      <StepHeader icon={<PersonSearchIcon />} title="تعيين المحكمة " />
      <div className="px-4 pt-[10px] pb[18px] space-y-[14px]">
        <SharedField label="اسم المحكمة" error={errors.court}>
          <input
            type="text"
            value={formData.court}
            onChange={(e) => setFormData("court", e.target.value)}
            className="h-12 w-full rounded-lg border border-gray-300 bg-gray-50 px-4 pl-11 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-[#40558C]"
            placeholder="مثلاً محكمة العدل دمشق حي الأمويين"
          />
        </SharedField>
      </div>

      <StepNavigation onBack={onBack} disableNext={true} />
    </div>
  );
}
