export function validateRegisterForm({ form }) {
  const errors = {};

  if (!form.email.trim()) {
    errors.email = "قم بإدخال البريد الالكتروني";
  }

  if (!form.password || form.password.trim().length < 8) {
    errors.password = " يجب أن تكون كلمة المرور 8 محارف على الأقل";
  }

  if (
    !form.password_confirmation.trim() ||
    form.password_confirmation.trim() !== form.password
  ) {
    errors.password_confirmation = " تأكيد كلمة المرور غير متطابق";
  }

  if (!form.phone_number.trim() || form.phone_number.trim().length < 10) {
    errors.phone_number = " يجب أن يكون رقم الهاتف 10 أرقام على الأقل";
  }

  return errors;
}
