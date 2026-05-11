import { useState } from "react";
import { MapPin } from "lucide-react";
import GavelOutlinedIcon from "@mui/icons-material/GavelOutlined";
import toast from "react-hot-toast";
import SuccessModal from "../../../shared/Components/SuccessModal";
import SharedField from "../../../shared/Components/SharedFeild";
import SharedModal from "../../../shared/Components/SharedModal";
import { useCreateHearing } from "../Hooks/useHearings";
import Loader from "../../../shared/Components/Loading";

const initialForm = {
  case_id: "",
  date: "",
  location: "",
  nots: "",
};

export default function AddHearing({ isOpen, caseId, onClose }) {
  const [isSuccess, setIsSuccess] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const { mutate: createHearing, isPending } = useCreateHearing();

  if (!isOpen) return null;

  const updateField = (field, value) => {
    setForm((currentForm) => ({
      ...currentForm,
      [field]: value,
    }));
    setErrors((currentErrors) => ({
      ...currentErrors,
      [field]: "",
    }));
  };

  const closeModal = () => {
    setIsSuccess(false);
    setForm(initialForm);
    setErrors({});
    onClose?.();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isPending) return;

    if (!form.date || !form.location.trim() || !form.nots?.trim()) {
      setErrors((currentErrors) => ({
        ...currentErrors,
        date: !form.date ? "هذا الحقل مطلوب" : "",
        location: !form.location.trim() ? "هذا الحقل مطلوب" : "",
        nots: !form.nots.trim() ? "هذا الحقل مطلوب" : "",
      }));
      return;
    }

    if (isBeforeToday(form.date)) {
      setErrors((currentErrors) => ({
        ...currentErrors,
        date: "يجب أن يكون التاريخ اليوم أو بعده",
      }));
      return;
    }

    try {
      await createHearing({
        case_id: caseId,
        date: form.date,
        location: form.location.trim(),
        nots: form.nots.trim(),
      });

      setIsSuccess(true);
    } catch (error) {
      toast.error(error.message);
    }
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
          description="تمت إضافة الجلسة بنجاح وتحديث ملف القضية"
          notice="تم إخبار الموكل آلياً بالجلسة الجديدة"
        />
      </div>
    );
  }

  return (
    <SharedModal
      isOpen={isOpen}
      title="إضافة جلسة جديدة"
      description="سجل تفاصيل الموعد القضائي القادم بدقة"
      titleId="add-hearing-title"
      icon={<GavelOutlinedIcon />}
      onClose={closeModal}
      secondaryLabel="إلغاء"
      onSecondaryClick={closeModal}
      primaryLabel={isPending ? "جاري الحفظ..." : "حفظ الجلسة"}
      primaryType="submit"
      primaryForm="add-hearing-form"
    >
      {isPending && <Loader />}
      <form id="add-hearing-form" onSubmit={handleSubmit} className="pb-4">
        <div className="space-y-6 p-8">
          <div className="grid gap-6 sm:grid-cols-2">
            <SharedField label="تاريخ الجلسة" error={errors.date}>
              <input
                type="date"
                lang="en-CA"
                dir="ltr"
                value={form.date}
                onChange={(event) => updateField("date", event.target.value)}
                className="hearing-date-input h-12 w-full rounded-lg border border-gray-300 bg-gray-50 px-4 pl-11 text-center text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-[#40558C] focus:bg-white focus:ring-2 focus:ring-[#40558C]/10"
              />
            </SharedField>

            <SharedField label="مكان الجلسة" error={errors.location}>
              <InputWithIcon icon={<MapPin size={18} />}>
                <input
                  type="text"
                  value={form.location}
                  onChange={(event) =>
                    updateField("location", event.target.value)
                  }
                  placeholder="اسم المحكمة أو الموقع"
                  className="h-12 w-full rounded-lg border border-gray-300 bg-gray-50 px-4 pl-11 text-right text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-[#40558C] focus:bg-white focus:ring-2 focus:ring-[#40558C]/10"
                />
              </InputWithIcon>
            </SharedField>
          </div>

          <SharedField label="ملاحظات" error={errors.nots}>
            <textarea
              rows={4}
              value={form.nots}
              onChange={(event) => updateField("nots", event.target.value)}
              placeholder="أدخل أي ملاحظات إضافية حول الجلسة..."
              className="w-full resize-none rounded-lg border-0 bg-gray-100 px-5 py-4 text-right text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:bg-white focus:ring-2 focus:ring-[#40558C]/15"
            />
          </SharedField>
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

// function buildHearingPayload(form, caseId) {
//   return {
//     case_id: caseId,
//     date: form.date,
//     location: form.location.trim(),
//     nots: form.nots.trim(),
//   };
// }

function InputWithIcon({ icon, children }) {
  return (
    <div className="relative">
      <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-300">
        {icon}
      </span>
      {children}
    </div>
  );
}
