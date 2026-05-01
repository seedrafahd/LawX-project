export default function Stepper({ currentStep }) {
  const steps = ["العميل", "التفاصيل", "سير العمل", "الدفع", "التعيين"];

  return (
    <div className="flex items-center justify-between rounded-xl">
      {steps.map((step, i) => (
        <div key={i} className="flex-1 flex items-center min-w-[120px]">
          <div className="flex flex-col items-center gap-2">
            <div
              className={`w-10 h-10 flex items-center justify-center rounded-full border-[3px] border-[#CAC4D0] ${
                i + 1 === currentStep || i + 1 < currentStep
                  ? "bg-[#2D3E61] text-white "
                  : "bg-white text-gray-500"
              }`}
            >
              {i + 1}
            </div>
            <span
              className={`text-xl font-bold ${
                i + 1 === currentStep || i + 1 < currentStep
                  ? "text-[#2D3E61] "
                  : "text-gray-500"
              }`}
            >
              {step}
            </span>
          </div>

          {/* Line */}
          {i !== steps.length && (
            <div className="h-[1px] bg-gray-300 flex-1"></div>
          )}
        </div>
      ))}
    </div>
  );
}
