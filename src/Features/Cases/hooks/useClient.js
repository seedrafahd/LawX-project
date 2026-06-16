import { useQuery } from "@tanstack/react-query";
import { getClientsRequest } from "../services/CasesApi";

export const useClients = () => {
  return useQuery({
    queryKey: ["clients"],
    queryFn: getClientsRequest,
  });
};
