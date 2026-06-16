import { useEffect, useState } from "react";
import { useCreateHearing, useUpdateHearing } from "./useHearings";
import { initialForm } from "../helpers/constants";
import { validateHearingForm } from "../helpers/validation";
import { getDate, getTime } from "../../../shared/helpers/date";

export const useHearingForm = (caseId, onClose, editHearing) => {
  const isEditMode = !!editHearing;
  const [isSuccess, setIsSuccess] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const { mutate: createHearing, isPending: isCreating } = useCreateHearing();
  const { mutate: updateHearing, isPending: isUpdating } = useUpdateHearing();
  const isPending = isCreating || isUpdating;

  useEffect(() => {
    if (editHearing) {
      setForm({
        date: getDate(editHearing.date) || "",
        time: getTime(editHearing.date) || "",
        location: editHearing.location || "",
        nots: editHearing.nots || "",
      });
    } else {
      setForm(initialForm);
    }
    setErrors({});
  }, [editHearing]);

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

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isPending) return;
    const validationErrors = validateHearingForm(form, isEditMode);

    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }
    const payload = {
      case_id: caseId,
      session_id: editHearing?.session_id,
      date: `${form.date + " " + form.time}`,
      location: form.location.trim(),
      nots: form.nots.trim(),
    };

    if (isEditMode) {
      updateHearing(payload, { onSuccess: () => setIsSuccess(true) });
    } else {
      createHearing(payload, { onSuccess: () => setIsSuccess(true) });
    }
  };

  return {
    form,
    errors,
    isSuccess,
    isPending,
    isEditMode,
    updateField,
    handleSubmit,
    closeModal,
  };
};
