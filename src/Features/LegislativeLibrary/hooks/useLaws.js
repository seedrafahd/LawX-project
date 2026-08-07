import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createLawRequest,
  deleteLawRequest,
  editLawRequest,
  getLawCategoriesRequest,
  getlawDetailsRequest,
  getlegislationsRequest,
  searchLawRequest,
} from "../services/LegislativeLibraryApi";
import toast from "react-hot-toast";

const normalizeLegislation = (item) => {
  const statusMap = {
    "ساري المفعول": "active",
    معدل: "amended",
    ملغي: "repealed",
  };

  return {
    ...item,
    content: item.content ?? item.description ?? "",
    created_at: item.created_at ?? item.publish_date ?? "",
    status:
      statusMap[item.status?.trim()] ??
      item.status?.toString()?.trim().toLowerCase() ??
      "",
    category: item.category
      ? typeof item.category === "string"
        ? { name: item.category }
        : item.category
      : { name: "" },
  };
};

export const useLaws = (filters = {}, role) => {
  return useQuery({
    queryKey: ["laws", filters],
    queryFn: async () => {
      const res = await getlegislationsRequest(filters, role);

      const legislations = (
        res?.legislations ??
        res?.data?.legislations ??
        []
      ).map(normalizeLegislation);
      const pagination = res?.pagination ?? res?.data?.pagination ?? null;

      return { legislations, pagination };
    },
  });
};

export const useLawDetails = (law_id, role, options = {}) => {
  return useQuery({
    queryKey: ["lawDetails", law_id],
    queryFn: () => getlawDetailsRequest(law_id, role),
    enabled: Boolean(law_id),
    ...options,
  });
};

export const useLawCategories = (role, options = {}) => {
  return useQuery({
    queryKey: ["lawCategories"],
    queryFn: () => getLawCategoriesRequest(role),
    ...options,
  });
};

export const useCreateLaw = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createLawRequest,

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["laws"] });
      toast.success(data?.message || "تم إنشاء القانون بنجاح");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useEditLaw = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: editLawRequest,

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["laws"] });
      toast.success(data?.message || "تم تعديل القانون بنجاح");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export function useDeleteLaw() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteLawRequest,

    onSuccess: () => {
      toast.success("تم حذف القانون بنجاح");

      queryClient.invalidateQueries({
        queryKey: ["laws"],
      });
    },

    onError: (e) => {
      toast.error(e.message);
    },
  });
}

// Search//////////////
export const useSearchLaw = (role) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => searchLawRequest(data, role),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["laws"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
