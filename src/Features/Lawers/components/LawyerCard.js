import { Eye } from "lucide-react";
import SharedButton from "../../../shared/components/SharedButton";
import SharedBadge from "../../../shared/components/sharedBadge";
import { memberStatusStyles } from "../helpers/constants";

export default function LawyerCard({ data, handleOpenDetails }) {
  return (
    <div className="bg-white rounded-xl border border-[#D9DEE8] shadow-sm overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      {/* Body */}

      <div className="p-6">
        {/* Header */}

        <div className="flex justify-between mb-4">
          <div className="flex items-center gap-2">
            <img
              src={data.image}
              alt={data.full_name || data.Lawer_that_invited_name}
              className="w-12 h-12 rounded-xl object-cover border border-gray-200"
            />
            <h3 className="text-gray-900 font-bold">{data.full_name}</h3>
          </div>

          <SharedBadge
            text={memberStatusStyles[data.is_suspended]?.text}
            color={memberStatusStyles[data.is_suspended]?.color}
          />
        </div>

        {/* Info */}
        <div className="mb-6">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-600">رقم بطاقة النقابة:</span>

            <span className="text-gray-900">{data.syndicate_card_number}</span>
          </div>

          <div className="flex items-center gap-2 text-sm mt-1">
            <span className="text-gray-600">فرع النقابة:</span>

            <span className="text-gray-900">{data.syndicate_branch}</span>
          </div>

          <div className="flex items-center gap-2 mt-4">
            <SharedBadge text={data.lawyer_state} color="primary" />
            <SharedBadge text="12 year" color="gray" />
          </div>
        </div>

        {/* Divider */}
        <div className="mb-4 border-t border-gray-400" />

        {/* Action Button */}
        <SharedButton
          onClick={() => handleOpenDetails(data)}
          icon={<Eye size={18} />}
          className="w-full"
        >
          عرض التفاصيل
        </SharedButton>
      </div>
    </div>
  );
}
