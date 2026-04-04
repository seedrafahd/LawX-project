import React, { useState } from "react";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = () => {
    if (!password || !confirmPassword) {
      alert("يرجى ملء جميع الحقول");
      return;
    }

    if (password !== confirmPassword) {
      alert("كلمات المرور غير متطابقة");
      return;
    }

    console.log("New Password:", password);
    // 👉 هون API reset password
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      {/* Card */}
      <div className="rounded-2xl bg-white/70 backdrop-blur-2xl shadow-[0_30px_80px_rgba(0,0,0,0.08)] p-8">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-gray-200 flex items-center justify-center text-lg">
            🔑
          </div>

          <h2 className="text-[20px] font-bold text-gray-800">
            إعادة تعيين كلمة المرور
          </h2>

          <p className="text-gray-500 text-sm mt-1">
            أدخل كلمة مرور جديدة لحسابك
          </p>
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
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full bg-transparent outline-none text-sm"
            />
          </div>
        </div>

        {/* 🚀 Button */}
        <button
          onClick={handleSubmit}
          className="w-full bg-[#3f4b7f] hover:bg-[#2f3a66] text-white py-3 rounded-xl transition shadow-md"
        >
          حفظ كلمة المرور →
        </button>

        {/* 🔙 Back */}
        <div className="text-center mt-5 text-sm text-gray-500">
          رجوع إلى{" "}
          <button className="text-blue-500 hover:underline">
            تسجيل الدخول
          </button>
        </div>
      </div>
    </div>
  );
}
