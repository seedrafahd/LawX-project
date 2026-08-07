import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import StepHeader from "./StepHeader";
import { useMemo } from "react";
import { useAuth } from "../../../Auth/hooks/useAuth";
import { useMembers } from "../../../OfficeManagement/hooks/useMembers";

export default function AssignLawyerStep({
  formData,
  setFormData,
  errors,
  onBack,
}) {
  const { user } = useAuth();
  const { data } = useMembers();
  const members = useMemo(() => data?.data ?? [], [data]);

  const candidates = useMemo(() => {
    const memberItems = (members || [])
      .filter((m) => m.id !== user.ID)
      .map((m) => ({
        id: m.id,
        full_name: m.full_name || m.lawyer_name || m.name,
        subtitle: m.role || m.specialty,
      }));

    return [
      {
        id: user.ID,
        full_name: user.full_name,
        subtitle: user.role,
      },
      ...memberItems,
    ];
  }, [members, user]);

  return (
    <div className="w-full bg-white rounded-2xl pb-6">
      {/* Header */}
      <StepHeader icon={<PersonSearchIcon />} title="تعيين المحامي المسؤول" />

      <div className="px-4 pt-[10px] pb[18px] space-y-[14px]">
        {candidates.map((person) => {
          const isSelected = formData.lead_lawyer_id === person.id;
          return (
            <div
              key={person.id}
              onClick={() => {
                setFormData("lead_lawyer_id", person.id);
                setFormData("lead_lawyer_name", person.full_name);
              }}
              className={`flex items-center justify-between border rounded-xl px-4 py-[10px] cursor-pointer transition
        ${
          isSelected
            ? "border-variable-collection-primary-color bg-variable-collection-primary-color/10"
            : "border-gray-300"
        }
      `}
            >
              {/* Right Side */}
              <div className="flex items-center gap-[18px]">
                <div className="w-12 h-12 rounded-full bg-variable-collection-primary-color text-white flex items-center justify-center  font-bold text-sm">
                  {person.full_name?.charAt(0) || "?"}
                </div>
                <div className="leading-tight">
                  <p className="font-bold text-gray-900">{person.full_name}</p>
                  <p className="text-sm text-gray-500">{person.subtitle}</p>
                </div>
              </div>

              {/* Left Side */}
              {isSelected && (
                <span className="text-sm text-variable-collection-primary-color font-medium">
                  تم الاختيار
                </span>
              )}
            </div>
          );
        })}
        {errors && (
          <span className="text-variable-collection-error-color text-xs">
            {errors.lead_lawyer_id}
          </span>
        )}
      </div>
    </div>
  );
}
