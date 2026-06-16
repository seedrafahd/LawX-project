import { MapPin } from "lucide-react";
import GavelOutlinedIcon from "@mui/icons-material/GavelOutlined";
import SuccessModal from "../../../shared/components/SuccessModal";
import SharedField from "../../../shared/components/SharedFeild";
import SharedModal from "../../../shared/components/SharedModal";
import Loader from "../../../shared/components/Loading";
import { useHearingForm } from "../hooks/useHearingForm";

export default function AddHearing({
  isOpen,
  caseId,
  onClose,
  selectedHearing,
}) {
  const {
    form,
    errors,
    isSuccess,
    isPending,
    isEditMode,
    updateField,
    handleSubmit,
    closeModal,
  } = useHearingForm(caseId, onClose, selectedHearing);

  if (!isOpen) return null;

  const handleDone = () => {
    closeModal();
  };

  if (isSuccess) {
    return (
      <SuccessModal
        onDone={handleDone}
        title="تم بنجاح"
        description={
          isEditMode
            ? "تم تعديل الجلسة بنجاح"
            : "تمت إضافة الجلسة بنجاح وتحديث ملف القضية"
        }
        notice={isEditMode ? "" : "تم إخبار الموكل آلياً بالجلسة الجديدة"}
      />
    );
  }

  return (
    <SharedModal
      isOpen={isOpen}
      title={isEditMode ? "تعديل الجلسة" : "إضافة جلسة جديدة"}
      description={
        isEditMode
          ? "قم بتعديل تفاصيل الجلسة"
          : "سجل تفاصيل الموعد القضائي القادم بدقة"
      }
      titleId="add-hearing-title"
      icon={<GavelOutlinedIcon />}
      onClose={closeModal}
      onSecondaryClick={closeModal}
      primaryLabel={isEditMode ? "حفظ التعديلات" : "حفظ الجلسة"}
      secondaryLabel="إلغاء"
      primaryType="submit"
      onPrimaryClick={handleSubmit}
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
                value={form.date}
                onChange={(event) => updateField("date", event.target.value)}
                className="hearing-date-input h-12 w-full rounded-lg border border-gray-300 bg-gray-50 px-4 pl-11 text-center text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-[#40558C]"
              />
            </SharedField>

            <SharedField label="وقت الجلسة" error={errors.time}>
              <input
                type="time"
                lang="en-CA"
                value={form.time}
                onChange={(event) => updateField("time", event.target.value)}
                className="hearing-date-input h-12 w-full rounded-lg border border-gray-300 bg-gray-50 px-4 pl-11 text-center text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-[#40558C]"
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
                  className="h-12 w-full rounded-lg border border-gray-300 bg-gray-50 px-4 pl-11 text-right text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-[#40558C]"
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
