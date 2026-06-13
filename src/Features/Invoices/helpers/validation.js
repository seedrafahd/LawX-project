import { isBeforeToday } from "../../../shared/helpers/validation";

export const validateInvoiceForm = ({ form, file, case_id }) => {
  const errors = {};

  if (!case_id) {
    errors.form = "لا يمكن إرسال الفاتورة بدون رقم القضية";
  }

  if (!form.due_date) {
    errors.due_date = "اختر تاريخ الاستحقاق";
  } else if (isBeforeToday(form.due_date)) {
    errors.due_date = "يجب أن يكون التاريخ اليوم أو بعده";
  }

  if (!form.items?.length) {
    errors.items = "يجب أن تضيف تفاصيل الفاتورة";
  }

  if (file && file.size > 4 * 1024 * 1024) {
    errors.file = "حجم الملف يجب ألا يتجاوز 4MB";
  }

  return errors;
};
