import { useState } from "react";
import FooterHelp from "../FooterHelp";
import StepProgress from "../StepProgress";
import VerifyCard from "../VerifyCard";
import { useDispatch } from "react-redux";
import { useAuthError } from "../../hooks/useAuthError";
import { useAuth } from "../../hooks/useAuth";
import { setLoading } from "../../AuthSlice";
import { useNavigate } from "react-router-dom";
import { verifyIdentityRequest } from "../../services/AuthApi";
import toast from "react-hot-toast";

export default function VerifyIdentityForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    national_id: "",
    full_name: "",
    father_name: "",
    mother_name: "",
    mother_family_name: "",
    birth_place: "",
    birth_date: "",
    civil_registry_number: "",
    syndicate_card_number: "",
    syndicate_branch: "",
    lawyer_state: "",
  });
  const isSubmitDisabled =
    !form.national_id.trim() || !form.syndicate_card_number.trim();
  const dispatch = useDispatch();
  const showError = useAuthError();
  const { error } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitDisabled) return;

    dispatch(setLoading(true));
    try {
      const data = await verifyIdentityRequest(form);
      console.log(data);
      toast.success("تم التحقق من هويتك بنجاح. يمكنك الآن إنشاء حسابك الخاص");
      sessionStorage.setItem("profile_id", JSON.stringify(data));
      navigate("/register");
    } catch (err) {
      console.log(err.message);
      showError(err.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-2xl mx-auto flex flex-col p-6 sm:p-8 md:p-10 bg-white/80 backdrop-blur-md text-variable-collection-primary-color
         rounded-3xl border border-[#c2c6d826] shadow-sm gap-8"
    >
      {/* Header */}
      <div className="pb-4">
        <StepProgress />
      </div>

      {/* Title */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900">تفعيل الحساب</h2>

        <p className="mt-2 text-gray-600 text-sm">
          أدخل بياناتك المسجلة للتحقق من هويتك في قاعدة بيانات النقابة.
        </p>
      </div>

      {/* Card */}
      <VerifyCard
        form={form}
        setForm={setForm}
        error={error}
        isSubmitDisabled={isSubmitDisabled}
      />

      {/* Footer */}
      <FooterHelp />
    </form>
  );
}
