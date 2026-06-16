// import icon3 from "./icon-3.svg";
// import icon from "./icon.svg";
// import image from "./image.svg";
// import vector2 from "./vector-2.svg";
// import vector4 from "./vector-4.svg";
// import vector6 from "./vector-6.svg";
// import vector from "./vector.svg";

export const GlobalSessionActionSection = () => {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 w-full">
      {/* Login Policies Card */}
      <div className="flex flex-col gap-4 p-4 sm:p-6 bg-white rounded-xl border border-[#c2c6d81a] shadow-[0px_12px_32px_#191c1d0a]">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-[#191c1d] text-right [direction:rtl]">
            سياسات تسجيل الدخول
          </h3>
          {/* <img src={icon3} className="w-5 h-5" /> */}
        </div>

        {/* Field */}
        <div className="flex flex-col gap-1 text-right [direction:rtl]">
          <label className="text-xs text-[#424656]">أقصى محاولات دخول</label>
          <p className="text-xs text-[#424656]">
            تحديد عدد المحاولات قبل الحظر
          </p>

          <input
            type="number"
            defaultValue={5}
            className="w-full bg-[#f3f4f5] rounded-lg px-4 py-2 text-sm outline-none"
          />
        </div>

        {/* Field */}
        <div className="flex flex-col gap-1 text-right [direction:rtl]">
          <label className="text-xs text-[#424656]">مدة قفل الحساب</label>
          <p className="text-xs text-[#424656]">
            مدة قفل الحساب بعد المحاولات الفاشلة
          </p>

          <div className="flex items-center justify-between bg-[#f3f4f5] rounded-lg px-3 py-2">
            {/* <img src={vector6} className="w-4 h-4" /> */}
            <span className="text-sm">30 دقيقة</span>
          </div>
        </div>

        {/* Field */}
        <div className="flex flex-col gap-1 text-right [direction:rtl]">
          <label className="text-xs text-[#424656]">مدة قفل الحساب</label>

          <div className="flex items-center justify-between bg-[#f3f4f5] rounded-lg px-3 py-2">
            {/* <img src={vector4} className="w-4 h-4" /> */}
            <span className="text-sm">30 دقيقة</span>
          </div>
        </div>
      </div>

      {/* General Settings */}
      <div className="xl:col-span-2 flex flex-col gap-4 p-4 sm:p-6 bg-white rounded-xl shadow-[0px_12px_32px_#191c1d0a]">
        <h3 className="text-lg font-bold text-right [direction:rtl]">
          إعدادات عامة
        </h3>

        {/* Language */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 bg-[#1987541a] rounded-xl">
          <div className="flex items-center gap-3">
            {/* <img src={icon} className="w-5 h-5" /> */}

            <div className="text-right [direction:rtl]">
              <p className="text-sm font-bold">لغة النظام</p>
              <p className="text-xs text-slate-500">
                اختر اللغة المفضلة لواجهة المستخدم
              </p>
            </div>
          </div>

          <div className="bg-white px-3 py-2 rounded-lg text-sm">العربية</div>
        </div>

        {/* Notifications */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 bg-[#f8f9fa] rounded-xl">
          <div className="flex items-center gap-3">
            {/* <img src={image} className="w-5 h-5" /> */}

            <div className="text-right [direction:rtl]">
              <p className="text-sm font-bold">الإشعارات</p>
              <p className="text-xs text-slate-500">
                تلقي تحديثات فورية حول القضايا والمواعيد
              </p>
            </div>
          </div>

          {/* Toggle */}
          <div className="w-10 h-5 bg-blue-500 rounded-full relative">
            <span className="absolute right-5 top-0.5 w-4 h-4 bg-white rounded-full" />
          </div>
        </div>

        {/* Dark Mode */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 bg-[#9747ff1a] rounded-xl">
          <div className="flex items-center gap-3">
            {/* <img src={vector2} className="w-5 h-5" /> */}

            <div className="text-right [direction:rtl]">
              <p className="text-sm font-bold">الوضع الداكن</p>
              <p className="text-xs text-slate-500">تفعيل الوضع الداكن</p>
            </div>
          </div>

          {/* Toggle */}
          <div className="w-10 h-5 bg-gray-300 rounded-full relative">
            <span className="absolute right-1 top-0.5 w-4 h-4 bg-white rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
};
