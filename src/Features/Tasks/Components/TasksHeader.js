import { Plus } from "lucide-react";
import SharedButton from "../../../shared/Components/SharedButton";
import { useNavigate } from "react-router-dom";

export default function TasksHeader() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between gap-3">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">كل المهام</h1>

        <p className="text-sm text-gray-500">
          تابع جميع المهام المرتبطة بالقضايا والمراحل المختلفة
        </p>
      </div>

      <SharedButton
        icon={<Plus size={18} />}
        onClick={() => navigate("/cases/create")}
      >
        إضافة مهام
      </SharedButton>
    </div>
  );
}
