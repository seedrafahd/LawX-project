import { useState } from "react";
import StepNavigation from "./StepNavigation";
import PaymentsIcon from "@mui/icons-material/Payments";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import RemoveCircleOutlineOutlinedIcon from "@mui/icons-material/RemoveCircleOutlineOutlined";
import StepHeader from "./StepHeader";
import SharedField from "../../../../shared/components/SharedFeild";
import { PAYMENT_TYPE_OPTIONS } from "../../helpers/constants";

export default function PaymentTypeStep({
  formData,
  setFormData,
  onNext,
  onBack,
}) {
  const [active, setActive] = useState(formData.billing_type);
  const [milestoneInput, setMilestoneInput] = useState({
    title: "",
    amount: "",
    due_date: "",
  });

  const handleClick = (option) => {
    setActive(option.id);
    setFormData("billing_type", option.id);
  };

  const addMilestone = () => {
    if (!milestoneInput.title.trim() || !milestoneInput.amount) return;
    const newMilestone = {
      title: milestoneInput.title.trim(),
      amount: parseFloat(milestoneInput.amount),
      due_date: milestoneInput.due_date,
    };
    const updated = [...(formData.payment_milestones || []), newMilestone];
    setFormData("payment_milestones", updated);
    setMilestoneInput({ title: "", amount: "", due_date: "" });
  };

  const removeMilestone = (index) => {
    const updated = formData.payment_milestones.filter((_, i) => i !== index);
    setFormData("payment_milestones", updated);
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-white rounded-2xl">
      {/* Header */}
      <StepHeader icon={<PaymentsIcon />} title="خطة الدفع" />

      {/* Cards */}
      <div className="grid grid-cols-3 max-w-xl mx-auto gap-[10px] pt-[14px] pb-[22px]">
        {PAYMENT_TYPE_OPTIONS.map((option) => {
          const isActive = active === option.id;

          return (
            <button
              key={option.id}
              onClick={() => handleClick(option)}
              className={`flex flex-col items-center justify-center sm:min-h-[80px] md:min-h-[100px] px-4 pt-[10px] pb-1
                 rounded-2xl border transition-all duration-200 shadow-[0_0_4px_rgba(0,0,0,0.15)]
                ${
                  isActive
                    ? "bg-variable-collection-primary-color/10 border-variable-collection-primary-color "
                    : "bg-white border-gray-200 hover:shadow-md"
                }
              `}
            >
              <div
                className={`${isActive ? "text-variable-collection-primary-color" : "text-gray-500"}`}
              >
                {option.icon}
              </div>
              <span className="text-lg font-bold ">{option.label}</span>
            </button>
          );
        })}
      </div>

      {active === "percentage_collection" && (
        <div className="px-6">
          <SharedField label="قيمة النسبة">
            <input
              type="number"
              min={0}
              placeholder="30% مثلاً"
              value={formData.collection_percentage}
              onChange={(e) =>
                setFormData("collection_percentage", e.target.value)
              }
              className="h-12 w-full rounded-lg border border-gray-300 bg-gray-50 px-4 pl-11 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-[#40558C]"
            />
          </SharedField>
        </div>
      )}

      {active === "installments" && (
        <div className="px-6 pb-4 space-y-3">
          <div className="grid grid-cols-3 gap-3">
            <input
              type="text"
              placeholder="عنوان الدفعة"
              value={milestoneInput.title}
              onChange={(e) =>
                setMilestoneInput({ ...milestoneInput, title: e.target.value })
              }
              className="h-12 rounded-lg border border-gray-300 bg-gray-50 px-4 text-sm outline-none focus:border-[#40558C]"
            />
            <input
              type="number"
              min={0}
              placeholder="المبلغ"
              value={milestoneInput.amount}
              onChange={(e) =>
                setMilestoneInput({ ...milestoneInput, amount: e.target.value })
              }
              className="h-12 rounded-lg border border-gray-300 bg-gray-50 px-4 text-sm outline-none focus:border-[#40558C]"
            />
            <input
              type="date"
              value={milestoneInput.due_date}
              onChange={(e) =>
                setMilestoneInput({
                  ...milestoneInput,
                  due_date: e.target.value,
                })
              }
              className="h-12 rounded-lg border border-gray-300 bg-gray-50 px-4 text-sm outline-none focus:border-[#40558C]"
            />
          </div>

          <button
            onClick={addMilestone}
            disabled={
              !milestoneInput.title.trim() ||
              !milestoneInput.amount ||
              !milestoneInput.due_date
            }
            className="flex items-center gap-1 text-sm text-[#40558C] font-medium disabled:opacity-40"
          >
            <AddCircleOutlineOutlinedIcon fontSize="small" />
            إضافة دفعة
          </button>

          {formData.payment_milestones?.length > 0 && (
            <div className="space-y-2 pt-2 border-t">
              {formData.payment_milestones.map((m, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between bg-gray-50 rounded-lg px-3 py-2"
                >
                  <div className="text-sm">
                    <p className="font-medium text-gray-700">{m.title}</p>
                    <p className="text-xs text-gray-500">
                      {m.amount?.toLocaleString()} ريال
                      {m.due_date && ` • ${m.due_date}`}
                    </p>
                  </div>
                  <button onClick={() => removeMilestone(i)}>
                    <RemoveCircleOutlineOutlinedIcon className="text-red-500 text-lg" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Navigation */}
      <StepNavigation
        onNext={onNext}
        onBack={onBack}
        disableNext={
          !formData.billing_type ||
          (active === "percentage_collection" &&
            !formData.collection_percentage) ||
          (active === "installments" && !formData.payment_milestones.length)
        }
      />
    </div>
  );
}
