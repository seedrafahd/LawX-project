export const validateLawForm = (form) => {
  const errors = {};

  if (!form.number) {
    errors.number = "أدخل رقم القانون";
  }

  if (!form.title?.trim()) {
    errors.title = "أدخل عنوان القانون";
  }

  if (!form.country?.trim()) {
    errors.country = "أدخل بلد القانون";
  }

  if (!form.effective_date?.trim()) {
    errors.effective_date = "حدد تاريخ القانون";
  }

  if (!form.category?.trim()) {
    errors.category = "حدد فئة القانون";
  }

  if (!form.content?.trim()) {
    errors.content = "أدخل محتوى القانون";
  }

  return errors;
};
