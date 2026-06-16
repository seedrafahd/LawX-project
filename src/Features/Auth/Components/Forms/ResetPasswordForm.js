import { useState } from "react";
import { Typography } from "@mui/material";
import { KeyRound } from "lucide-react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { setLoading } from "../../AuthSlice";
import { useAuth } from "../../hooks/useAuth";
import { useAuthError } from "../../hooks/useAuthError";
import { resetPasswordRequest } from "../../services/AuthApi";
import AuthButton from "../AuthButton";
import AuthFormCard from "../AuthFormCard";
import AuthInput from "../AuthInput";

export default function ResetPasswordForm() {
  const { email } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const showError = useAuthError();
  const { error } = useAuth();
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const isSubmitDisabled =
    !code.trim() || !password.trim() || !passwordConfirmation.trim();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitDisabled) return;

    if (password !== passwordConfirmation) {
      showError("كلمات المرور غير متطابقة");
      return;
    }

    dispatch(setLoading(true));
    const resetPasswordData = JSON.parse(sessionStorage.getItem("reset_data"));

    try {
      await resetPasswordRequest({
        email,
        code: code.trim(),
        password,
        password_confirmation: passwordConfirmation,
        token: resetPasswordData["reset-token"],
      });

      sessionStorage.removeItem("reset_data");
      navigate("/login");
    } catch (err) {
      console.log(err.message);
      showError(err.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <AuthFormCard
      onSubmit={handleSubmit}
      icon={<KeyRound className="h-6 w-6" />}
      title="إعادة تعيين كلمة المرور"
      subtitle="أدخل رمز التحقق وأدخل كلمة مرور جديدة لحسابك"
    >
      <AuthInput
        label="رمز التحقق"
        placeholder="********"
        type="password"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />

      <AuthInput
        label="كلمة المرور الجديدة"
        placeholder="********"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <AuthInput
        label="تأكيد كلمة المرور"
        placeholder="********"
        type="password"
        value={passwordConfirmation}
        onChange={(e) => setPasswordConfirmation(e.target.value)}
      />

      <AuthButton disabled={isSubmitDisabled} type="submit">
        حفظ كلمة المرور →
      </AuthButton>

      {error && (
        <Typography variant="body1" color="error">
          {error}
        </Typography>
      )}
    </AuthFormCard>
  );
}
