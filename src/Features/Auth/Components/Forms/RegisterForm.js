import { useState } from "react";
import { Typography } from "@mui/material";
import { ArrowLeft, Lock, Mail, ShieldCheck, UserRound } from "lucide-react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLoading } from "../../AuthSlice";
import { useAuth } from "../../hooks/useAuth";
import { useAuthError } from "../../hooks/useAuthError";
import AuthButton from "../AuthButton";
import AuthInput from "../AuthInput";
import StepProgress from "../StepProgress";
import { registerRequest } from "../../services/AuthApi";
import { validateRegisterForm } from "../../helpers/validation";
import toast from "react-hot-toast";

export default function RegisterForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const showError = useAuthError();
  const { error } = useAuth();
  const profile_id = JSON.parse(sessionStorage.getItem("profile_id"));

  const [form, setForm] = useState({
    lawyer_profile_id: profile_id || "019f66ce-7491-73c2-b677-add8f1c41377",
    email: "",
    password: "",
    password_confirmation: "",
    phone_number: "",
  });

  const isSubmitDisabled =
    !form.phone_number ||
    !form.email ||
    !form.password ||
    !form.password_confirmation ||
    form.password !== form.password_confirmation;

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitDisabled) return;

    const validationErrors = validateRegisterForm({ form });

    if (Object.keys(validationErrors).length) {
      showError(validationErrors.password || validationErrors.phone_number);
      return;
    }

    dispatch(setLoading(true));
    try {
      if (form.password !== form.password_confirmation) {
        throw new Error("كلمتا المرور غير متطابقتين");
      }

      await registerRequest(form);

      toast.success("تم إنشاء الحساب  بنجاح");
      navigate("/login");
    } catch (err) {
      showError(err.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-2xl mx-auto flex flex-col p-6 sm:p-8 md:p-10 bg-white/80 backdrop-blur-md text-variable-collection-primary-color rounded-3xl border border-[#c2c6d826] shadow-sm gap-8"
    >
      <div className="pb-4">
        <StepProgress currentStep={2} />
      </div>

      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900">إنشاء الحساب</h2>
        <p className="mt-2 text-gray-600 text-sm">
          ابدأ بإنشاء حسابك الآمن وابدأ العمل داخل المنصة بسهولة.
        </p>
      </div>

      <div className="rounded-lg border border-[#D9DEE8] bg-white shadow-sm p-6 md:p-8 space-y-6 md:space-y-8">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 p-2 rounded-lg bg-[#EAF1F8] flex items-center justify-center">
            <ShieldCheck className="text-[#5F6E7E]" size={18} />
          </div>

          <h2 className="text-xl font-semibold text-gray-900">بيانات الحساب</h2>
        </div>

        <div className="space-y-6">
          <AuthInput
            label="البريد الإلكتروني *"
            placeholder="example@email.com"
            type="email"
            value={form.email}
            onChange={handleChange("email")}
            icon={<Mail size={18} />}
          />

          <AuthInput
            label="كلمة المرور *"
            placeholder="••••••••"
            type="password"
            value={form.password}
            onChange={handleChange("password")}
            icon={<Lock size={18} />}
          />

          <AuthInput
            label="تأكيد كلمة المرور *"
            placeholder="••••••••"
            type="password"
            value={form.password_confirmation}
            onChange={handleChange("password_confirmation")}
            icon={<Lock size={18} />}
          />

          <AuthInput
            label="رقم الهاتف *"
            placeholder="مثال: أحمد محمد"
            type="number"
            value={form.phone_number}
            onChange={handleChange("phone_number")}
            icon={<UserRound size={18} />}
          />
        </div>

        <div className="mt-10">
          <AuthButton
            disabled={isSubmitDisabled}
            type="submit"
            variant="gradient"
            icon={
              <ArrowLeft
                size={22}
                className="transition-transform duration-200 group-hover:-translate-x-1"
              />
            }
          >
            <span className="text-base font-bold text-white sm:text-lg">
              إنشاء الحساب
            </span>
          </AuthButton>
        </div>
      </div>

      {error && (
        <Typography variant="body1" color="error">
          {error}
        </Typography>
      )}
    </form>
  );
}
