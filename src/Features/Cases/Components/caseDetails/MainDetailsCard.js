import Loader from "../../../../shared/components/Loading";
import { StatusDropdown } from "../../../../shared/components/sharedBadge";
import { statusOptions } from "../../helpers/constants";
import { useUpdateCase } from "../../hooks/useCases";

export default function MainDetailsCard({ caseData }) {
  console.log(caseData);
  const caseTitle = caseData?.title || "لا يوجد عنوان للقضية";
  const caseDescription = caseData?.description || "لا يوجد وصف للقضية";
  const { mutate: updateCase, isPending } = useUpdateCase(caseData.id);

  if (isPending) return <Loader />;
  return (
    <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm p-8">
      <div className="space-y-[18px]">
        <div className="space-y-[6px]">
          <div className="flex items-center justify-between text-[#586579] font-bold">
            <StatusDropdown
              value={caseData.status}
              options={statusOptions}
              onChange={(e) => {
                updateCase({ status: e, case_id: caseData.id });
              }}
            />
            <span className="text-xs text-variable-collection-primary-color">
              {caseData.created_at}
            </span>
          </div>

          <h1 className="text-lg text-gray-900 font-bold pt-3">{caseTitle}</h1>

          <h6 className="text-sm text-gray-500">{caseDescription}</h6>

          {/* Progress percentage */}
          <div className="flex gap-2 pt-6">
            <p className="text-sm textt-gray-900">نسبة التقدم بالقضية:</p>

            <div className="w-full">
              <h3 className="text-gray-700 font-bold">
                {caseData.progress_percentage}%
              </h3>
              <div className="bg-gray-200 h-2 rounded-full">
                <div
                  className="bg-blue-500 h-2 rounded-full"
                  style={{ width: `${caseData.progress_percentage}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
