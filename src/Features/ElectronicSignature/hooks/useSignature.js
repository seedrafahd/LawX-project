import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
  getFilesRequireSignRequest,
  getFilesToSignRequest,
  getSigningURLRequest,
  reviewFileRequest,
  signatureRequest,
} from "../services/signatureApis";

export const useReviewFile = ({ signature_request_id }) => {
  return useQuery({
    queryKey: ["reviewFile", signature_request_id],
    queryFn: () => reviewFileRequest(signature_request_id),
  });
};

export const useSigningURL = ({ return_url, signature_request_id }) => {
  return useQuery({
    queryKey: ["signingURL", signature_request_id],
    queryFn: () => getSigningURLRequest({ return_url, signature_request_id }),
  });
};

export const useFilesToSign = (options) => {
  return useQuery({
    queryKey: ["filesToSign"],
    queryFn: () => getFilesToSignRequest(),
    ...options,
  });
};

export const useFilesRequireSign = (options) => {
  return useQuery({
    queryKey: ["filesReqireSign"],
    queryFn: () => getFilesRequireSignRequest(),
    ...options,
  });
};

export const useSendSignatureRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: signatureRequest,

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["lawyers"] });
      toast.success("تم إرسال طلب التوقيع للمعنيين");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
