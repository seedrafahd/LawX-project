import BenefitItem from "./BenefitItem";

const benefits = [
  {
    title: "إدارة أعضاء المكتب",
    description: "تنظيم الصلاحيات لكل فرد في الفريق",
  },
  {
    title: "دعوة المحامين",
    description: "إرسال دعوات الانضمام لشركائك",
  },
  {
    title: "إضافة المتدربين",
    description: "متابعة وتوجيه الكوادر الجديدة",
  },
  {
    title: "متابعة الدعوات المرسلة",
    description: "تتبع حالة القبول للطلبات المرسلة",
  },
  {
    title: "استقبال طلبات الانضمام",
    description: "إدارة طلبات المهتمين بالعمل معك",
  },
  {
    title: "إدارة المكتب بالكامل",
    description: "تحكم شامل في التقارير والنمو",
  },
];

export default function BenefitsSection() {
  return (
    <section className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
      <h3 className="mt-4 mb-8 text-center text-2xl font-bold text-gray-900">
        بإنشاء المكتب، ستتمكن من:
      </h3>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-y-8 gap-x-12">
        {benefits.map((item) => (
          <BenefitItem key={item.title} {...item} />
        ))}
      </div>
    </section>
  );
}
