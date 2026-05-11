import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createTaskRequest,
  getTasksRequest,
  updateTaskStatus,
} from "../Services/TasksApi";

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
      queryClient.invalidateQueries(["tasks"]);
    },
  });
};

export const useUpdateTaskStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateTaskStatus,

    onSuccess: () => {
      queryClient.invalidateQueries(["tasks"]);
    },
  });
};
