import { useState } from "react";
import { useChangePassword } from "../Hooks/useChangePassword";
import Loader from "../../../shared/Components/Loading";
import { Typography } from "@mui/material";
// import icon2 from "./icon-2.svg";
// import icon8 from "./icon-8.svg";
// import icon9 from "./icon-9.svg";
// import icon10 from "./icon-10.svg";
// import icon11 from "./icon-11.svg";
// import icon12 from "./icon-12.svg";
// import icon13 from "./icon-13.svg";
// import vector3 from "./vector-3.svg";

export const SecuritySettingsOverviewSection = () => {
  const { mutate, isPending, error } = useChangePassword();
  const [current_password, setCurrentPassword] = useState("");
  const [new_password, setNewPassword] = useState("");
  const [new_password_confirmation, setConfirmPassword] = useState("");
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [systemTwoFactorEnabled, setSystemTwoFactorEnabled] = useState(true);
  const [enforceAllUsers, setEnforceAllUsers] = useState(true);

  const getPasswordStrength = (password) => {
    if (!password) return [false, false, false, false];
    const hasLength = password.length >= 8;
    const hasNumber = /\d/.test(password);
    const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const hasUpper = /[A-Z]/.test(password);
    const score = [hasLength, hasNumber, hasSymbol, hasUpper].filter(
      Boolean,
    ).length;
    return [score >= 1, score >= 2, score >= 3, score >= 4];
  };

  const strengthBars = getPasswordStrength(new_password);

  const handleSubmit = async (e) => {
    e.preventDefault();
    mutate({
      current_password,
      new_password,
      new_password_confirmation,
    });
  };

  const handleToggleVerify2FA = async (e) => {
    e.preventDefault();
    setTwoFactorEnabled(!twoFactorEnabled);
    // mutate({
    //   current_password,
    //   new_password,
    //   new_password_confirmation,
    // });
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 w-full">
      {isPending && <Loader />}
      {/* Password Card */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-6 p-4 sm:p-6 bg-white rounded-2xl border-t-4 border-[#0050cb] shadow-[0px_12px_32px_#191c1d0a] relative"
      >
        <h2 className="text-lg sm:text-xl font-bold text-right ">
          إعدادات الأمان
        </h2>

        <p className="text-sm text-slate-500 text-right">
          قم بتغيير كلمة المرور الخاصة بك بانتظام للحفاظ على أمان حسابك.
        </p>

        {/* Inputs */}
        <div className="flex flex-col gap-4">
          <input
            required
            type="password"
            placeholder="كلمة المرور الحالية"
            className="w-full h-12 bg-[#f3f4f5] rounded-xl px-4 text-right outline-none"
            onChange={(e) => setCurrentPassword(e.target.value)}
          />

          <div>
            <input
              required
              type="password"
              placeholder="كلمة المرور الجديدة"
              className="w-full h-12 bg-[#f3f4f5] rounded-xl px-4 text-right outline-none"
              onChange={(e) => setNewPassword(e.target.value)}
            />

            {/* Strength */}
            <div className="flex gap-1 mt-2">
              {strengthBars.map((active, i) => (
                <div
                  key={i}
                  className={`flex-1 h-1 rounded-full ${
                    active ? "bg-[#0050cb]" : "bg-slate-200"
                  }`}
                />
              ))}
            </div>
          </div>

          <input
            required
            type="password"
            placeholder="تأكيد كلمة المرور"
            className="w-full h-12 bg-[#f3f4f5] rounded-xl px-4 text-right outline-none"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-[#e1e3e4] rounded-xl hover:bg-[#d0d2d3] transition"
        >
          تحديث كلمة المرور
        </button>
        {error && (
          <Typography variant="body1" color="error">
            {error.response.data.errors.current_password[0]}
          </Typography>
        )}

        {/* AI Tip */}
        <div className="mt-2 p-4 bg-[#0050cb0a] rounded-xl text-right">
          <p className="text-xs font-bold text-[#0050cb] mb-1">
            توصية الذكاء الاصطناعي
          </p>
          <p className="text-xs text-[#191c1d]">
            ننصح بتفعيل تنبيهات البريد الإلكتروني للتقارير الأسبوعية.
          </p>
        </div>
      </form>

      {/* Security Controls */}
      <div className="flex flex-col gap-4">
        {/* General Security */}
        <div className="flex flex-col gap-6 p-4 sm:p-6 bg-white rounded-2xl shadow-[0px_12px_32px_#191c1d0a]">
          <h3 className="text-lg font-bold text-right ">
            إعدادات الأمان العامة
          </h3>

          {/* Toggle Item */}
          <div className="flex items-center justify-between">
            <button
              onClick={handleToggleVerify2FA}
              className={`w-11 h-6 rounded-full relative ${
                twoFactorEnabled ? "bg-[#0050cb]" : "bg-gray-300"
              }`}
            >
              <span
                className={`absolute top-0.5 w-5 h-5 bg-white rounded-full ${
                  twoFactorEnabled ? "right-5" : "right-1"
                }`}
              />
            </button>

            <div className="text-right">
              <p className="font-bold text-sm">التحقق بخطوتين</p>
              <p className="text-xs text-slate-500">
                حماية إضافية عند تسجيل الدخول
              </p>
            </div>
          </div>

          {/* Toggle Item */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSystemTwoFactorEnabled(!systemTwoFactorEnabled)}
              className={`w-11 h-6 rounded-full relative ${
                systemTwoFactorEnabled ? "bg-[#0050cb]" : "bg-gray-300"
              }`}
            >
              <span
                className={`absolute top-0.5 w-5 h-5 bg-white rounded-full ${
                  systemTwoFactorEnabled ? "right-5" : "right-1"
                }`}
              />
            </button>

            <div className="text-right">
              <p className="font-bold text-sm">تفعيل 2FA على مستوى النظام</p>
              <p className="text-xs text-slate-500">
                تطبيق على جميع المستخدمين
              </p>
            </div>
          </div>

          {/* Checkbox */}
          <label className="flex items-center justify-between cursor-pointer">
            <input
              type="checkbox"
              checked={enforceAllUsers}
              onChange={() => setEnforceAllUsers(!enforceAllUsers)}
            />

            <span className="text-sm text-right">
              فرض التحقق على جميع المستخدمين
            </span>
          </label>

          <p className="text-xs text-slate-500 text-right">
            آخر تسجيل دخول: اليوم 10:45 صباحاً
          </p>
        </div>

        {/* Help Card */}
        <div className="flex flex-col gap-3 p-4 sm:p-6 bg-[#0066ff] rounded-2xl text-white text-right">
          <h3 className="text-lg font-bold">هل تحتاج للمساعدة؟</h3>

          <p className="text-sm opacity-90">
            فريق الدعم جاهز لمساعدتك في تأمين حسابك.
          </p>

          <button className="bg-white text-[#0050cb] text-sm px-4 py-2 rounded-xl w-fit">
            تواصل معنا
          </button>
        </div>
      </div>
    </div>
  );
};
