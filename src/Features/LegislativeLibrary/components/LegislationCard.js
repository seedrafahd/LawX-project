import { Bookmark, Globe, ArrowLeft, Scale, CalendarDays } from "lucide-react";
import { getDate } from "../../../shared/helpers/date";
import SharedBadge from "../../../shared/components/sharedBadge";
import { statusStyles } from "../helpers/constants";

export default function LegislationCard({ item }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm transition-all hover:shadow-md">
      <div className="p-4 md:p-6 space-y-2">
        {/* Header */}
        <div className="flex justify-between">
          <div className="flex items-center gap-3">
            <SharedBadge
              text={statusStyles[item.status].text}
              color={statusStyles[item.status].color}
            />

            <span className="text-gray-500 text-sm">{item.law_number}</span>
          </div>
          {/* Bookmark */}
          <button className="text-gray-400 hover:text-blue-600 transition-colors">
            <Bookmark size={22} />
          </button>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mt-2">{item.title}</h3>

        <div className="flex gap-4 text-sm mb-5">
          <div className="flex items-center gap-1 text-blue-600">
            <Scale size={16} />
            <span>{item.category?.name ?? item.category}</span>
          </div>

          <div className="flex items-center gap-1 text-gray-600">
            <Globe size={16} />
            <span>{item.country}</span>
          </div>
        </div>

        <p className="text-gray-700 text-sm leading-6 max-w-xl">
          {item.content ?? item.description}
        </p>

        {/* Footer */}
        <div className="border-t border-gray-100 pt-4">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <CalendarDays size={12} />
              {getDate(item.created_at)}
            </div>

            <button className="flex items-center gap-2 text-sm text-blue-600 font-semibold hover:text-blue-800 transition-colors">
              عرض التفاصيل
              <ArrowLeft size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
