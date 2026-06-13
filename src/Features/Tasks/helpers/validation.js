import { isBeforeToday } from "../../../shared/helpers/validation";

export const validateTaskForm = (form) => {
  const errors = {};

  if (!form.title || form.title.trim().length < 3) {
    errors.title = "يجب أن يكون العنوان 3 أحرف على الأقل";
  }
  if (!form.description || form.description.trim().length < 10) {
    errors.description = "يجب أن يكون الوصف 10 أحرف على الأقل";
  }

  if (!form.due_date) {
    errors.due_date = "هذا الحقل مطلوب";
  } else if (isBeforeToday(form.due_date)) {
    errors.due_date = "يجب أن يكون التاريخ اليوم أو بعده";
  }

  if (!form.assigned_to) {
    errors.assigned_to = "هذا الحقل مطلوب";
  }
  return errors;
};
