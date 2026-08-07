import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createTemplateRequest,
  deleteTemplateRequest,
  editTemplateRequest,
  generateDocRequest,
  getTempCategoriesRequest,
  getTemplateDetailsRequest,
  getTemplatesRequest,
} from "../services/TemplatesApi";
import toast from "react-hot-toast";

export const useTemplates = (filters, role) => {
  return useQuery({
    queryKey: ["templates", filters],
    queryFn: () => getTemplatesRequest(filters, role),
  });
};

export const useTemplateDetails = (template_id, options = {}, role) => {
  return useQuery({
    queryKey: ["templateDetails", template_id],
    queryFn: () => getTemplateDetailsRequest(template_id, role),
    enabled: Boolean(template_id),
    ...options,
  });
};

export const useTemplateCategories = (role) => {
  return useQuery({
    queryKey: ["templateCategories"],
    queryFn: () => getTempCategoriesRequest(role),
  });
};

export const useCreateTemplate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTemplateRequest,

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["templates"] });
      toast.success(data?.message || "تم إنشاء القالب بنجاح");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useEditTemplate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: editTemplateRequest,

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["templates"] });
      queryClient.invalidateQueries({ queryKey: ["templateDetails"] });
      // toast.success(data?.message || "تم تعديل القالب بنجاح");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export function useDeleteTemplate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTemplateRequest,

    onSuccess: () => {
      toast.success("تم حذف القالب بنجاح");

      queryClient.invalidateQueries({
        queryKey: ["templates"],
      });
    },

    onError: (e) => {
      toast.error(e.message);
    },
  });
}

export function useGenerateDoc(template_id) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: generateDocRequest,

    onSuccess: () => {
      toast.success("تم توليد الملف بنجاح");

      queryClient.invalidateQueries({
        queryKey: ["templateDetails", template_id],
      });
    },

    onError: (e) => {
      toast.error(e.message);
    },
  });
}
