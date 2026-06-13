import { useState } from "react";
import { validateOfferForm } from "../helpers/validation";
import { initialForm } from "../helpers/constants";

export const useOfferForm = () => {
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

  const validate = (requestId) => {
    const validationErrors = validateOfferForm({
      form,
      file,
      requestId,
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
