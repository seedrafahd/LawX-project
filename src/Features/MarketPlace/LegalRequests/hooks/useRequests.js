import { useQuery } from "@tanstack/react-query";
import {
  getRequestDetailsRequest,
  getRequestsRequest,
} from "../../services/marketPlaceApi";

export const useRequests = () => {
  return useQuery({
    queryKey: ["requests"],
    queryFn: getRequestsRequest,
  });
};

export const useRequestDetails = (request_id) => {
  return useQuery({
    queryKey: ["requestDetails", request_id],
    queryFn: () => getRequestDetailsRequest(request_id),
  });
};
