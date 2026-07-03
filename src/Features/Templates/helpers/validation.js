export const validateTemplateForm = ({ form, file, isEditMode }) => {
  const errors = {};

  if (!form.title?.trim()) {
    errors.title = "أدخل عنوان القالب";
  }

  if (!form.category?.trim()) {
    errors.category = "حدد فئة القالب";
  }

  if (!form.template_desc?.trim()) {
    errors.template_desc = "أدخل وصف القالب";
  }

  if (!file && !isEditMode) {
    errors.file = "ارفع ملف القالب";
  }

  return errors;
};
