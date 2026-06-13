import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createProposalRequest,
  deleteOfferRequest,
  getOfferDetailsRequest,
  getOffersRequest,
  updateOfferRequest,
} from "../../services/marketPlaceApi";
import toast from "react-hot-toast";

export const useOffers = () => {
  return useQuery({
    queryKey: ["offers"],
    queryFn: getOffersRequest,
  });
};

export const useOfferDetails = (id) => {
  return useQuery({
    queryKey: ["offerDetails", id],
    queryFn: () => getOfferDetailsRequest(id),
  });
};

export const useSendProposal = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProposalRequest,

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["requests"] });
      toast.success(data?.message || "تم إرسال العرض بنجاح");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useUpdateOffer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateOfferRequest,

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["offers"] });
      toast.success(data?.message || "تم تحديث العرض بنجاح");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export function useDeleteOffer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteOfferRequest,

    onSuccess: () => {
      toast.success("تم حذف العرض بنجاح");

      queryClient.invalidateQueries({
        queryKey: ["offers"],
      });
    },

    onError: (e) => {
      toast.error(e.message);
    },
  });
}
