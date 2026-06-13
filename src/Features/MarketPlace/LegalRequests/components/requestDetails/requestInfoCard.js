import { Wallet } from "lucide-react";
import SharedBadge from "../../../../../shared/Components/sharedBadge";
import { statusStyles } from "../../helpers/constants";

export default function RequestInfoCard({ request }) {
  return (
    <div className="rounded-xl bg-white space-y-6 p-8">
      <div className="space-y-4">
        <h2 className="text-xl md:text-2xl font-extrabold text-gray-900">
          {request.title_request}
        </h2>
        <div className="flex flex-wrap items-center gap-2">
          <SharedBadge text={request.type} color="blue" />
          <SharedBadge
            text={statusStyles[request.status].text}
            color={statusStyles[request.status].color}
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-6 bg-[#EFF4FF]/50 rounded-[8px] p-4 text-gray-600 text-sm">
        <span className="inline-flex items-center gap-2 font-bold">
          <Wallet size={18} className="text-blue-600" />
          {request.budget_min} _ {request.budget_max} ل.س
        </span>
      </div>
      <div className="space-y-4 pt-2">
        <h3 className="text-sm font-bold text-gray-900">
          وصف المشكلة القانونية
        </h3>
        <p className="text-gray-600 leading-8 line-clamp-3">
          {request.description_request}
        </p>
      </div>
    </div>
  );
}
