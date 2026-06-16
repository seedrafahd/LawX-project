import { useState } from "react";
import StarIcon from "@mui/icons-material/Star";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import RemoveCircleOutlineOutlinedIcon from "@mui/icons-material/RemoveCircleOutlineOutlined";
import SharedField from "../../../shared/components/SharedFeild";
import SharedModal from "../../../shared/components/SharedModal";
import { PAYMENT_TYPE_OPTIONS } from "../helpers/constants";

export default function EditCaseModal({
  isOpen,
  setEditOpen,
  editTask,
  handleEditSubmit,
  errors,
  updateField,
  form,
}) {
  const [milestoneInput, setMilestoneInput] = useState({
    title: "",
    amount: "",
    due_date: "",
  });

  const addMilestone = () => {
    if (!milestoneInput.title.trim() || !milestoneInput.amount) return;
    const newMilestone = {
      title: milestoneInput.title.trim(),
      amount: parseFloat(milestoneInput.amount),
      due_date: milestoneInput.due_date,
    };
    const updated = [...(form.payment_milestones || []), newMilestone];
    updateField("payment_milestones", updated);
    setMilestoneInput({ title: "", amount: "", due_date: "" });
  };

  const removeMilestone = (index) => {
    const updated = form.payment_milestones.filter((_, i) => i !== index);
    updateField("payment_milestones", updated);
  };

  const [opponentInput, setOpponentInput] = useState({
    name: "",
    type: "individual",
    national_id: "",
    phone: "",
  });

  const addOpponent = () => {
    if (!opponentInput.name.trim()) return;
    const newOpponent = { ...opponentInput, name: opponentInput.name.trim() };
    const updated = [...(form.opponents || []), newOpponent];
    updateField("opponents", updated);
    setOpponentInput({
      name: "",
      type: "individual",
      national_id: "",
      phone: "",
    });
  };

  const removeOpponent = (index) => {
    const updated = form.opponents.filter((_, i) => i !== index);
    updateField("opponents", updated);
  };

  return (
    <SharedModal
      isOpen={isOpen}
      title="تعديل القضية"
      description="قم بتعديل تفاصيل القضية"
      titleId="edit-case-title"
      onClose={() => setEditOpen(false)}
      onSecondaryClick={() => setEditOpen(false)}
      primaryLabel="حفظ التعديلات"
      secondaryLabel="إلغاء"
      primaryType="submit"
      onPrimaryClick={handleEditSubmit}
      primaryForm="edit-case-form"
    >
      <form id="edit-case-form" onSubmit={handleEditSubmit} className="pb-4">
        <div className="space-y-6 p-8">
          <div className="grid grid-cols-2 gap-3">
            <SharedField label="عنوان القضية" error={errors.title}>
              <input
                type="text"
                value={form.title}
                onChange={(e) => updateField("title", e.target.value)}
                placeholder="أدخل عنوان القضية"
                className="h-12 w-full rounded-lg border border-gray-300 bg-gray-50 px-4 text-right text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-[#40558C] focus:bg-white focus:ring-2 focus:ring-[#40558C]/10"
              />
            </SharedField>

            {/* Price */}
            <SharedField label="سعر القضية" error={errors.price}>
              <input
                type="number"
                min={0}
                placeholder="00.0"
                value={form.price}
                onChange={(e) => updateField("price", e.target.value)}
                className="h-12 w-full rounded-lg border border-gray-300 bg-gray-50 px-4 pl-11 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-[#40558C]"
              />
            </SharedField>

            {/* Type */}
            <SharedField label="نوع القضية">
              <select
                value={form.case_category}
                onChange={(e) => updateField("case_category", e.target.value)}
                className="h-12 w-full rounded-lg border border-gray-300 bg-gray-50 px-4 pl-11 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-[#40558C]"
              >
                <option value="">اختر</option>
                <option value="عقارية">عقارية</option>
                <option value="تجارية">تجارية</option>
              </select>
            </SharedField>

            <SharedField label="المحكمة">
              <input
                type="text"
                value={form.court}
                onChange={(e) => updateField("court", e.target.value)}
                placeholder="اسم المحكمة"
                className="h-12 w-full rounded-lg border border-gray-300 bg-gray-50 px-4 text-right text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-[#40558C] focus:bg-white focus:ring-2 focus:ring-[#40558C]/10"
              />
            </SharedField>

            <SharedField label="خطة الدفع">
              <select
                value={form.billing_type}
                onChange={(e) => updateField("billing_type", e.target.value)}
                className="h-12 w-full rounded-lg border border-gray-300 bg-gray-50 px-4 pl-11 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-[#40558C]"
              >
                {PAYMENT_TYPE_OPTIONS.map((option) => {
                  return (
                    <option key={option.id} value={option.id}>
                      {option.label}
                    </option>
                  );
                })}
              </select>
            </SharedField>
          </div>

          {form.billing_type === "percentage_collection" && (
            <SharedField label="قيمة النسبة">
              <input
                type="number"
                min={0}
                placeholder="30% مثلاً"
                value={form.collection_percentage}
                onChange={(e) =>
                  updateField("collection_percentage", e.target.value)
                }
                className="h-12 w-full rounded-lg border border-gray-300 bg-gray-50 px-4 pl-11 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-[#40558C]"
              />
            </SharedField>
          )}

          {form.billing_type === "installments" && (
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-3">
                <input
                  type="text"
                  placeholder="عنوان الدفعة"
                  value={milestoneInput.title}
                  onChange={(e) =>
                    setMilestoneInput({
                      ...milestoneInput,
                      title: e.target.value,
                    })
                  }
                  className="h-12 rounded-lg border border-gray-300 bg-gray-50 px-4 text-sm outline-none focus:border-[#40558C]"
                />
                <input
                  type="number"
                  min={0}
                  placeholder="المبلغ"
                  value={milestoneInput.amount}
                  onChange={(e) =>
                    setMilestoneInput({
                      ...milestoneInput,
                      amount: e.target.value,
                    })
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
                  !milestoneInput.title.trim() || !milestoneInput.amount
                }
                className="flex items-center gap-1 text-sm text-[#40558C] font-medium disabled:opacity-40"
              >
                <AddCircleOutlineOutlinedIcon fontSize="small" />
                إضافة دفعة
              </button>

              {form.payment_milestones?.length > 0 && (
                <div className="space-y-2 pt-2 border-t">
                  {form.payment_milestones.map((m, i) => (
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

          <SharedField label="الوصف">
            <textarea
              rows={3}
              value={form.description}
              onChange={(e) => updateField("description", e.target.value)}
              placeholder="أدخل وصف القضية"
              className="w-full resize-none rounded-lg border-0 bg-gray-100 px-5 py-4 text-right text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:bg-white focus:ring-2 focus:ring-[#40558C]/15"
            />
          </SharedField>
        </div>

        {/* Opponents */}
        <div className="space-y-3 px-8">
          <label className="block text-sm text-gray-700">الخصوم</label>
          <div className="grid grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="اسم الخصم"
              value={opponentInput.name}
              onChange={(e) =>
                setOpponentInput({ ...opponentInput, name: e.target.value })
              }
              className="h-12 rounded-lg border border-gray-300 bg-gray-50 px-4 text-sm outline-none focus:border-[#40558C]"
            />
            <select
              value={opponentInput.type}
              onChange={(e) =>
                setOpponentInput({ ...opponentInput, type: e.target.value })
              }
              className="h-12 rounded-lg border border-gray-300 bg-gray-50 px-4 text-sm outline-none focus:border-[#40558C] bg-white"
            >
              <option value="individual">فرد</option>
              <option value="company">شركة</option>
              <option value="covernment_entity">جهة حكومية</option>
            </select>
            <input
              type="number"
              placeholder="رقم الهوية"
              value={opponentInput.national_id}
              onChange={(e) =>
                setOpponentInput({
                  ...opponentInput,
                  national_id: e.target.value,
                })
              }
              className="h-12 rounded-lg border border-gray-300 bg-gray-50 px-4 text-sm outline-none focus:border-[#40558C]"
            />
            <input
              type="number"
              placeholder="رقم الجوال"
              value={opponentInput.phone}
              onChange={(e) =>
                setOpponentInput({ ...opponentInput, phone: e.target.value })
              }
              className="h-12 rounded-lg border border-gray-300 bg-gray-50 px-4 text-sm outline-none focus:border-[#40558C]"
            />
          </div>

          <button
            onClick={addOpponent}
            disabled={!opponentInput.name.trim()}
            className="flex items-center gap-1 text-sm text-[#40558C] font-medium disabled:opacity-40"
          >
            <AddCircleOutlineOutlinedIcon fontSize="small" />
            إضافة الخصم
          </button>

          {form.opponents?.length > 0 && (
            <div className="space-y-2 pt-2 border-t">
              {form.opponents.map((opp, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between bg-gray-50 rounded-lg px-3 py-2"
                >
                  <div className="text-sm">
                    <p className="font-medium text-gray-700">{opp.name}</p>
                    <p className="text-xs text-gray-500">
                      {opp.type === "company"
                        ? "شركة"
                        : opp.type === "covernment_entity"
                          ? "جهة حكومية"
                          : "فرد"}
                      {opp.national_id && ` • ${opp.national_id}`}
                      {opp.phone && ` • ${opp.phone}`}
                    </p>
                  </div>
                  <button onClick={() => removeOpponent(i)}>
                    <RemoveCircleOutlineOutlinedIcon className="text-red-500 text-lg" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Star Rating */}
        <div className="flex justify-center flex-col gap-[10px] pr-6 pb-4">
          <label className="block text-sm text-gray-700">مستوى الصعوبة</label>
          <div className="flex  gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <StarIcon
                key={star}
                onClick={() => updateField("importance_stars", star)}
                className={`w-6 h-6 cursor-pointer transition ${
                  star <= form.importance_stars
                    ? "text-blue-900"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </form>
    </SharedModal>
  );
}
