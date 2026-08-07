import SharedButton from "../../../../shared/components/SharedButton";

export default function HeroSection({ handleOpenModal }) {
  return (
    <section className="relative overflow-hidden rounded-xl border border-gray-200 bg-white p-8 space-y-4 shadow-sm">
      {/* Badge */}
      <div className="flex justify-center">
        <div className="rounded-full bg-blue-100 px-4 py-1 text-sm font-medium text-gray-700">
          حالة المكتب : غير نشط
        </div>
      </div>

      {/* Title */}
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900">
          ابدأ رحلتك المهنية الرقمية اليوم
        </h1>

        <p className="mt-4 mx-auto max-w-xl text-lg text-gray-500">
          أنت تعمل حالياً كمحام مستقل، قم بإنشاء مكتبك القانوني الافتراضي لإدارة
          القضايا، الموكلين، والوثائق في مكان واحد وبكل احترافية.
        </p>
      </div>

      {/* Button */}
      <div className="flex justify-end pt-4">
        <SharedButton onClick={handleOpenModal} children="إنشاء مكتب" />
      </div>
    </section>
  );
}
