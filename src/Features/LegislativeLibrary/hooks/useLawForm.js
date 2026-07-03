import { useState, useEffect } from "react";
import { initialForm } from "../helpers/constants";
import { validateLawForm } from "../helpers/validation";
import { useCreateLaw, useEditLaw } from "./useLaws";
import { useNavigate } from "react-router-dom";

const toInputDate = (dateStr) => {
  if (!dateStr) return "";
  const parts = dateStr.split("/");
  if (parts.length === 3) return `${parts[2]}-${parts[1]}-${parts[0]}`;
  return dateStr;
};

export const useLawForm = (law, isEditMode) => {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});

  const { mutate: createLaw, isPending: isCreating } = useCreateLaw();
  const { mutate: editLaw, isPending: isEditing } = useEditLaw();
  const isPending = isCreating || isEditing;

  useEffect(() => {
    if (isEditMode && law) {
      const categoryId = law.category?.id || "";
      const relatedIds =
        law.related_legislation_ids ||
        law.related_legislations?.map((r) => r.id || r) ||
        [];
      setForm({
        title: law.title || "",
        number: law.law_number || "",
        effective_date: toInputDate(law.publish_date) || "",
        category: categoryId,
        country: law.country || "",
        content: law.content || "",
        status: law.status || "active",
        book: law.book || "",
        part: law.part || "",
        chapter: law.chapter || "",
        related_legislation_ids: relatedIds,
        articles: law.articles || [],
      });
    }
  }, [isEditMode, law]);

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

  const addArticle = () => {
    const nextIndex = form.articles.length + 1;
    setForm((prev) => ({
      ...prev,
      articles: [
        ...prev.articles,
        { title: `المادة ${nextIndex}`, content: "" },
      ],
    }));
  };

  const removeArticle = (index) => {
    setForm((prev) => ({
      ...prev,
      articles: prev.articles.filter((_, i) => i !== index),
    }));
  };

  const updateArticle = (index, field, value) => {
    setForm((prev) => ({
      ...prev,
      articles: prev.articles.map((article, i) =>
        i === index ? { ...article, [field]: value } : article,
      ),
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isPending) return;
    const validationErrors = validateLawForm(form);

    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }
    const payload = {
      title: form.title.trim(),
      content: form.content.trim(),
      effective_date: form.effective_date,
      law_number: form.number.trim(),
      country: form.country.trim(),
      category_id: form.category,
      status: form.status,
      related_legislation_ids: form.related_legislation_ids,
      book: form.book,
      part: form.part,
      chapter: form.chapter,
      articles: form.articles,
    };

    if (isEditMode) {
      payload.law_id = law.id;
      editLaw(payload, {
        onSuccess: () => navigate("/laws"),
      });
    } else {
      createLaw(payload, {
        onSuccess: () => navigate("/laws"),
      });
    }
  };

  return {
    form,
    errors,
    updateField,
    addArticle,
    removeArticle,
    updateArticle,
    submit: handleSubmit,
    isPending,
  };
};
