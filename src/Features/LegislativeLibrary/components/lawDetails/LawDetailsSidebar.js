import { ChevronLeft, FileText, Link2 } from "lucide-react";

export default function LawDetailsSidebar({ relatedLaws }) {
  return (
    <aside className="">
      {/* Related Laws */}
      <div className="mb-3 flex items-center gap-2 text-gray-900">
        <Link2 size={18} className="text-blue-600" />

        <h3 className="text-sm font-bold">تشريعات مرتبطة</h3>
      </div>

      <div className="space-y-2">
        {relatedLaws.length ? (
          relatedLaws.map((law) => <RelatedLawCard key={law.id} item={law} />)
        ) : (
          <p className="rounded-xl bg-white p-8 text-center text-sm font-semibold text-gray-500">
            لا توجد تشريعات مرتبطة بهذا القانون
          </p>
        )}
      </div>
    </aside>
  );
}

function RelatedLawCard({ item }) {
  return (
    <button className="group flex w-full items-center justify-between rounded-xl border border-gray-200 bg-white p-4 transition-all hover:shadow-md">
      <div className="flex items-center gap-3">
        <FileText size={20} className="text-gray-500" />

        <div className="font-bold text-gray-900">{item.title}</div>
      </div>

      <ChevronLeft
        size={18}
        className="text-gray-400 transition group-hover:text-blue-600"
      />
    </button>
  );
}
