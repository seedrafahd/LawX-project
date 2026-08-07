import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createTaskRequest,
  getTasksRequest,
  updateTaskRequest,
  deleteTaskRequest,
} from "../services/TasksApi";
import toast from "react-hot-toast";

export const useTasks = () => {
  return useQuery({
    queryKey: ["tasks"],
    queryFn: getTasksRequest,
  });
};

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTaskRequest,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useUpdateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateTaskRequest,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast.success("تم تحديث المهمة بنجاح");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTaskRequest,

    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      if (variables?.case_id) {
        queryClient.invalidateQueries({
          queryKey: ["tasks", variables.case_id],
        });
      }
      toast.success("تم حذف المهمة بنجاح");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
