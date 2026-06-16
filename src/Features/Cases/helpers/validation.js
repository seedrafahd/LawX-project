export function validateCaseForm({ form, isAdmin }) {
  const errors = {};

  if (!form.title || form.title.trim().length < 5) {
    errors.title = " يجب أن يكون العنوان 5 أحرف على الأقل";
  }

  if (!form.case_number || form.case_number.trim().length < 3) {
    errors.case_number = " يجب أن يكون رقم القضية 3 أرقام على الأقل";
  }

  if (!form.description || form.description.trim().length < 10) {
    errors.description = " يجب أن يكون الوصف 10 أحرف على الأقل";
  }

  if (!form.price || form.price < 0) {
    errors.price = " يجب أن يكون السعر صحيح أكبر من الصفر";
  }

  if (!form.court || form.court.trim().length < 3) {
    errors.court = "يجب أن تكون المحكمة 3 أحرف على الأقل";
  }

  if (!form.lead_lawyer_id) {
    errors.lead_lawyer_id = "حدد المحامي المسؤول";
  }

  if (isAdmin && (!form.team || form.team.length === 0)) {
    errors.team = "حدد الفريق المسؤول";
  }

  return errors;
}
