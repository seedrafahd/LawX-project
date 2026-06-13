import { useState } from "react";
import { INITIAL_CASES_FORM } from "../helpers/constants";
import { useCreateCase } from "./useCases";
import { useNavigate } from "react-router-dom";
import { validateCaseForm } from "../helpers/validation";

export const useCaseForm = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState(INITIAL_CASES_FORM);
  const [errors, setErrors] = useState({});
  const { mutate: createCase, isPending } = useCreateCase();

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

  const closeModal = () => {
    navigate("/cases");
    setForm(INITIAL_CASES_FORM);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isPending) return;

    const validationErrors = validateCaseForm(form);

    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    const payload = { ...form };
    if (payload.billing_type === "installments") {
      delete payload.collection_percentage;
    } else if (payload.billing_type === "percentage_collection") {
      delete payload.payment_milestones;
    } else if (payload.billing_type === "fixed_proposal") {
      delete payload.payment_milestones;
      delete payload.collection_percentage;
    }
    createCase(payload, {
      onSuccess: () => {
        closeModal();
      },
    });
  };

  return {
    form,
    errors,
    isPending,
    updateField,
    handleSubmit,
    closeModal,
  };
};
