import { Sparkles } from "lucide-react";

export default function AITagsCard({ tags }) {
  return (
    <section className="flex h-full flex-col rounded-lg border border-gray-200 bg-white shadow-sm p-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-200 pb-4">
        <div className="flex items-center gap-2 text-xl font-semibold text-gray-900">
          <Sparkles size={20} />

          <h2>الوسوم الذكية (AI)</h2>
        </div>
      </div>

      {/* Body */}

      <div className="flex flex-1 flex-col justify-between mt-6">
        {/* Tags */}

        <div className="flex flex-wrap gap-2">
          {tags.length > 0 ? (
            tags.map((tag) => (
              <button
                key={tag}
                className="rounded-sm border border-gray-200 bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700
                  transition-all hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600
                "
              >
                {tag}
              </button>
            ))
          ) : (
            <p className="text-sm font-semibold text-gray-500">
              لا توجد مستندات بعد
            </p>
          )}
        </div>

        {/* Footer */}

        <div className="mt-4 border-t border-gray-100 pt-2">
          <p className="text-center text-gray-500">
            تم التحليل تلقائياً بواسطة محرك الذكاء الاصطناعي القانوني
          </p>
        </div>
      </div>
    </section>
  );
}
