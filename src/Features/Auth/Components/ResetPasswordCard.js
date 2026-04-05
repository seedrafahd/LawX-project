import React, { useState } from "react";
import { resetPasswordRequest } from "../Services/AuthApi";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setError, setLoading } from "../AuthSlice";
import { useAuth } from "../Hooks/useAuth";
import { Typography } from "@mui/material";

export default function ResetPasswordPage() {
  const { email } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error } = useAuth();
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setConfirmPassword] = useState("");

  const handleSubmit = async () => {
    if (!password || !password_confirmation) {
      alert("يرجى ملء جميع الحقول");
      return;
    }

    if (password !== password_confirmation) {
      alert("كلمات المرور غير متطابقة");
      return;
    }
    dispatch(setLoading(true));
    const reset_password = JSON.parse(sessionStorage.getItem("reset_data"));
    try {
      const data = await resetPasswordRequest({
        email: email,
        code,
        password,
        password_confirmation,
        token: reset_password["reset-token"],
      });
      console.log(data);
      sessionStorage.removeItem("reset_data");

      navigate("/login");
    } catch (err) {
      console.log(err.response.data.errors);
      dispatch(setError(err.response.data.errors.code[0]));
      setTimeout(() => {
        dispatch(setError(null));
      }, 5000);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      {/* Card */}
      <div className="w-[400px] rounded-2xl bg-white/70 backdrop-blur-2xl shadow-[0_30px_80px_rgba(0,0,0,0.08)] p-8">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-gray-200 flex items-center justify-center text-lg">
            🔑
          </div>

          <h2 className="text-[20px] font-bold text-gray-800">
            إعادة تعيين كلمة المرور
          </h2>

          <p className="text-gray-500 text-sm mt-1">
            أدخل رمز التحقق وأدخل كلمة مرور جديدة لحسابك
          </p>
        </div>

        {/* Code */}
        <div className="mb-4">
          <label className="block text-sm text-gray-600 mb-1">رمز التحقق</label>

          <div className="bg-white border border-gray-200 rounded-xl px-4 py-3 shadow-sm focus-within:border-[#3f4b7f]">
            <input
              type="password"
              placeholder="********"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full bg-transparent outline-none text-sm"
            />
          </div>
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block text-sm text-gray-600 mb-1">
            كلمة المرور الجديدة
          </label>

          <div className="bg-white border border-gray-200 rounded-xl px-4 py-3 shadow-sm focus-within:border-[#3f4b7f]">
            <input
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-transparent outline-none text-sm"
            />
          </div>
        </div>

        {/* Confirm Password */}
        <div className="mb-5">
          <label className="block text-sm text-gray-600 mb-1">
            تأكيد كلمة المرور
          </label>

          <div className="bg-white border border-gray-200 rounded-xl px-4 py-3 shadow-sm focus-within:border-[#3f4b7f]">
            <input
              type="password"
              placeholder="********"
              value={password_confirmation}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full bg-transparent outline-none text-sm"
            />
          </div>
        </div>

        {/*  Button */}
        <button
          onClick={handleSubmit}
          className="w-full bg-[#3f4b7f] hover:bg-[#2f3a66] text-white py-3 rounded-xl transition shadow-md"
        >
          حفظ كلمة المرور →
        </button>
        {error && (
          <Typography variant="body1" color="error">
            {error}
          </Typography>
        )}

        {/*  Back */}
        {/* <div className="text-center mt-5 text-sm text-gray-500">
          رجوع إلى{" "}
          <button className="text-blue-500 hover:underline">
            تسجيل الدخول
          </button>
        </div> */}
      </div>
    </div>
  );
}
