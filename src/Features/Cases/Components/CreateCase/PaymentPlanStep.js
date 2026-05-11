import { useState } from "react";
import StepNavigation from "./StepNavigation";
import PaymentsIcon from "@mui/icons-material/Payments";
import PercentIcon from "@mui/icons-material/Percent";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import LanIcon from "@mui/icons-material/Lan";
import StepHeader from "./StepHeader";

export default function PaymentPlanStep({
  formData,
  setFormData,
  onNext,
  onBack,
}) {
  const [active, setActive] = useState("");

  const options = [
    {
      id: "percentage",
      label: "النسبة",
      icon: <PercentIcon />,
    },
    {
      id: "monthly",
      label: "أقساط شهرية",
      icon: <CalendarTodayIcon />,
    },
    {
      id: "stages",
      label: "حسب المراحل",
      icon: <LanIcon />,
    },
  ];

  const handleClick = (option) => {
    console.log(option);
    setActive(option.id);
    setFormData({ ...formData, payment_plan: option.label });
  };
  return (
    <div className="w-full max-w-3xl mx-auto bg-white rounded-2xl">
      {/* Header */}
      <StepHeader icon={<PaymentsIcon />} title="خطة الدفع" />

      {/* Cards */}
      <div className="grid grid-cols-3 max-w-xl mx-auto gap-[10px] pt-[14px] pb-[22px]">
        {options.map((option) => {
          const isActive = active === option.id;

          return (
            <button
              key={option.id}
              onClick={() => handleClick(option)}
              className={`flex flex-col items-center justify-center sm:min-h-[80px] md:min-h-[100px] px-4 pt-[10px] pb-1
                 rounded-2xl border transition-all duration-200 shadow-[0_0_4px_rgba(0,0,0,0.15)]
                ${
                  isActive
                    ? "bg-variable-collection-primary-color/10 border-variable-collection-primary-color "
                    : "bg-white border-gray-200 hover:shadow-md"
                }
              `}
            >
              <div
                className={`${isActive ? "text-variable-collection-primary-color" : "text-gray-500"}`}
              >
                {option.icon}
              </div>
              <span className="text-lg font-bold ">{option.label}</span>
            </button>
          );
        })}
      </div>

      {/* Navigation */}
      <StepNavigation
        onNext={onNext}
        onBack={onBack}
        disableNext={!formData.payment_plan}
      />
    </div>
  );
}
