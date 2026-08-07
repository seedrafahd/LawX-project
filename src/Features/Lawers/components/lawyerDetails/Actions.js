import { ArrowBigUp, Ban, ShieldCheck, Trash2 } from "lucide-react";
import SharedButton from "../../../../shared/components/SharedButton";

export default function Actions({
  type,
  isSuspended,
  setisPromoteModalOpen,
  setisDeleteModalOpen,
  setisSuspendedModalOpen,
}) {
  return (
    <div className="bg-white rounded-lg border shadow-sm p-8">
      <div className="flex items-center gap-2 mb-6">
        <ShieldCheck size={18} />

        <h2 className="font-bold">الإجراءات</h2>
      </div>

      {type === "trainee" && (
        <SharedButton
          onClick={setisPromoteModalOpen}
          colors="bg-variable-collection-primary-color/10 text-variable-collection-primary-color hover:bg-variable-collection-primary-color/20"
          className="w-full mb-4"
          icon={<ArrowBigUp size={20} />}
          children=" ترقية إلى محامي موثق"
        />
      )}

      <SharedButton
        onClick={setisSuspendedModalOpen}
        colors={
          isSuspended
            ? "bg-green-100 text-green-700 hover:bg-green-200"
            : "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
        }
        className="w-full mb-4"
        icon={isSuspended ? <ShieldCheck size={20} /> : <Ban size={20} />}
        children={isSuspended ? " إعادة تفعيل الحساب" : " تعليق الحساب"}
      />
      <SharedButton
        onClick={setisDeleteModalOpen}
        colors="bg-red-100 text-red-700 hover:bg-red-200"
        className="w-full"
        icon={<Trash2 size={20} />}
        children=" حذف الحساب"
      />
    </div>
  );
}
