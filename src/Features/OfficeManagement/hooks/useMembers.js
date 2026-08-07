import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { removeMemberRequest } from "../services/InvitationsApis";
import toast from "react-hot-toast";
import {
  getMembersRequest,
  searchForLawyerRequest,
} from "../services/MembersApis";

export const useSearchForLawyers = (filters = {}, options = {}) => {
  return useQuery({
    queryKey: ["searchForLawyers", filters],
    queryFn: () => searchForLawyerRequest(filters),
    ...options,
  });
};

export const useMembers = (options = {}) => {
  return useQuery({
    queryKey: ["members"],
    queryFn: getMembersRequest,
    ...options,
  });
};

export const useRemoveMember = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: removeMemberRequest,

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["members"] });
      toast.success(data?.message || "تم إزالة المحامي بنجاح");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
