import { useState } from "react";
// import icon7 from "./icon-7.svg";
// import vector5 from "./vector-5.svg";

export const AuthenticationPreferencesSection = () => {
  const [loginNotifications, setLoginNotifications] = useState(true);
  const [securityAlerts, setSecurityAlerts] = useState(true);
  const [sessionDuration, setSessionDuration] = useState("ساعتان");
  const [otpValue, setOtpValue] = useState("");

  const sessionOptions = [
    "ساعة",
    "ساعتان",
    "3 ساعات",
    "6 ساعات",
    "12 ساعة",
    "24 ساعة",
  ];

  const notificationItems = [
    {
      id: "loginNotifications",
      label: "إشعارات الدخول",
      description: "تنبيه عند تسجيل دخول جديد",
      state: loginNotifications,
      setState: setLoginNotifications,
    },
    {
      id: "securityAlerts",
      label: "تنبيهات أمنية",
      description: "تنبيهات النشاط غير المعتاد",
      state: securityAlerts,
      setState: setSecurityAlerts,
    },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 w-full">
      {/* 2FA Card */}
      <div className="flex flex-col gap-4 p-4 sm:p-6 bg-white rounded-xl border border-[#c2c6d81a] shadow-[0px_12px_32px_#191c1d0a]">
        <div className="flex items-center justify-between w-full">
          <span className="bg-[#0050cb1a] text-[#0050cb] text-xs px-2 py-1 rounded-lg">
            الحالة: مفعل
          </span>

          <h3 className="text-sm font-bold text-[#424656] text-right [direction:rtl]">
            2FA (متقدم)
          </h3>
        </div>

        <div className="flex flex-col gap-2 w-full">
          <label className="text-xs text-[#424656] text-right [direction:rtl]">
            رمز التحقق (OTP)
          </label>

          <input
            type="text"
            maxLength={6}
            value={otpValue}
            onChange={(e) => setOtpValue(e.target.value.replace(/\D/g, ""))}
            placeholder="أدخل رمز الـ 6 أرقام"
            className="w-full bg-[#f3f4f5] rounded-lg px-4 py-3 text-center tracking-[6px] text-sm outline-none"
          />
        </div>

        <button className="flex items-center justify-center gap-2 w-full border-2 border-[#0050cb33] text-[#0050cb] text-xs font-bold py-2.5 rounded-lg hover:bg-[#0050cb0a] transition">
          ربط تطبيق المصادقة
          {/* <img src={icon7} className="w-3 h-3" /> */}
        </button>
      </div>

      {/* Notifications Card */}
      <div className="flex flex-col gap-4 p-4 sm:p-6 bg-white rounded-xl border border-[#c2c6d81a] shadow-[0px_12px_32px_#191c1d0a]">
        <h3 className="text-sm font-bold text-[#424656] text-right [direction:rtl]">
          الإشعارات
        </h3>

        {notificationItems.map((item) => (
          <div key={item.id} className="flex items-center justify-between">
            {/* Switch */}
            <button
              onClick={() => item.setState(!item.state)}
              className={`w-10 h-5 rounded-full relative transition ${
                item.state ? "bg-[#0050cb]" : "bg-gray-300"
              }`}
            >
              <span
                className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition ${
                  item.state ? "right-5" : "right-1"
                }`}
              />
            </button>

            {/* Text */}
            <div className="text-right [direction:rtl]">
              <p className="text-sm text-[#191c1d]">{item.label}</p>
              <p className="text-xs text-[#424656]">{item.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Session Control Card */}
      <div className="flex flex-col gap-4 p-4 sm:p-6 bg-white rounded-xl border border-[#c2c6d81a] shadow-[0px_12px_32px_#191c1d0a]">
        <h3 className="text-sm font-bold text-[#424656] text-right [direction:rtl]">
          التحكم بالجلسة
        </h3>

        <div className="flex flex-col gap-2 text-right [direction:rtl]">
          <label className="text-xs text-[#424656]">انتهاء الجلسة</label>
          <p className="text-xs text-[#424656]">
            تحديد مدة الجلسة عند عدم النشاط
          </p>
        </div>

        <div className="flex items-center justify-between bg-[#f3f4f5] rounded-lg px-3 py-2">
          {/* <img src={vector5} className="w-4 h-4" /> */}

          <select
            value={sessionDuration}
            onChange={(e) => setSessionDuration(e.target.value)}
            className="bg-transparent text-sm outline-none text-right [direction:rtl]"
          >
            {sessionOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};
