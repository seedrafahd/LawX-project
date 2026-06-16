import { useQuery } from "@tanstack/react-query";
import {
  getAlertsRequest,
  getDashboardRequest,
} from "../services/DashboardApi";

export const useDashboard = () => {
  return useQuery({
    queryKey: ["dashboard"],
    queryFn: getDashboardRequest,
  });
};

export const useAlerts = () => {
  return useQuery({
    queryKey: ["alerts"],
    queryFn: getAlertsRequest,
  });
};
