import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { initialForm } from "../helpers/constants";
import { useCreateLawyer, useEditLawyer } from "./useLawyers";
import { validateLawyerForm } from "../helpers/validation";

// const toInputDate = (dateStr) => {
//   if (!dateStr) return "";
//   const parts = dateStr.split("/");
//   if (parts.length === 3) return `${parts[2]}-${parts[1]}-${parts[0]}`;
//   return dateStr;
// };

export const useLawyerForm = (lawyer, isEditMode) => {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});

  const { mutate: createLawyer, isPending: isCreating } = useCreateLawyer();
  const { mutate: editLaw, isPending: isEditing } = useEditLawyer();
  const isPending = isCreating || isEditing;

  useEffect(() => {
    if (isEditMode && lawyer) {
      setForm({
        national_id: lawyer.national_id || "",
        full_name: lawyer.full_name || "",
        father_name: lawyer.father_name || "",
        mother_name: lawyer.mother_name || "",
        mother_family_name: lawyer.mother_family_name || "",
        birth_place: lawyer.birth_place || "",
        birth_date: lawyer.birth_date || "",
        civil_registry_number: lawyer.civil_registry_number || "",
        syndicate_card_number: lawyer.syndicate_card_number || "",
        syndicate_branch: lawyer.syndicate_branch || "",
        lawyer_state: lawyer.lawyer_state || "trainee",
      });
    }
  }, [isEditMode, lawyer]);

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

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isPending) return;
    const validationErrors = validateLawyerForm(form);

    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }
    const payload = {
      national_id: form.national_id.trim(),
      full_name: form.full_name.trim(),
      father_name: form.father_name.trim(),
      mother_name: form.mother_name.trim(),
      mother_family_name: form.mother_family_name.trim(),
      birth_place: form.birth_place.trim(),
      birth_date: form.birth_date,
      civil_registry_number: form.civil_registry_number.trim(),
      syndicate_card_number: form.syndicate_card_number.trim(),
      syndicate_branch: form.syndicate_branch.trim(),
      lawyer_state: form.lawyer_state,
    };

    if (isEditMode) {
      // payload.lawyer_id = lawyer.id;
      editLaw(
        { data: payload, lawyer_id: lawyer.id },
        {
          onSuccess: (data) => {
            const updated = data?.data?.lawyer ?? data?.data;
            navigate(`/lawyers/lawyer_details/${lawyer.id}`, {
              replace: true,
              state: {
                lawyerData:
                  updated && typeof updated === "object"
                    ? { ...lawyer, ...updated }
                    : { ...lawyer, ...payload },
              },
            });
          },
        },
      );
    } else {
      createLawyer(payload, {
        onSuccess: () => window.history.back(),
      });
    }
  };

  return {
    form,
    errors,
    updateField,
    submit: handleSubmit,
    isPending,
  };
};
