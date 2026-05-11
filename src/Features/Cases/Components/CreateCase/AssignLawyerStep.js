import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import StepNavigation from "./StepNavigation";
import StepHeader from "./StepHeader";

export default function AssignLawyerStep({ formData, setFormData, onBack }) {
  const lawyers = [
    {
      id: 1,
      name: "سارة القاضي",
      role: "محامي أول",
      specialty: "متخصص عقارات",
      avatar: "https://i.pravatar.cc/100?img=32",
    },
    {
      id: 2,
      name: "محمد الأحمد",
      role: "محامي",
      specialty: "قضايا تجارية",
      avatar: "https://i.pravatar.cc/100?img=12",
    },
    {
      id: 3,
      name: "ليلى حسن",
      role: "محامية",
      specialty: "أحوال شخصية",
      avatar: "https://i.pravatar.cc/100?img=45",
    },
  ];

  return (
    <div className="w-full max-w-3xl mx-auto bg-white rounded-2xl">
      {/* Header */}
      <StepHeader icon={<PersonSearchIcon />} title="تعيين المحامي المسؤول" />
      <div className="px-4 pt-[10px] pb[18px] space-y-[14px]">
        {/* Selected Lawyer Card */}
        {lawyers.map((lawyer) => {
          const isSelected = formData.lawyer === lawyer.name;

          return (
            <div
              key={lawyer.id}
              onClick={() => setFormData({ ...formData, lawyer: lawyer.name })}
              className={`flex items-center justify-between border rounded-xl px-4 py-[10px] cursor-pointer transition
        ${isSelected ? "border-variable-collection-primary-color bg-variable-collection-primary-color/10" : "border-gray-300"}
      `}
            >
              {/* Right Side */}
              <div className="flex items-center gap-[18px]">
                <img
                  src={lawyer.avatar}
                  alt="avatar"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="leading-tight">
                  <p className="font-bold text-gray-900">{lawyer.name}</p>
                  <p className="text-sm text-gray-500">
                    {lawyer.role} • {lawyer.specialty}
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
                    setFormData({ ...formData, lawyer: lawyer.name });
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
    </div>
  );
}
