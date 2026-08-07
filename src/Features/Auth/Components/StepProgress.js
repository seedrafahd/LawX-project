import { BadgePlus, Fingerprint } from "lucide-react";

export default function StepProgress({ currentStep = 1 }) {
  const isStep1Active = currentStep === 1;
  const isStep2Active = currentStep === 2;
  const progressWidth = isStep1Active ? "w-1/2" : "w-full";

  return (
    <div className="w-full">
      <div className="relative flex items-start justify-between">
        <div className="absolute top-[16px] left-0 right-0 h-[2px] bg-[#D6D8DE]" />

        <div
          className={`absolute top-[16px] right-0 ${progressWidth} h-[2px] bg-[#344A84]`}
        />

        <div className="relative z-10 flex flex-col items-center">
          <div
            className={`w-8 h-8 rounded-xl flex items-center justify-center shadow-lg ${
              isStep1Active
                ? "bg-variable-collection-primary-color"
                : "bg-[#EEF2F8] border border-[#D7DEE8]"
            }`}
          >
            <Fingerprint
              size={14}
              strokeWidth={2.2}
              className={isStep1Active ? "text-white" : "text-[#7E8696]"}
            />
          </div>

          <span
            className={`mt-2 text-sm font-bold ${
              isStep1Active
                ? "text-variable-collection-primary-color"
                : "text-[#666D78]"
            }`}
          >
            التحقق من الهوية
          </span>
        </div>

        <div className="relative z-10 flex flex-col items-center">
          <div
            className={`w-8 h-8 rounded-xl flex items-center justify-center ${
              isStep2Active
                ? "bg-variable-collection-primary-color shadow-lg"
                : "bg-[#EEF2F8] border border-[#D7DEE8]"
            }`}
          >
            <BadgePlus
              size={14}
              strokeWidth={2}
              className={isStep2Active ? "text-white" : "text-[#7E8696]"}
            />
          </div>

          <span
            className={`mt-2 text-sm font-medium ${
              isStep2Active
                ? "text-variable-collection-primary-color"
                : "text-[#666D78]"
            }`}
          >
            إنشاء الحساب
          </span>
        </div>
      </div>
    </div>
  );
}
