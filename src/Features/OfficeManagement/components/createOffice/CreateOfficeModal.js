import { Check } from "lucide-react";
import SharedButton from "../../../../shared/components/SharedButton";

const features = [
  "إدارة المحامين.",
  "إدارة المتدربين.",
  "إرسال الدعوات",
  "متابعة طلبات الانضمام",
  "إدارة جميع بيانات المكتب",
];

export default function CreateOfficeModal({ isOpen, onClose, handleSubmit }) {
  if (!isOpen) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#00000066] px-4 py-6 font-sans backdrop-blur-[6px]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="activate-office-title"
    >
      <div
        className={`flex max-h-[calc(100vh-3rem)] w-full max-w-xl lg:max-w-2xl flex-col overflow-hidden rounded-xl bg-white shadow-2xl`}
      >
        <div className="p-12 space-y-6">
          {/* Status */}
          <div className="flex justify-center">
            <div className="bg-[#E7EEF9] text-[#6F7D95] text-sm font-bold rounded-full px-6 py-2">
              حالة المكتب: غير نشط
            </div>
          </div>

          {/* Title */}
          <h1 className="text-center text-[#0F2747] text-2xl font-bold lg:text-3xl lg:font-extrabold">
            سيتم إنشاء مكتب جديد وربط
            <br />
            حسابك كمدير للمكتب.
          </h1>

          {/* Card */}
          <div className="mt-4 rounded-[24px] border border-[#E6EBF3] p-8">
            <h2 className="text-center text-[#5E6A82] font-bold mb-6">
              بعد إنشاء المكتب ستتمكن من:
            </h2>

            <div className="space-y-5">
              {features.map((item) => (
                <FeatureItem key={item} text={item} />
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-4 flex gap-4 px-8">
            <SharedButton onClick={handleSubmit} className="w-full">
              تأكيد
            </SharedButton>
            <SharedButton
              onClick={onClose}
              colors="bg-gray-200 text-gray-700 hover:bg-gray-300"
              className="w-full"
            >
              إلغاء
            </SharedButton>
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureItem({ text }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-[#5F6777] font-semibold">{text}</span>

      <div className="w-6 h-6 rounded-full border-2 border-[#00C389] flex items-center justify-center">
        <Check size={16} strokeWidth={3} className="text-[#00C389]" />
      </div>
    </div>
  );
}
