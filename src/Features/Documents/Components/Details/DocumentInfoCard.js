import { Info } from "lucide-react";

export default function DocumentInfoCard({ file }) {
  const details = [
    {
      title: "القضية المرتبطة",
      value: file.case?.title || "لا يوجد قضية مرتبطة",
    },
    {
      title: "حجم الملف",
      value: file.file_size,
    },
    {
      title: "بواسطة",
      value: file.uploaded_by?.name || "غير معروف",
    },
    {
      title: "تاريخ الرفع",
      value: file.uploaded_AT
        ? new Date(file.uploaded_AT).toLocaleDateString()
        : "غير معروف",
    },
    {
      title: "آخر تحديث",
      value: file.updated_at
        ? new Date(file.updated_at).toLocaleDateString()
        : "غير معروف",
    },
  ];

  return (
    <section className="rounded-lg border border-gray-200 bg-white shadow-sm p-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-200 pb-4">
        <div className="flex items-center gap-2 text-xl font-semibold text-gray-900">
          <Info size={20} />

          <h2>معلومات المستند</h2>
        </div>
      </div>

      {/* Content */}

      <div className="grid grid-cols-1 gap-y-5 gap-x-4 sm:grid-cols-2 lg:grid-cols-3 mt-6">
        {details.map((item) => (
          <div key={item.title}>
            <p className="mb-1 text-sm text-gray-600">{item.title}</p>

            <p className="leading-7 font-medium text-gray-800">{item.value}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
