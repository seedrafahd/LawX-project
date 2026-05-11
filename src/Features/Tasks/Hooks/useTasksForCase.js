import { useQuery } from "@tanstack/react-query";
import { getTasksForCaseRequest } from "../Services/TasksApi";

export const useTasksForCase = (case_id) => {
  return useQuery({
    queryKey: ["tasks", case_id],
    queryFn: () => getTasksForCaseRequest(case_id),
    enabled: !!case_id,
  });
};
