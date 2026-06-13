import { useEffect, useState } from "react";
import { initialForm } from "../helpers/constants";
import { validateTaskForm } from "../helpers/validation";
import { useCreateTask, useUpdateTask } from "./useTasks";
import { getDate } from "../../../shared/helpers/date";
import { useAuth } from "../../Auth/Hooks/useAuth";

export const useTaskForm = (case_id, onClose, editTask) => {
  const { user } = useAuth();
  const isEditMode = !!editTask;
  const [isSuccess, setIsSuccess] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});

  const { mutate: createTask, isPending: isCreating } = useCreateTask();
  const { mutate: updateTask, isPending: isUpdating } = useUpdateTask();
  const isPending = isCreating || isUpdating;

  useEffect(() => {
    if (editTask) {
      console.log(editTask);
      setForm({
        title: editTask.task_title || editTask.title || "",
        description: editTask.description || editTask.task_description || "",
        due_date: getDate(editTask.Due_date),
        assigned_to:
          typeof editTask.assigned_to === "object"
            ? editTask.assigned_to?.id || user.ID
            : editTask.assigned_to || editTask.assignee || "",
      });
    } else {
      setForm(initialForm);
    }
  }, [editTask]);

  const updateField = (e) => {
    const { name, value } = e.target;
    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));
    setErrors((currentErrors) => ({
      ...currentErrors,
      [name]: "",
    }));
  };
  const closeModal = () => {
    setIsSuccess(false);
    setForm(initialForm);
    setErrors({});
    onClose?.();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isPending) return;

    const validationErrors = validateTaskForm(form);

    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    const payload = {
      case_id: case_id,
      title: form.title.trim(),
      description: form.description.trim(),
      due_date: form.due_date,
      assigned_to: form.assigned_to,
    };

    if (isEditMode) {
      updateTask(
        {
          task_id: editTask.task_id,
          title: payload.title,
          status: editTask.status,
          due_date: payload.due_date,
          description: payload.description,
          assigned_to: payload.assigned_to,
        },
        {
          onSuccess: () => {
            setIsSuccess(true);
            setForm(initialForm);
          },
          onError: (error) => {
            setErrors({ submit: error.message });
          },
        },
      );
    } else {
      createTask(payload, {
        onSuccess: () => {
          setIsSuccess(true);
          setForm(initialForm);
        },
        onError: (error) => {
          setErrors({ submit: error.message });
        },
      });
    }
  };

  return {
    form,
    errors,
    isSuccess,
    isPending,
    isEditMode,
    updateField,
    handleSubmit,
    closeModal,
  };
};
