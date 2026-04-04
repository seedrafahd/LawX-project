import React, { useState } from "react";

export default function SettingsPage() {
  const [form, setForm] = useState({
    name: "أحمد محمد",
    email: "admin@lawx.com",
    notifications: true,
  });

  return (
    <div className="min-h-screen bg-[#f5f7fb] font-[Cairo] flex">
      {/* 🔹 Content */}
      <div className="flex-1 p-10">
        {/* 🧊 Card */}
        <div className="max-w-xl mx-auto bg-white/70 backdrop-blur-2xl shadow-[0_30px_80px_rgba(0,0,0,0.08)] rounded-2xl p-8">
          {/* Header */}
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-800">معلومات الحساب</h2>
            <p className="text-gray-500 text-sm">
              يمكنك تعديل بياناتك الشخصية من هنا
            </p>
          </div>

          {/* Name */}
          <div className="mb-4">
            <label className="text-sm text-gray-600 block mb-1">الاسم</label>
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#3f4b7f] outline-none bg-white"
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="text-sm text-gray-600 block mb-1">
              البريد الإلكتروني
            </label>
            <input
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#3f4b7f] outline-none bg-white"
            />
          </div>

          {/* Toggle */}
          <div className="flex items-center justify-between mb-6">
            <span className="text-sm text-gray-600">تفعيل الإشعارات</span>

            <button
              onClick={() =>
                setForm({
                  ...form,
                  notifications: !form.notifications,
                })
              }
              className={`w-12 h-6 flex items-center rounded-full p-1 transition ${
                form.notifications ? "bg-[#3f4b7f]" : "bg-gray-300"
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow transform transition ${
                  form.notifications ? "translate-x-6" : "translate-x-0"
                }`}
              />
            </button>
          </div>

          {/* Save Button */}
          <button className="w-full bg-[#3f4b7f] hover:bg-[#2f3a66] text-white py-3 rounded-xl shadow-md transition">
            حفظ التغييرات →
          </button>
        </div>
      </div>
    </div>
  );
}
