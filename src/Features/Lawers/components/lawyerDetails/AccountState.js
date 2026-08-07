import { BadgeInfo } from "lucide-react";

export default function AccountState({ type, is_claimed, isSuspended }) {
  return (
    <div className="bg-white rounded-lg border shadow-sm p-8">
      <h2 className="font-bold mb-4">حالة الحساب</h2>

      {/* Card 1 */}
      <div className="rounded-lg border border-blue-500 bg-blue-50 p-4">
        <div className="flex justify-between">
          <div>
            <div className="text-blue-700 text-xs font-bold">
              الرتبة الحالية
            </div>

            <div className="mt-1 text-sm font-semibold text-blue-700">
              {type === "licensed"
                ? "محامي موثق"
                : type === "trainee"
                  ? "محامي متدرب"
                  : "حالة غير معروفة"}
            </div>
          </div>

          <BadgeInfo className="text-blue-600" size={14} />
        </div>
      </div>

      {/* Card 2 */}
      <div className="rounded-lg border border-green-500 bg-green-50 p-4 mt-4">
        <div className="flex justify-between">
          <div>
            <div className="text-xs font-bold text-green-700">حالة الدخول</div>

            <div className="mt-1 text-sm text-green-700">
              {isSuspended
                ? "معلق"
                : is_claimed
                  ? "نشط حالياً"
                  : "غير نشط حالياً"}
            </div>
          </div>

          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
      </div>
    </div>
  );
}
