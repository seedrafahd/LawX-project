import { useMutation } from "@tanstack/react-query";
import { createOfficeRequest } from "../services/OfficeApis";
import toast from "react-hot-toast";

export const useCreateOffice = () => {
  return useMutation({
    mutationFn: createOfficeRequest,
    onSuccess: (_, variables) => {
      toast.success("تم إنشاء المكتب بنجاح");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
