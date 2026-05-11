import { Axios } from "../../../App/Axios";

export const getDocumentsRequest = async (caseId) => {
  const res = await Axios.get(`/Case/get_documents_for_case/${caseId}`);
  console.log(res);
  return res.data;
};

export const uploadDocumentRequest = async ({ formData, onUploadProgress }) => {
  const res = await Axios.post(`/Case/upload_document`, formData, {
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
