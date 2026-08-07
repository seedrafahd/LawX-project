import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  acceptInvitationRequest,
  getInvitationsRequest,
  getReceivedInvitationsRequest,
  inviteLawyerRequest,
  rejectInvitationRequest,
  removeInvitationRequest,
  removeMemberRequest,
} from "../services/InvitationsApis";
import toast from "react-hot-toast";

export const useInvitations = (options = {}) => {
  return useQuery({
    queryKey: ["invitations"],
    queryFn: getInvitationsRequest,
    ...options,
  });
};

export const useReceivedInvitations = (options = {}) => {
  return useQuery({
    queryKey: ["recInvitations"],
    queryFn: getReceivedInvitationsRequest,
    ...options,
  });
};

export const useInviteLawyer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: inviteLawyerRequest,

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["invitations"] });
      toast.success(data?.message || "تم إرسال الدعوة بنجاح");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useRemoveInvitation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: removeInvitationRequest,

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["invitations"] });
      toast.success(data?.message || "تم سحب الدعوة بنجاح");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useAcceptInvitation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: acceptInvitationRequest,

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["recInvitations"] });
      toast.success(data?.message || "تم قبول الدعوة بنجاح");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useRejectInvitation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: rejectInvitationRequest,

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["recInvitations"] });
      toast.success(data?.message || "تم رفض الدعوة بنجاح");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useRemoveMember = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: removeMemberRequest,

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["invitations"] });
      toast.success(data?.message || "تم إزالة المحامي بنجاح");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
