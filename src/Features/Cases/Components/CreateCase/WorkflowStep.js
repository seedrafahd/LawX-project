import StepHeader from "./StepHeader";
import StepNavigation from "./StepNavigation";
import AccountTreeIcon from "@mui/icons-material/AccountTree";

export default function WorkflowStep({
  formData,
  setFormData,
  onNext,
  onBack,
}) {
  const options = [
    {
      id: "stages",
      title: "القضايا العقارية القياسية",
      desc: "6 مراحل (دراسة, مطالبة’ مرافعة, حكم أول, استئناف, تنفيذ)",
    },
    {
      id: "custom",
      title: "تخصيص مراحل جديدة",
      desc: "إنشاء خطة عمل مخصصة لهذه القضية",
    },
  ];

  return (
    <div className="bg-white rounded-xl">
      {/* Header */}
      <StepHeader icon={<AccountTreeIcon />} title="سير العمل (المهام)" />

      {/* Cards */}
      <div className="space-y-4 px-[25px] pt-3 pb-[18px]">
        {options.map((opt) => {
          const selected = formData.workflow === opt.id;

          return (
            <div
              key={opt.id}
              onClick={() => setFormData({ ...formData, workflow: opt.id })}
              className={`cursor-pointer border-2 rounded-xl px-3 py-2 gap-[14px] flex items-center transition bg-variable-collection-primary-color/10 ${
                selected
                  ? "border-variable-collection-primary-color"
                  : "border-gray-300 hover:border-gray-400"
              }`}
            >
              {/* Radio */}
              <div className="flex items-center">
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    selected ? "border-[#2D3E61]" : "border-gray-400"
                  }`}
                >
                  {selected && (
                    <div className="w-2.5 h-2.5 bg-[#2D3E61] rounded-full"></div>
                  )}
                </div>
              </div>

              {/* Content */}
              <div>
                <h3 className="font-semibold text-variable-collection-GREY-textcolor">
                  {opt.title}
                </h3>
                <p className="text-sm text-variable-collection-GREY-textcolor mt-1">
                  {opt.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation */}
      <StepNavigation onNext={onNext} onBack={onBack} disableNext={false} />
    </div>
  );
}
