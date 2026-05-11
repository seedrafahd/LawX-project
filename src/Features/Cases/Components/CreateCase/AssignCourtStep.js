import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import StepNavigation from "./StepNavigation";
import StepHeader from "./StepHeader";
import FmdGoodIcon from "@mui/icons-material/FmdGood";

export default function AssignCourtStep({ formData, setFormData, onBack }) {
  const courts = [
    {
      id: 1,
      name: "محكمة العدل",
      city: "دمشق",
      country: "حي الأمويين",
    },
    {
      id: 2,
      name: "محكمة العدل",
      city: "دمشق",
      country: "حي الأمويين",
    },
    {
      id: 3,
      name: "محكمة العدل",
      city: "دمشق",
      country: "حي الأمويين",
    },
  ];

  return (
    <div className="w-full max-w-3xl mx-auto bg-white rounded-2xl">
      {/* Header */}
      <StepHeader icon={<PersonSearchIcon />} title="تعيين المحكمة " />
      <div className="px-4 pt-[10px] pb[18px] space-y-[14px]">
        {/* Selected Lawyer Card */}
        {courts.map((court) => {
          const isSelected = formData.court === court.name;

          return (
            <div
              key={court.id}
              onClick={() => setFormData({ ...formData, court: court.name })}
              className={`flex items-center justify-between border rounded-xl px-4 py-[10px] cursor-pointer transition
        ${isSelected ? "border-variable-collection-primary-color bg-variable-collection-primary-color/10" : "border-gray-300"}
      `}
            >
              {/* Right Side */}
              <div className="flex items-center gap-[18px]">
                <FmdGoodIcon />
                <div className="leading-tight">
                  <p className="font-bold text-gray-900">{court.name}</p>
                  <p className="text-sm text-gray-500">
                    {court.city} • {court.country}
                  </p>
                </div>
              </div>

              {/* Left Side */}
              {isSelected ? (
                <span className="text-sm text-variable-collection-primary-color font-medium">
                  تم الاختيار
                </span>
              ) : (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setFormData({ ...formData, court: court.name });
                  }}
                  className="px-2 py-1 border border-variable-collection-primary-color text-variable-collection-primary-color rounded-md text-sm hover:bg-variable-collection-primary-color/20 transition"
                >
                  اختيار
                </button>
              )}
            </div>
          );
        })}
      </div>

      <StepNavigation onBack={onBack} disableNext={true} />
    </div>
  );
}
