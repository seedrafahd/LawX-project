export const settingsHeader = () => {
  return (
    <div className="flex flex-col items-end gap-2 w-full">
      {/* Title */}
      <div className="w-full flex justify-end">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#191c1d] leading-tight text-right [direction:rtl]">
          إعدادات النظام
        </h1>
      </div>

      {/* Description */}
      <div className="w-full max-w-2xl flex justify-end">
        <p className="text-sm sm:text-base text-[#424656] leading-relaxed text-right [direction:rtl]">
          إدارة إعدادات الأمان والتحكم بالوصول على مستوى النظام
        </p>
      </div>
    </div>
  );
};
