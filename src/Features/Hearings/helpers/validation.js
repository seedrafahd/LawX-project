import { isBeforeToday } from "../../../shared/helpers/validation";

export function validateHearingForm(form, isEditMode) {
  const errors = {};

  if (!form.date) {
    errors.date = "هذا الحقل مطلوب";
  } else if (isBeforeToday(form.date)) {
    errors.date = "يجب أن يكون التاريخ اليوم أو بعده";
  }

  if (!form.time) {
    errors.time = "هذا الحقل مطلوب";
  }

  if (!form.location.trim()) {
    errors.location = "هذا الحقل مطلوب";
  }

  if (!form.nots.trim()) {
    errors.nots = "هذا الحقل مطلوب";
  }

  return errors;
}
