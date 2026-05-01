import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function StepNavigation({
  onNext,
  onBack,
  disableNext = false,
}) {
  return (
    <div className="flex justify-end gap-[18px] px-[25px] pt-[10px] pb-[18px]">
      {onBack && (
        <button onClick={onBack} className="text-gray-500 gap-[6px]">
          <ArrowForwardIcon />
          السابق
        </button>
      )}

      {onNext && (
        <button
          disabled={disableNext}
          onClick={onNext}
          className="bg-[#2D3E61] text-white gap-[6px] px-3 py-[10px] rounded-lg disabled:opacity-50"
        >
          التالي
          <ArrowBackIcon />
        </button>
      )}
    </div>
  );
}
