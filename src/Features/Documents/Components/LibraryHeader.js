import { Search, ChevronDown, ChevronUp, Upload } from "lucide-react";
import { useState } from "react";
import SharedButton from "../../../shared/components/SharedButton";

const INITIAL_TAGS_COUNT = 6;

export default function LibraryHeader({
  tags = [],
  searchQuery = "",
  onSearchChange,
  onTagClick,
  openModal,
}) {
  const [showAllTags, setShowAllTags] = useState(false);
  const hasMoreTags = tags.length > INITIAL_TAGS_COUNT;
  const displayedTags = showAllTags ? tags : tags.slice(0, INITIAL_TAGS_COUNT);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center gap-2">
        <div className="relative w-full">
          <Search
            size={18}
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            className="h-12 w-full rounded-lg border border-gray-300 bg-gray-50 pr-10 text-sm text-gray-700 outline-none transition placeholder:text-gray-400"
            placeholder="ابحث عن عقد، مذكرة، فاتورة، أو أي مستند..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            autoFocus
          />
        </div>

        <SharedButton
          icon={<Upload size={18} />}
          onClick={openModal}
          className="w-fit flex-none shrink-0 whitespace-nowrap"
        >
          رفع ملف جديد
        </SharedButton>
      </div>

      {tags.length > 0 && (
        <div>
          <div className="flex items-center gap-3 flex-wrap">
            {displayedTags.map((tag) => (
              <button
                key={tag}
                onClick={() => onTagClick(tag)}
                className={`flex-none text-sm font-normal py-2 px-6 rounded-full border whitespace-nowrap transition-colors ${
                  searchQuery === tag
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200"
                }`}
              >
                {tag}
              </button>
            ))}
            {hasMoreTags && (
              <button
                onClick={() => setShowAllTags((prev) => !prev)}
                className="flex items-center gap-1 flex-none text-sm font-medium py-2 px-4 rounded-full border border-gray-200 bg-white text-blue-600 hover:bg-blue-50 whitespace-nowrap transition-colors"
              >
                {showAllTags ? "عرض أقل" : "عرض المزيد"}
                {showAllTags ? (
                  <ChevronUp size={16} />
                ) : (
                  <ChevronDown size={16} />
                )}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
