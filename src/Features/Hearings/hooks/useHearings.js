import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createHearingRequest,
  deleteHearingRequest,
  getHearingsRequest,
  updateHearingRequest,
} from "../services/HearingsApi";
import toast from "react-hot-toast";

export const useHearings = (caseId) => {
  return useQuery({
    queryKey: ["hearings", caseId],
    queryFn: () => getHearingsRequest(caseId),
    enabled: !!caseId,
  });
};

export const useCreateHearing = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createHearingRequest,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["hearings", variables.case_id],
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useUpdateHearing = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateHearingRequest,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["hearings", variables.case_id],
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useDeleteHearing = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteHearingRequest,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["hearings", variables.case_id],
      });
      toast.success("تم حذف الجلسة بنجاح");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
