import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createHearingRequest,
  getHearingsRequest,
} from "../Services/HearingsApi";

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
      queryClient.invalidateQueries(["hearings", variables.caseId]);
    },
  });
};
