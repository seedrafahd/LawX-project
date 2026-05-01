import { QueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      onSuccess: (data) => {
        toast.success(data?.message || "تمت العملية بنجاح ✅");
      },
    },
  },
});
