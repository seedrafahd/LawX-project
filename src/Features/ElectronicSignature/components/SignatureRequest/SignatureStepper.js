import { Check } from "lucide-react";

const steps = ["اختيار المستند", "إضافة الموقّعين", "تحديد أماكن التوقيع"];

export default function SignatureStepper({ currentStep }) {
  return (
    <div className="mb-8 flex items-center justify-between">
      {steps.map((step, index) => {
        const active = currentStep === index + 1;
        const completed = currentStep > index + 1;

        return (
          <div key={step} className="flex flex-1 items-center">
            <div className="flex flex-col items-center">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition
                  ${
                    completed
                      ? "border-green-600 bg-green-600 text-white"
                      : active
                        ? "border-blue-600 bg-blue-600 text-white"
                        : "border-gray-300 bg-white"
                  }`}
              >
                {completed ? <Check size={18} /> : index + 1}
              </div>

              <span
                className={`mt-2 text-sm ${
                  active ? "font-semibold text-blue-600" : "text-gray-500"
                }`}
              >
                {step}
              </span>
            </div>

            {index !== steps.length - 1 && (
              <div
                className={`mx-3 h-1 flex-1 rounded ${
                  completed ? "bg-green-600" : "bg-gray-300"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
