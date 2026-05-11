import { MessageCircle, Pencil } from "lucide-react";
import { useParams } from "react-router-dom";
import PaymentsOutlinedIcon from "@mui/icons-material/PaymentsOutlined";
import { HearingsOverview } from "../Components/Hearings";
import SharedButton from "../../../shared/Components/SharedButton";
import DocumentLibrary from "../../Documents/Components/DocumentLibrary";
import TasksListForCase from "../../Tasks/Components/TasksListForCase";

export default function CaseDetailsPage() {
  const { id } = useParams();

  return (
    <div className="min-h-screen space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3 text-gray-500">
            <span className="text-lg">القضايا</span>
            <span>/</span>
            <span className="text-black">تفاصيل القضية</span>
          </div>
          <h2 className="text-gray-900 text-2xl font-bold">
            نزاع ملكية العقار-شركة الأمان الدولية
          </h2>
        </div>

        <SharedButton icon={<Pencil size={18} />}>تعديل</SharedButton>
      </div>
      {/* content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* main details */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm p-8">
          <div className="space-y-[18px]">
            <div className="space-y-[6px]">
              <div className="flex items-center justify-between text-[#586579] font-bold">
                <span className="text-xs bg-[#D6E3FB] px-4 py-1 rounded-full">
                  قيد التنفيذ
                </span>
                <span className="text-xs text-variable-collection-primary-color">
                  12 أكتوبر 2023
                </span>
              </div>

              <h1 className="text-lg text-gray-900 font-bold pt-3">
                نزاع ملكية العقار-شركة الأمان الدولية
              </h1>

              <h6 className="text-sm text-gray-500">
                قضية استئناف تتعلق بنزاع حول ملكية الاراضي الصناعية في المنطقة
                الحرة.
              </h6>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-sm">
              <div>
                <p className="text-gray-500 text-xs">المحكمة</p>
                <p className="text-gray-900 text-xs font-bold">محكمة عدل</p>
              </div>
              <div>
                <p className="text-gray-500 text-xs">نوع القضية</p>
                <p className="text-gray-900 text-xs font-bold">قضية عقارية</p>
              </div>
              <div>
                <p className="text-gray-500 text-xs"> الموكل</p>
                <p className="text-gray-900 text-xs font-bold">
                  الأمان القابضة
                </p>
              </div>
              <div>
                <p className="text-gray-500 text-xs"> الخصم</p>
                <p className="text-gray-900 text-xs font-bold">أحمد سعيد</p>
              </div>
            </div>
          </div>
        </div>

        {/* Financial Card */}
        <div className="bg-white rounded-xl shadow-sm p-8">
          <div className="space-y-6">
            <div className="flex justify-between">
              <h3 className="text-gray-900 text-sm">الحالة المالية</h3>
              <PaymentsOutlinedIcon className="text-blue-500" />
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-end justify-between">
                  <p className="text-xs text-gray-500">إجمالي الأتعاب</p>
                  <p className="text-3xl text-gray-900 font-bold">45,000</p>
                </div>

                <div className="w-full bg-gray-200 h-2 rounded-full">
                  <div className="bg-blue-500 h-2 rounded-full w-[66%]" />
                </div>
              </div>

              <div className="flex justify-between text-sm">
                <div className="bg-gray-100 p-4 space-y-1 text-center">
                  <p className="text-gray-400 text-xs">تم سداده</p>
                  <p className="text-variable-collection-primary-color font-bold">
                    30,000
                  </p>
                </div>
                <div className="bg-gray-100 p-4 space-y-1 text-center">
                  <p className="text-gray-400 text-xs">المتبقي</p>
                  <p className="text-red-700 font-bold">15,000</p>
                </div>
              </div>
            </div>
          </div>

          <button className="text-variable-collection-primary-color text-sm font-bold pt-6">
            عرض فواتير القضية
          </button>
        </div>
      </div>

      <HearingsOverview />

      {/* table and team */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Timeline */}
        <TasksListForCase case_id={id} />

        {/* Team Card */}
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <h3 className="mb-4">الفريق المكلف</h3>

          {[1, 2].map((member, i) => (
            <div key={i} className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <img
                  alt=""
                  src={`https://i.pravatar.cc/150?img=${i + 10}`}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="text-sm font-semibold">
                    {i === 0 ? "د. إبراهيم آل سعود" : "أ. سارة المنصور"}
                  </p>
                  <p className="text-xs text-gray-400">
                    {i === 0 ? "محامي رئيسي" : "محامية متدربة"}
                  </p>
                </div>
              </div>
              <MessageCircle className="w-5 h-5 text-gray-400" />
            </div>
          ))}

          <button className="w-full border border-dashed rounded-xl py-2 text-sm text-gray-500">
            تعديل الفريق
          </button>
        </div>
      </div>

      {/* Document Library */}
      <DocumentLibrary caseId={id} />
    </div>
  );
}
