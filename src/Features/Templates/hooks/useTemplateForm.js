import { useState, useEffect } from "react";
import { initialForm } from "../helpers/constants";
import { useCreateTemplate, useEditTemplate } from "./useTemplates";
import { validateTemplateForm } from "../helpers/validation";
import { useNavigate, useParams } from "react-router-dom";

export const useTemplateForm = ({ editTemplate }) => {
  console.log("editTemplate", editTemplate);
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);
  const [form, setForm] = useState(initialForm);
  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSuccess, setIsSuccess] = useState(false);
  const { mutate: createTemplate, isPending: isCreatePending } =
    useCreateTemplate();
  const { mutate: editTemplateMutate, isPending: isEditPending } =
    useEditTemplate();

  const isPending = isCreatePending || isEditPending;

  useEffect(() => {
    if (editTemplate) {
      setForm({
        title: editTemplate.Template_name || "",
        category: editTemplate.Template_category || "",
        template_desc: editTemplate.Template_description || "",
        file: {
          name: editTemplate.Template_file,
          size: editTemplate.template_file_size,
          url: editTemplate.Template_file,
        },
      });
    }

    setErrors({});
  }, [editTemplate]);

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
    setIsSuccess(false);
    setForm(initialForm);
    setErrors({});
    setFile(null);
    if (id) {
      navigate(`/templates/template_details/${id}`, { replace: true });
    } else navigate("/templates", { replace: true });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isPending) return;

    const validationErrors = validateTemplateForm({ form, file, isEditMode });

    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    const payload = new FormData();
    payload.append("title", form.title);
    payload.append("category", form.category);

    if (isEditMode) {
      payload.append("template_id", id);
      payload.append("template_description", form.template_desc);
      if (file) {
        payload.append("file", file);
      }
      editTemplateMutate(payload, {
        onSuccess: () => {
          setIsSuccess(true);
          setForm(initialForm);
        },
      });
    } else {
      payload.append("template_desc", form.template_desc);
      payload.append("file", file);
      createTemplate(payload, {
        onSuccess: () => {
          setIsSuccess(true);
          setForm(initialForm);
        },
      });
    }
  };

  return {
    form,
    file,
    errors,
    isSuccess,
    isPending,
    isEditMode,
    setFile,
    setErrors,
    updateField,
    closeModal,
    handleSubmit,
  };
};
