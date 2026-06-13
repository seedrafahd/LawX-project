import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { forgetPasswordRequest } from "../../Services/AuthApi";
import { useDispatch } from "react-redux";
import { setError, setLoading } from "../../AuthSlice";
import { useAuth } from "../../Hooks/useAuth";
import { Typography } from "@mui/material";
import AuthButton from "../AuthButton";
import AuthFormCard from "../AuthFormCard";
import AuthInput from "../AuthInput";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import { KeyRound } from "lucide-react";

export default function ForgotPasswordForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error } = useAuth();
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));
    try {
      const data = await forgetPasswordRequest({ email });

      sessionStorage.setItem("reset_data", JSON.stringify(data));

      navigate(`/login/reset-password/${email}`);
    } catch (err) {
      console.log(err.message);
      dispatch(
        setError(
          err.message,
        ),
      );
      setTimeout(() => {
        dispatch(setError(null));
      }, 5000);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <AuthFormCard
      onSubmit={handleSubmit}
      icon={<KeyRound />}
      title="نسيت كلمة المرور؟"
      subtitle="أدخل بريدك الإلكتروني وسنرسل لك رمز تحقق لإعادة تعيين كلمة المرور"
    >
      <AuthInput
        label="البريد الإلكتروني"
        placeholder="example@email.com"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        icon={<AlternateEmailIcon sx={{ color: "#868686" }} />}
      />

      <AuthButton type="submit">إرسال رمز إعادة التعيين →</AuthButton>

      {error && (
        <Typography variant="body1" color="error">
          {error}
        </Typography>
      )}

      <div className="text-center mt-5 text-sm text-gray-500">
        تذكرت كلمة المرور؟{" "}
        <AuthButton
          type="button"
          variant="text"
          onClick={() => navigate("/login")}
        >
          تسجيل الدخول
        </AuthButton>
      </div>
    </AuthFormCard>
  );
}
