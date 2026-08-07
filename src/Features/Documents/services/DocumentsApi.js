import { Axios } from "../../../App/Axios";

export const getDocumentsRequest = async (caseId) => {
  const res = await Axios.get(
    `/lawyer/documents/get_documents_for_case/${caseId}`,
  );
  return res.data?.data.data;
};

export const uploadDocumentRequest = async ({ formData, onUploadProgress }) => {
  const res = await Axios.post(`/lawyer/documents/upload_document`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    onUploadProgress: (progressEvent) => {
      const percent = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total,
      );

      onUploadProgress?.(percent);
    },
  });

  return res.data;
};

// delete document
export const deleteDocumentRequest = async (id) => {
  const res = await Axios.get(`/lawyer/documents/delete_document/${id}`);
  return res.data;
};
