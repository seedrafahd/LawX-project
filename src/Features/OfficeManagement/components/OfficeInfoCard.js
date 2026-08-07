import { BadgeCheck } from "lucide-react";
import SharedBadge from "../../../shared/components/sharedBadge";

export default function OfficeInfoCard() {
  return (
    <div className="rounded-lg p-6 border border-gray-200 bg-white shadow-sm">
      {/* Header */}

      <div className="flex items-start justify-between mb-4">
        <BadgeCheck className="text-[#0D2D5B]" size={26} />

        <SharedBadge text="نشط" color="green" />
        {/* <div className="rounded-full bg-green-100 px-4 py-1 text-sm font-bold text-green-700">
          نشط
        </div> */}
      </div>

      <div>
        <h2 className="text-lg font-bold text-gray-900">
          مكتب النخبة للمحاماة
        </h2>

        <p className="text-sm text-gray-500">
          ترخيص رقم:
          <span className="mr-2">L-2024-99811#</span>
        </p>
      </div>

      {/* المعلومات */}

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <div className="rounded-sm border bg-gray-50 p-4">
          <div className="text-xs text-gray-500">تاريخ التأسيس</div>

          <div className="mt-1 font-semibold text-gray-900">سبتمبر 2018</div>
        </div>

        <div className="rounded-sm border bg-gray-50 p-4">
          <div className="text-xs text-gray-500">الموقع الرئيسي</div>

          <div className="mt-1 font-semibold text-gray-900">
            الرياض، الملك فهد
          </div>
        </div>
      </div>
    </div>
  );
}
