import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import {
  deleteDocumentRequest,
  getDocumentsRequest,
  uploadDocumentRequest,
} from "../Services/DocumentsApi";
import toast from "react-hot-toast";

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

    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries({
        queryKey: ["documents", variables.caseId],
      });
    },
  });
};

export const useDeleteDocument = (case_id, doc_id) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteDocumentRequest(doc_id),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["documents", case_id] });
      toast.success(data?.message || "تمت العملية بنجاح");
    },
  });
};
