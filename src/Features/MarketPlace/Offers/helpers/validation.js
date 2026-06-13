import { CURRENCY_OPTIONS } from "../../../../shared/Constants/currencyOptions";
import { isBeforeToday } from "../../../../shared/helpers/validation";

export const validateOfferForm = ({ form, file, requestId }) => {
  const errors = {};

  const normalizedPrice = Number(form.price);

  if (!requestId) {
    errors.form = "لا يمكن إرسال العرض بدون رقم الطلب";
  }

  if (!form.price || Number.isNaN(normalizedPrice) || normalizedPrice <= 0) {
    errors.price = "أدخل سعراً صحيحاً أكبر من الصفر";
  }

  if (!CURRENCY_OPTIONS.includes(form.price_currency)) {
    errors.price_currency = "اختر عملة صحيحة";
  }

  if (!form.estimated_days) {
    errors.estimated_days = "اختر المدة المتوقعة";
  }

  if (!form.message_for_client?.trim()) {
    errors.message_for_client = "اكتب وصف العرض";
  }

  if (!form.valid_until?.trim()) {
    errors.valid_until = "حدد المدة المتاحة للعرض";
  }
  if (isBeforeToday(form.valid_until)) {
    errors.valid_until = "يجب أن يكون التاريخ اليوم أو بعده";
  }

  if (!form.payment_terms?.trim()) {
    errors.payment_terms = "حدد شروط الدفع";
  }

  if (file && file.size > 4 * 1024 * 1024) {
    errors.file = "حجم الملف يجب ألا يتجاوز 4MB";
  }

  return errors;
};
