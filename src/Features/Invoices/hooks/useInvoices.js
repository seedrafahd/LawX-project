import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createInviceRequest, getInvicesRequest } from "../services/InvicesApi";

export const useInvoices = () => {
  return useQuery({
    queryKey: ["invoices"],
    queryFn: getInvicesRequest,
  });
};

export const useCreateInvoice = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createInviceRequest,

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["invoices"] });
      toast.success(data?.message || "تم إنشاء الفاتورة بنجاح");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export function useDeleteInvoice() {
  const queryClient = useQueryClient();

  return useMutation({
    // mutationFn: deleteOffer,

    onSuccess: () => {
      toast.success("تم حذف الفاتورة بنجاح");

      queryClient.invalidateQueries({
        queryKey: ["offers"],
      });
    },

    onError: () => {
      toast.error("حدث خطأ أثناء حذف الفاتورة");
    },
  });
}
