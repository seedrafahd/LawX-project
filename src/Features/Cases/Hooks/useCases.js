import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getCasesRequest,
  createCaseRequest,
  updateCaseRequest,
  deleteCaseRequest,
  getCaseDetailsRequest,
} from "../Services/CasesApi";
import toast from "react-hot-toast";

export const useCases = () => {
  return useQuery({
    queryKey: ["cases"],
    queryFn: getCasesRequest,
  });
};

export const useCaseDetails = (case_id) => {
  return useQuery({
    queryKey: ["caseDetails", case_id],
    queryFn: () => getCaseDetailsRequest(case_id),
    enabled: !!case_id,
  });
};

export const useCreateCase = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCaseRequest,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["cases"] });
      toast.success(data?.message || "تمت العملية بنجاح");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useUpdateCase = (id) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateCaseRequest,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["cases"] });
      queryClient.invalidateQueries({
        queryKey: ["caseDetails", id],
      });
      toast.success(data?.message || "تم تعديل القضية بنجاح");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useDeleteCase = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCaseRequest,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["cases"] });
      toast.success(data?.message || "تم حذف القضية بنجاح");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
