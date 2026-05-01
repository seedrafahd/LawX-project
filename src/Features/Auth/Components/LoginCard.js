import { useNavigate } from "react-router-dom";
import { loginRequest } from "../Services/AuthApi";
import { useState } from "react";
import { Typography } from "@mui/material";
import Cookies from "universal-cookie";
import { useDispatch } from "react-redux";
import { setError, setLoading, setUserDetails } from "../AuthSlice";
import { useAuth } from "../Hooks/useAuth";
import icon_login from "../../../App/Assets/Icon_login.png";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import HttpsOutlinedIcon from "@mui/icons-material/HttpsOutlined";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";

export default function LoginForm() {
  const navigate = useNavigate();
  const cookies = new Cookies();
  const dispatch = useDispatch();
  const { error } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));
    try {
      const data = await loginRequest({ email, password });
      if (data.token) {
        dispatch(setUserDetails(data));
        if (rememberMe) {
          cookies.set("auth", data);
        } else {
          sessionStorage.setItem("auth", JSON.stringify(data));
        }
        navigate("/dashboard");
      } else {
        sessionStorage.setItem("temp_auth", JSON.stringify(data));
        sessionStorage.setItem(
          "temp_data",
          JSON.stringify({ email, password }),
        );
        navigate("/login/verify2fa");
      }
    } catch (err) {
      console.log(err.message);
      dispatch(setError(err.message));
      setTimeout(() => {
        dispatch(setError(null));
      }, 5000);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="
    w-full max-w-md
    mx-auto
    flex flex-col
    p-6 sm:p-8 md:p-10
    bg-white/80 backdrop-blur-md
    rounded-3xl
    border border-[#c2c6d826]
    shadow-sm
  "
    >
      {/* HEADER */}
      <div className="flex flex-col items-center gap-4 pb-8">
        {/* Icon */}
        <div className=" p-3 flex items-center justify-center bg-[#f3f4f5] rounded-full">
          <img alt="Icon" src={icon_login} className="w-6 h-6" />
        </div>

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl font-bold text-center ">
          تسجيل الدخول
        </h1>

        {/* Subtitle */}
        <p className="text-xs sm:text-sm text-center text-[#424656]">
          بيئة قانونية مشفرة وآمنة بالكامل
        </p>
      </div>

      {/* FORM */}
      <div className="flex flex-col gap-6">
        {/* EMAIL */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-right ">
            البريد الإلكتروني
          </label>

          <div className="relative">
            <input
              className="w-full px-4 py-3 sm:py-4 rounded-2xl border shadow-sm text-right"
              placeholder="admin@intelligentjurist.legal"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              dir="ltr"
            />
            <AlternateEmailIcon
              sx={{ color: "#868686" }}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-5"
            />
          </div>
        </div>

        {/* PASSWORD */}
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <label className="text-xs font-bold ">كلمة المرور</label>
            <button
              type="button"
              className="text-xs text-blue-600"
              onClick={() => navigate("/login/forget-password")}
            >
              نسيت كلمة المرور؟
            </button>
          </div>

          <div className="relative ">
            <input
              className="w-full px-4 py-3 sm:py-4 rounded-2xl border shadow-sm text-right"
              placeholder="••••••••••••"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <HttpsOutlinedIcon
              sx={{ color: "#868686" }}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-4"
            />
          </div>
        </div>

        {/* REMEMBER */}
        <div className="flex items-center justify-between gap-2">
          <label className="text-sm flex items-center gap-2">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4"
            />
            تذكرني على هذا الجهاز
          </label>
        </div>

        {/* BUTTON */}
        <button
          type="submit"
          className="w-full h-12 sm:h-14 flex items-center justify-center rounded-2xl bg-gradient-to-r from-[#344474] to-[#59699a] gap-2"
        >
          <span className="text-white font-bold text-base sm:text-lg">
            تسجيل الدخول
          </span>
          <LoginOutlinedIcon sx={{ color: "white" }} />
        </button>

        {error && (
          <Typography variant="body1" color="error">
            {error}
          </Typography>
        )}
      </div>

      {/* FOOTER */}
      <div className="pt-8 flex justify-center">
        <div className="flex flex-wrap justify-center gap-2">
          <div className="px-3 py-1 bg-blue-100 rounded-full text-[10px]">
            نظام معتمد
          </div>
          <div className="px-3 py-1 bg-gray-100 rounded-full text-[10px]">
            تشفير 256-BIT
          </div>
        </div>
      </div>
    </form>
  );
}
