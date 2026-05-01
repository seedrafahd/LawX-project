import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getCasesRequest,
  createCaseRequest,
  updateCaseRequest,
  deleteCaseRequest,
} from "../Services/CasesApi";
import toast from "react-hot-toast";

export const useCases = () => {
  return useQuery({
    queryKey: ["cases"],
    queryFn: getCasesRequest,
  });
};

export const useCreateCase = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCaseRequest,
    onSuccess: (data) => {
      queryClient.invalidateQueries(["cases"]);
      toast.success(data?.message || "تمت العملية بنجاح ✅");
    },
  });
};

export const useUpdateCase = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateCaseRequest,
    onSuccess: () => {
      queryClient.invalidateQueries(["cases"]);
    },
  });
};

export const useDeleteCase = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCaseRequest,
    onSuccess: () => {
      queryClient.invalidateQueries(["cases"]);
    },
  });
};
