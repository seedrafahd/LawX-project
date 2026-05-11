import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import {
  getDocumentsRequest,
  uploadDocumentRequest,
} from "../Services/DocumentsApi";

export const useDocuments = (caseId) => {
  return useQuery({
    queryKey: ["documents", caseId],
    queryFn: () => getDocumentsRequest(caseId),
    enabled: !!caseId,
  });
};

export const useUploadDocument = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: uploadDocumentRequest,

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["documents", variables.caseId],
      });
    },
  });
};
