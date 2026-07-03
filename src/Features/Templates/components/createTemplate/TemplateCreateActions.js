import { Plus, Save } from "lucide-react";
import SharedButton from "../../../../shared/components/SharedButton";

export default function TemplateCreateActions({ isEditMode, handleCancel }) {
  return (
    <div className="flex flex-col gap-3">
      <SharedButton
        icon={isEditMode ? <Save size={18} /> : <Plus size={18} />}
        children={isEditMode ? "حفظ التعديلات" : "إنشاء القالب"}
        className="w-full"
        type="submit"
      />

      <SharedButton
        onClick={handleCancel}
        children="إلغاء"
        colors="bg-gray-300 text-gray-700 hover:bg-gray-400"
        className="w-full"
      />
    </div>
  );
}
