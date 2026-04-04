import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleSubmit = () => {
    console.log("Send reset link to:", email);
    // 👉 هون API
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      {/*  Card */}
      <div className="w-[400px] rounded-2xl bg-white/70 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.08)] p-8">
        {/* Icon */}
        <div className="text-center mb-6">
          <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-gray-200 flex items-center justify-center text-lg">
            🔑
          </div>

          <h2 className="text-[20px] font-bold text-gray-800">
            نسيت كلمة المرور؟
          </h2>

          <p className="text-gray-500 text-sm mt-1">
            أدخل بريدك الإلكتروني وسنرسل لك رابط لإعادة تعيين كلمة المرور
          </p>
        </div>

        {/* Email */}
        <div className="mb-5">
          <label className="block text-sm text-gray-600 mb-1">
            البريد الإلكتروني
          </label>

          <div className="bg-white border border-gray-200 rounded-xl px-4 py-3 shadow-sm focus-within:border-[#3f4b7f]">
            <input
              type="email"
              placeholder="example@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent outline-none text-sm"
            />
          </div>
        </div>

        {/* 🚀 Button */}
        <button
          onClick={handleSubmit}
          className="w-full bg-[#3f4b7f] hover:bg-[#2f3a66] text-white py-3 rounded-xl transition shadow-md"
        >
          إرسال رابط إعادة التعيين →
        </button>

        {/* Back */}
        <div className="text-center mt-5 text-sm text-gray-500">
          تذكرت كلمة المرور؟{" "}
          <button
            className="text-blue-500 hover:underline"
            onClick={() => navigate("/login")}
          >
            تسجيل الدخول
          </button>
        </div>
      </div>
    </div>
  );
}
