import { Info } from "lucide-react";

export default function TipCard() {
  return (
    <div className="rounded-xl border border-[#004AC6]/20 bg-gradient-to-br bg-[#004AC6]/10 p-4 shadow-sm">
      <div className="flex items-start gap-3">
        <Info className="h-5 w-5 text-blue-700" />

        <div>
          <h4 className="mb-1 text-xs font-bold text-blue-800">نصيحة للنظام</h4>

          <p className="text-xs text-gray-500">
            سيتم إرسال إشعار فوري للموكل عبر البريد الإلكتروني والرسائل النصية
            SMS بمجرد إنشاء الفاتورة.
          </p>
        </div>
      </div>
    </div>
  );
}
