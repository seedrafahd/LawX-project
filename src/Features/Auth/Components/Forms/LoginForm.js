import { useState } from "react";
import { Typography } from "@mui/material";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import HttpsOutlinedIcon from "@mui/icons-material/HttpsOutlined";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import { ShieldUser } from "lucide-react";
import Cookies from "universal-cookie";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLoading, setUserDetails } from "../../AuthSlice";
import { useAuth } from "../../hooks/useAuth";
import { useAuthError } from "../../hooks/useAuthError";
import { loginRequest } from "../../services/AuthApi";
import AuthButton from "../AuthButton";
import AuthCheckbox from "../AuthCheckbox";
import AuthFormCard from "../AuthFormCard";
import AuthInput from "../AuthInput";

export default function LoginForm() {
  const navigate = useNavigate();
  const cookies = new Cookies();
  const dispatch = useDispatch();
  const showError = useAuthError();
  const { error } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const isSubmitDisabled = !email.trim() || !password.trim();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitDisabled) return;

    dispatch(setLoading(true));
    try {
      const normalizedEmail = email.trim();
      const data = await loginRequest({ email: normalizedEmail, password });

      if (data.token) {
        dispatch(setUserDetails(data));
        if (rememberMe) {
          cookies.set("auth", data);
        } else {
          sessionStorage.setItem("auth", JSON.stringify(data));
        }
        navigate("/dashboard");
        return;
      }

      sessionStorage.setItem("temp_auth", JSON.stringify(data));
      sessionStorage.setItem(
        "temp_data",
        JSON.stringify({ email: normalizedEmail, password }),
      );
      navigate("/login/verify2fa");
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
      icon={<ShieldUser className="h-6 w-6" />}
      title="تسجيل الدخول"
      subtitle="بيئة قانونية مشفرة وآمنة بالكامل"
    >
      <AuthInput
        label="البريد الإلكتروني"
        placeholder="example@email.com"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        icon={<AlternateEmailIcon sx={{ color: "#868686" }} />}
      />

      <AuthInput
        label="كلمة المرور"
        placeholder="••••••••••••"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        icon={<HttpsOutlinedIcon sx={{ color: "#868686" }} />}
        action={
          <AuthButton
            type="button"
            variant="text"
            className="text-xs text-blue-600"
            onClick={() => navigate("/login/forget-password")}
          >
            نسيت كلمة المرور؟
          </AuthButton>
        }
      />

      <AuthCheckbox
        checked={rememberMe}
        onChange={(e) => setRememberMe(e.target.checked)}
      >
        تذكرني على هذا الجهاز
      </AuthCheckbox>

      <AuthButton
        disabled={isSubmitDisabled}
        type="submit"
        variant="gradient"
        icon={<LoginOutlinedIcon sx={{ color: "white" }} />}
      >
        <span className="text-base font-bold text-white sm:text-lg">
          تسجيل الدخول
        </span>
      </AuthButton>

      {error && (
        <Typography variant="body1" color="error">
          {error}
        </Typography>
      )}
    </AuthFormCard>
  );
}
