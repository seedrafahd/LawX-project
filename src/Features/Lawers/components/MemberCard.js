import {
  BriefcaseBusiness,
  MapPin,
  CalendarDays,
  SendHorizonal,
  XCircle,
  Eye,
  User,
  DollarSign,
  Backpack,
} from "lucide-react";
import SharedButton from "../../../shared/components/SharedButton";
import { getDate } from "../../../shared/helpers/date";
import SharedBadge from "../../../shared/components/sharedBadge";
import { memberStatusStyles } from "../helpers/constants";
import { invitationStatusStyles } from "../../OfficeManagement/helpers/constants";

function renderActionButton(variant, member, handlers) {
  switch (variant) {
    case "invite":
      return (
        <SharedButton
          onClick={handlers.onInvite}
          icon={<SendHorizonal size={18} />}
          className="w-full"
        >
          دعوة للانضمام
        </SharedButton>
      );

    case "member":
      return (
        <SharedButton
          onClick={handlers.onRemove}
          colors="text-white bg-red-600 hover:bg-red-700"
          className="w-full"
        >
          إزالة من المكتب
        </SharedButton>
      );

    case "invitation":
      if (member.status === "pending") {
        return (
          <SharedButton
            onClick={handlers.onWithdraw}
            colors="text-white bg-yellow-600 hover:bg-yellow-700"
            icon={<XCircle size={18} />}
            className="w-full"
          >
            سحب الدعوة
          </SharedButton>
        );
      }
      return (
        <SharedButton
          onClick={handlers.onViewProfile}
          icon={<Eye size={18} />}
          className="w-full"
        >
          عرض الملف الشخصي
        </SharedButton>
      );

    case "receive":
      return (
        <div className="flex gap-2">
          <SharedButton onClick={handlers.onAccept} className="w-full">
            قبول الدعوة
          </SharedButton>
          <SharedButton
            onClick={handlers.onReject}
            colors="text-gray-700 bg-white hover:bg-gray-100 border"
            className="w-fit"
          >
            رفض
          </SharedButton>
        </div>
      );

    default:
      return null;
  }
}

export default function MemberCard({
  data,
  variant = "member",
  onInvite,
  onRemove,
  onWithdraw,
  onViewProfile,
  onAccept,
  onReject,
}) {
  return (
    <div className="bg-white rounded-xl border border-[#D9DEE8] shadow-sm overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      {/* Body */}

      <div className="p-6">
        {/* Header */}

        <div className="flex justify-between mb-4">
          <div className="flex items-center gap-2">
            <img
              src={data.image}
              alt=""
              className="w-12 h-12 rounded-xl object-cover border border-gray-200"
            />
            <h3 className="text-gray-900 font-bold">
              {data.full_name ||
                data.Lawer_that_invited_name ||
                data.office_name}
            </h3>
          </div>

          <SharedBadge
            text={
              variant === "member"
                ? memberStatusStyles[data.status]?.text
                : variant === "invitation" || variant === "receive"
                  ? invitationStatusStyles[data.status].text
                  : "محامي مستقل"
            }
            color={
              variant === "member"
                ? memberStatusStyles[data.status]?.color
                : variant === "invitation" || variant === "receive"
                  ? invitationStatusStyles[data.status].color
                  : "primary"
            }
          />
        </div>

        {/* Info */}
        <div className="mb-6 space-y-1">
          {/* <div className="flex items-center gap-2 text-sm text-gray-600">
            <BriefcaseBusiness size={18} />

            <span>{data.specialty}</span>
          </div> */}

          {data.syndicate_branch && (
            <div className="flex items-center gap-2 text-sm">
              <MapPin size={18} className="text-gray-600" />
              <span className="text-gray-600">المدينة:</span>

              <span className="text-gray-900">{data.syndicate_branch}</span>
            </div>
          )}

          {data.owner_office_name && (
            <div className="flex items-center gap-2 text-sm">
              <User size={18} className="text-gray-600" />
              <span className="text-gray-600">صاحب المكتب:</span>

              <span className="text-gray-900">{data.owner_office_name}</span>
            </div>
          )}

          {data.salary_expected && (
            <div className="flex items-center gap-2 text-sm">
              <DollarSign size={18} className="text-gray-600" />
              <span className="text-gray-600">الراتب المقترح:</span>

              <span className="text-gray-900">{data.salary_expected}</span>
            </div>
          )}

          {data.syndicate_card_number && (
            <div className="flex items-center gap-2 text-sm">
              <Backpack size={18} className="text-gray-600" />
              <span className="text-gray-600">رقم النقابة:</span>

              <span className="text-gray-900">
                {data.syndicate_card_number}
              </span>
            </div>
          )}

          {data.joinDate && (
            <div className="flex items-center gap-2 text-sm">
              <CalendarDays size={18} className="text-gray-600" />
              <span className="text-gray-600">تاريخ الانضمام:</span>

              <span className="text-gray-900">{data.joinDate}</span>
            </div>
          )}

          {data.created_at && (
            <div className="flex items-center gap-2 text-sm">
              <CalendarDays size={18} className="text-gray-600" />
              <span className="text-gray-600">تم الإرسال:</span>

              <span className="text-gray-900">{getDate(data.created_at)}</span>
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="mb-4 border-t border-gray-400" />

        {/* Action Button */}
        {renderActionButton(variant, data, {
          onInvite,
          onRemove,
          onWithdraw,
          onViewProfile,
          onAccept,
          onReject,
        })}
      </div>
    </div>
  );
}
