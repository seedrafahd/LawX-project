import { useQuery } from "@tanstack/react-query";
import { getClientsRequest } from "../Services/CasesApi";

export const useClients = () => {
  return useQuery({
    queryKey: ["clients"],
    queryFn: getClientsRequest,
  });
};
