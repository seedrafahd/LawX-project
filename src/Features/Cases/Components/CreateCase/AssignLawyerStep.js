import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import StepHeader from "./StepHeader";
import { useSelector } from "react-redux";
import Cookies from "universal-cookie";

const cookies = new Cookies();
export default function AssignLawyerStep({
  formData,
  setFormData,
  errors,
  onBack,
}) {
  const reduxUser = useSelector((state) => state.auth?.user);
  const authCookie = cookies.get("auth");
  let sessionUser = null;
  try {
    sessionUser = JSON.parse(sessionStorage.getItem("auth"));
  } catch (e) {}
  const user = reduxUser || authCookie?.user || sessionUser?.user;

  const isSelected = formData.lead_lawyer_id === user.ID;
  return (
    <div className="w-full bg-white rounded-2xl pb-6">
      {/* Header */}
      <StepHeader icon={<PersonSearchIcon />} title="تعيين المحامي المسؤول" />

      <div className="px-4 pt-[10px] pb[18px] space-y-[14px]">
        <div
          key={user.ID}
          onClick={() => {
            setFormData("lead_lawyer_id", user.ID);
            setFormData("lead_lawyer_name", user.full_name);
          }}
          className={`flex items-center justify-between border rounded-xl px-4 py-[10px] cursor-pointer transition
        ${isSelected ? "border-variable-collection-primary-color bg-variable-collection-primary-color/10" : "border-gray-300"}
      `}
        >
          {/* Right Side */}
          <div className="flex items-center gap-[18px]">
            <div className="w-12 h-12 rounded-full bg-variable-collection-primary-color text-white flex items-center justify-center  font-bold text-sm">
              {user.full_name?.charAt(0) || "?"}
            </div>
            <div className="leading-tight">
              <p className="font-bold text-gray-900">{user.full_name}</p>
              <p className="text-sm text-gray-500">{user.role}</p>
            </div>
          </div>

          {/* Left Side */}
          {isSelected && (
            <span className="text-sm text-variable-collection-primary-color font-medium">
              تم الاختيار
            </span>
          )}
        </div>
        {errors && (
          <span className="text-variable-collection-error-color text-xs">
            {errors.lead_lawyer_id}
          </span>
        )}
      </div>
    </div>
  );
}
