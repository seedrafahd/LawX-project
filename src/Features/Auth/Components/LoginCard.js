import { useNavigate } from "react-router-dom";
import { loginRequest } from "../Services/AuthApi";
import { useState } from "react";
import { Alert, Typography } from "@mui/material";
import Cookies from "universal-cookie";
import { useDispatch } from "react-redux";
import { setLoading, setUserDetails } from "../AuthSlice";

export default function LoginForm() {
  const navigate = useNavigate();
  const cookies = new Cookies();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));
    try {
      const data = await loginRequest({ email, password });
      dispatch(setUserDetails(data));
      if (rememberMe) {
        cookies.set("auth", data);
      } else {
        sessionStorage.setItem("auth", JSON.stringify(data));
      }
      // sessionStorage.setItem("temp_token", data.temp_token);
      navigate("/dashboard");
    } catch (err) {
      setError("بيانات غير صحيحة");
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      {/* Login Card */}
      <div className=" w-[400px] rounded-2xl bg-white/70 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.08)] p-8">
        {/* Header */}
        <div className="text-center pb-6 w-[318px]">
          <div className="w-14 h-12 mx-auto pb-3 pt-3 rounded-full bg-gray-200 flex items-center justify-center">
            🛡️
          </div>
          <h1 className="text-xl font-bold text-gray-800 h-6 mt-7">
            دخول المشرف الرئيسي
          </h1>
          <p className="text-gray-500 text-sm">
            بيئة قانونية مشفرة وآمنة بالكامل
          </p>
        </div>

        {/* form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-7 pb-4">
          {/* Email */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-black block text-right pl-1 pr-1">
              البريد الإلكتروني
            </label>
            <div className="flex items-center bg-white border border-gray-100 rounded-xl px-4 py-3 shadow-sm">
              <input
                required
                type="email"
                placeholder="admin@intelligentjurist.legal"
                className="w-full bg-white outline-none text-sm text-gray-500"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {/* Password */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between text-xs font-bold text-black px-1">
              <span>كلمة المرور</span>
              <button
                className="text-[#3f4b7f] text-xs"
                onClick={() => navigate("/login/forget-password")}
              >
                نسيت كلمة المرور؟
              </button>
            </div>
            <div className="flex items-center bg-white border border-gray-100 rounded-xl px-4 py-3 shadow-sm">
              <input
                required
                type="password"
                placeholder="••••••••••••"
                className="w-full bg-white outline-none text-sm"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {/* Remember */}
          <div className="flex items-center justify-between text-sm text-gray-700 gap-3 pr-1">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                className="text-gray-300"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              تذكرني على هذا الجهاز
            </label>
          </div>

          {/* Button */}

          <button
            type="submit"
            className="w-full bg-[#3f4b7f] hover:bg-[#2f3a66] text-white py-3 rounded-xl transition"
          >
            تسجيل الدخول →
          </button>
        </form>
        {error && (
          <Typography variant="body1" color="error">
            {error}
          </Typography>
        )}

        {/* Badges */}
        <div className="flex justify-center gap-4 text-xs pt-8">
          <span className="bg-[#D6E3FB] text-blue-600 px-4 py-1 rounded-full">
            نظام معتمد
          </span>
          <span className="bg-[#E1E3E4] px-4 py-1 rounded-full text-gray-600">
            BIT-256 تشفير
          </span>
        </div>
      </div>
    </div>
  );
}
