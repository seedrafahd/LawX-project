import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
  getNotificationsRequest,
  markAsReadRequest,
  markAllAsReadRequest,
} from "../services/NotificationsApi";

export const useNotifications = () => {
  return useQuery({
    queryKey: ["notifications"],
    queryFn: getNotificationsRequest,
    select: (response) => response.data,
  });
};

export const useMarkAsRead = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: markAsReadRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
    onError: () => {
      toast.error("حدث خطأ أثناء تحديث الإشعار");
    },
  });
};

export const useMarkAllAsRead = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: markAllAsReadRequest,
    onSuccess: () => {
      toast.success("تم تحديد الكل كمقروء");
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
    onError: () => {
      toast.error("حدث خطأ أثناء تحديث الإشعارات");
    },
  });
};
