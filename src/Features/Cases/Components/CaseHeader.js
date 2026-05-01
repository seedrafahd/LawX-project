export default function CaseHeader() {
  return (
    <div className="flex flex-col">
      {/* Right */}
      <div className="flex items-center gap-3 text-gray-500">
        <span className="text-lg">القضايا</span>
        <span>/</span>
        <span className="text-black">إنشاء قضية جديدة</span>
      </div>
      <h1 className="[font-family:'Cairo-SemiBold',Helvetica] text-black text-lg self-stretch tracking-[0]">
        تسجيل قضية جديدة
      </h1>
      <p className="[font-family:'Cairo-Medium',Helvetica] font-medium text-gray-500 self-stretch tracking-[0]">
        يرجى اتباع الخطوات المبسطة أدناه لتوثيق ملف القضية في النظام
      </p>
    </div>
  );
}
