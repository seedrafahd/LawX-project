import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
  createLawyerRequest,
  getLawyersRequest,
  updateLawyerStatusRequest,
  updateLawyerStateRequest,
  deleteLawyerRequest,
  editLawyerRequest,
} from "../services/LawyersApi";

export const useLawyers = (filters = {}) => {
  return useQuery({
    queryKey: ["lawyers", filters],
    queryFn: () => getLawyersRequest(filters),
  });
};

export const useCreateLawyer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createLawyerRequest,

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["lawyers"] });
      toast.success("تم إنشاء سجل المحامي بنجاح");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useEditLawyer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: editLawyerRequest,

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["lawyers"] });
      toast.success("تم تحديث بيانات المحامي بنجاح");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useUpdateLawyerStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateLawyerStatusRequest,

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["lawyers"] });
      toast.success("تم تحديث حالة المحامي بنجاح");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useUpdateLawyerState = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateLawyerStateRequest,

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["lawyers"] });
      toast.success("تم تحديث تخصص المحامي بنجاح");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useDeleteLawyer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteLawyerRequest,

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["lawyers"] });
      toast.success("تم حذف المحامي بنجاح");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
