import { useState } from "react";
import { initialForm } from "../helpers/constants";
import { validateInvoiceForm } from "../helpers/validation";

export const useInvoicForm = () => {
  const [form, setForm] = useState(initialForm);

  const [errors, setErrors] = useState({});

  const [file, setFile] = useState(null);

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

  const validate = (case_id) => {
    const validationErrors = validateInvoiceForm({
      form,
      file,
      case_id,
    });

    setErrors(validationErrors);

    return !Object.keys(validationErrors).length;
  };

  return {
    form,
    errors,
    file,
    setFile,
    updateField,
    validate,
  };
};
