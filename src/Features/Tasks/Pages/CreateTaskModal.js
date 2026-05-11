// AddTaskModal.tsx
import React, { useState } from "react";
import SharedModal from "../../../shared/Components/SharedModal";
import { useCreateTask } from "../Hooks/useTasks";
import toast from "react-hot-toast";
import SharedField from "../../../shared/Components/SharedFeild";
import SuccessModal from "../../../shared/Components/SuccessModal";
import Loader from "../../../shared/Components/Loading";
import { ChevronDown, Sparkles } from "lucide-react";

export default function AddTaskModal({ case_id, isOpen, onClose }) {
  const { mutate, isPending } = useCreateTask();
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    title: "",
    description: "",
    due_date: "",
    assigned_to: "",
  });
  const assigneds = [
    {
      id: "6276e097-a4cf-4d30-ac54-09c55cf4124a",
      name: "أحمد العلي",
    },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setForm({
      title: "",
      description: "",
      due_date: "",
      assigned_to: "",
    });
  };

  const closeModal = () => {
    setIsSuccess(false);
    resetForm();
    setErrors({});
    onClose?.();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isPending) return;

    if (
      !form.due_date ||
      !form.description.trim() ||
      !form.title?.trim() ||
      !form.assigned_to?.trim()
    ) {
      setErrors((currentErrors) => ({
        ...currentErrors,
        title: !form.title.trim() ? "هذا الحقل مطلوب" : "",
        description: !form.description.trim() ? "هذا الحقل مطلوب" : "",
        date: !form.due_date ? "هذا الحقل مطلوب" : "",
        assigned_to: !form.assigned_to.trim() ? "هذا الحقل مطلوب" : "",
      }));
      return;
    }

    if (isBeforeToday(form.due_date)) {
      setErrors((currentErrors) => ({
        ...currentErrors,
        date: "يجب أن يكون التاريخ اليوم أو بعده",
      }));
      return;
    }

    setErrors({});

    await mutate(
      {
        case_id: case_id,
        title: form.title.trim(),

        description: form.description.trim(),

        due_date: form.due_date,

        assigned_to: form.assigned_to,
      },

      {
        onError: (error) => {
          toast.error(error.message);
        },
      },
    );

    setIsSuccess(true);

    resetForm();
  };

  const handleDone = () => {
    closeModal();
  };

  if (isSuccess) {
    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-[#00000066] font-sans backdrop-blur-[6px]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="hearing-success-title"
      >
        <SuccessModal
          onDone={handleDone}
          title="تم بنجاح"
          description="تمت إضافة المهمة بنجاح وتحديث ملف القضية"
          notice="تم إخبار المسؤول آلياً بالمهمة الجديدة"
        />
      </div>
    );
  }

  return (
    <SharedModal
      isOpen={isOpen}
      title={" إضافة مهمة جديدة"}
      description={" قم بكتابة التفاصيل ثم تعيين مهمة قانونية للفريق"}
      titleId="document-upload-modal-title"
      onClose={closeModal}
      secondaryLabel="إلغاء"
      onSecondaryClick={closeModal}
      primaryLabel=" حفظ المهمة"
      onPrimaryClick={handleSubmit}
    >
      {isPending && <Loader />}
      <form onSubmit={handleSubmit} className="space-y-6 p-8">
        {/* Title */}
        <SharedField label=" عنوان المهمة" error={errors.title}>
          <input
            name="title"
            type="text"
            value={form.title}
            onChange={handleChange}
            placeholder="مثلاً: مراجعة العقد الابتدائي للموكل"
            className="h-16 w-full rounded-2xl border border-slate-200 bg-[#FAFAFC] px-5 text-base text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-300 focus:bg-white focus:ring-4 focus:ring-indigo-100 hover:border-slate-300"
          />
        </SharedField>

        {/* Description */}
        <SharedField label=" وصف المهمة" error={errors.description}>
          <textarea
            name="description"
            rows={5}
            value={form.description}
            onChange={handleChange}
            placeholder="اكتب تفاصيل المهمة والمتطلبات هنا..."
            className="w-full resize-none rounded-2xl border border-slate-200 bg-[#FAFAFC] px-5 py-4 text-base text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-300 focus:bg-white focus:ring-4 focus:ring-indigo-100 hover:border-slate-300"
          />
        </SharedField>

        {/* Row */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* Due Date */}
          <SharedField label=" تاريخ الاستحقاق" error={errors.date}>
            <div className="relative">
              <input
                name="due_date"
                type="date"
                value={form.due_date}
                onChange={handleChange}
                placeholder="mm/dd/yyyy"
                className="h-14 w-full rounded-2xl border border-slate-200 bg-[#FAFAFC] pr-2 pl-4 text-base text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-300 focus:bg-white focus:ring-4 focus:ring-indigo-100 hover:border-slate-300"
              />

            </div>
          </SharedField>

          {/* Assign Responsible */}
          <SharedField label=" تعيين المسؤول" error={errors.assigned_to}>
            <div className="relative">
              <select
                name="assigned_to"
                value={form.assigned_to}
                onChange={handleChange}
                className="h-14 w-full appearance-none rounded-2xl border border-slate-200 bg-[#FAFAFC] px-4 text-base text-slate-500 outline-none transition focus:border-indigo-300 focus:bg-white focus:ring-4 focus:ring-indigo-100 hover:border-slate-300"
              >
                <option value="" disabled>
                  اختر المسؤول
                </option>
                {assigneds.map((ass) => (
                  <option key={ass.id} value={ass.id}>
                    {ass.name}
                  </option>
                ))}
              </select>

              <ChevronDown
                size={20}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
              />
            </div>
          </SharedField>
        </div>

        {/* Info Box */}
        <div className="flex items-start gap-3 rounded-2xl border border-blue-100 bg-[#F5F8FF] px-4 py-4">
          <div className="mt-0.5">
            <Sparkles size={20} className="text-indigo-500" />
          </div>

          <p className="text-sm leading-7 text-slate-600">
            بناءً على تاريخ الاستحقاق، سيقوم النظام تلقائياً بتذكير المسؤول قبل
            24 ساعة من الموعد النهائي.
          </p>
        </div>
      </form>
    </SharedModal>
  );
}

function isBeforeToday(dateValue) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const selectedDate = new Date(`${dateValue}T00:00:00`);
  return selectedDate < today;
}
