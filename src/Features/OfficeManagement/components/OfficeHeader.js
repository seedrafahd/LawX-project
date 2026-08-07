import { CheckCircle2 } from "lucide-react";

export default function OfficeHeader() {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
      {/* العنوان */}
      <div>
        <h1 className="text-xl font-bold text-gray-900">إدارة المكتب</h1>

        <p className="mt-1 text-lg text-gray-500">
          المركز الرئيسي لإدارة العملاء والموظفين في مكتب النخبة
        </p>
      </div>
    </div>
  );
}
