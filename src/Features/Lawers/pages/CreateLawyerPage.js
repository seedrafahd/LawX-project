import { UserPlus } from "lucide-react";

import PersonalInformationSection from "../components/createLawyer/PersonalInformationSection";
import BarInformationSection from "../components/createLawyer/BarInformationSection";
import { useLawyerForm } from "../hooks/useLawyerForm";
import { useLocation, useParams } from "react-router-dom";
import Loader from "../../../shared/components/Loading";
import SharedButton from "../../../shared/components/SharedButton";

export default function CreateLawyerProfilePage() {
  const { id } = useParams();
  const location = useLocation();
  const isEditMode = Boolean(id);
  const lawyer = location.state?.lawyerData;
  const { form, errors, updateField, submit, isPending } = useLawyerForm(
    lawyer,
    isEditMode,
  );

  return (
    <>
      {isPending && <Loader />}
      {/* Header */}
      <div className="text-sm text-gray-500 mb-1">
        المحاميين
        <span className="mx-2">›</span>
        <span className="text-[#0B4EA2] font-semibold">
          {isEditMode ? "تعديل بيانات محامي" : " إنشاء ملف محامي جديد"}
        </span>
      </div>

      <h1 className="text-2xl font-bold text-gray-900 leading-none">
        {isEditMode ? "تعديل بيانات محامي" : " إنشاء ملف محامي جديد"}
      </h1>

      <p className="mt-1 text-gray-600">
        قم بإنشاء سجل المحامي، سيتمكن المحامي من تسجيل الحساب لاحقاً من خلال
        منصة LawX.
      </p>

      {/* Sections */}

      <div className="mt-8 space-y-6">
        <PersonalInformationSection
          form={form}
          updateField={updateField}
          errors={errors}
        />

        <BarInformationSection
          form={form}
          updateField={updateField}
          errors={errors}
        />

        {/* <AccountStatusCard /> */}
      </div>

      {/* Buttons */}

      <div className="flex justify-end gap-4 mt-8">
        <SharedButton
          onClick={submit}
          icon={<UserPlus size={20} />}
          children={isEditMode ? "حفظ التعديلات" : " إنشاء الملف"}
        />
        <SharedButton
          onClick={() => window.history.back()}
          colors="text-gray-700 bg-gray-200 hover:bg-gray-300"
          children="إلغاء"
        />
      </div>
    </>
  );
}
