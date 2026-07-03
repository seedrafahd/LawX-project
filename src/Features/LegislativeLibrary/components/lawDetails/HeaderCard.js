export default function LawHeaderCard({ law }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
      <div className="p-6 md:p-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between mb-6">
          {/* Right */}
          <div className="space-y-1">
            <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-700">
              بطاقة معلومات القانون
            </span>

            <h2 className="text-2xl font-bold text-gray-900">{law.title}</h2>

            <p className="text-gray-500">رقم القانون : {law.law_number}</p>
          </div>

          {/* Status */}
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
              <span className="h-2 w-2 rounded-full bg-green-600"></span>
              {law.status}
            </span>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6 mb-6">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <InfoItem label="التصنيف" value={law.category?.name} />
            <InfoItem label="الدولة" value={law.country} />
            <InfoItem label="تاريخ النفاذ" value={law.publish_date} />
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {law.book && <InfoItem label="الكتاب" value={law.book} />}
            {law.part && <InfoItem label="الباب" value={law.part} />}
            {law.chapter && <InfoItem label="الفصل" value={law.chapter} />}
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoItem({ label, value }) {
  return (
    <div>
      <p className="mb-1 text-xs text-gray-500">{label}</p>
      <p className="font-bold text-gray-900">{value}</p>
    </div>
  );
}
