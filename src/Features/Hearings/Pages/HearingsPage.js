import React, { useState } from "react";
import { Plus } from "lucide-react";
import AddHearing from "../Components/AddHearingModal";
import HearingsList from "../Components/HearingsList";
import { useHearings } from "../Hooks/useHearings";
import { useParams } from "react-router-dom";
import Loader from "../../../shared/Components/Loading";

export default function HearingsPsge() {
  const { id } = useParams();
  const { data, isPending } = useHearings(id);
  const [isAddHearingOpen, setIsAddHearingOpen] = useState(false);

  return (
    <div className="flex-1 flex flex-col gap-5">
      {isPending && <Loader />}
      <div className="flex justify-between items-center">
        <div className="space-y-2">
          <div className="flex items-center gap-3 text-gray-500 text-sm">
            <span>القضايا</span>
            <span>/</span>
            <span>قضية رقم ٤٤٢/٢٠٢٤</span>
            <span>/</span>
            <span className="text-xs text-variable-collection-primary-color font-bold">
              سجل الجلسات
            </span>
          </div>
          <h2 className="text-gray-900 text-xl font-bold">الجلسات</h2>
        </div>

        <button
          type="button"
          onClick={() => setIsAddHearingOpen(true)}
          className="flex items-center px-6 py-3 gap-2 bg-variable-collection-primary-color text-white rounded-xl"
        >
          <Plus size={18} /> إضافة جلسة
        </button>
      </div>

      <AddHearing
        isOpen={isAddHearingOpen}
        caseId={id}
        onClose={() => setIsAddHearingOpen(false)}
      />

      <HearingsList hearings={data?.data?.data ?? []} />
    </div>
  );
}
