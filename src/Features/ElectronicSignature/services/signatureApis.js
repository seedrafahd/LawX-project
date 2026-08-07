import { Axios } from "../../../App/Axios";

export const signatureRequest = async (data) => {
  const res = await Axios.post(
    "/lawyer/documents/electonic_signature/signature-request",
    data,
  );
  return res.data;
};

export const getFilesToSignRequest = async () => {
  const res = await Axios.get(
    `/lawyer/documents/electonic_signature/get_files_uploaded_by_Me_To_sign`,
  );
  return res.data;
};

export const getFilesRequireSignRequest = async () => {
  const res = await Axios.get(
    `/lawyer/documents/electonic_signature/get_files_require_sign`,
  );
  return res.data;
};

export const reviewFileRequest = async (signature_request_id) => {
  const res = await Axios.get(
    `/lawyer/documents/electonic_signature/review_file_to_sign/${signature_request_id}`,
    { responseType: "blob" },
  );
  return res.data;
};

export const getSigningURLRequest = async ({
  return_url,
  signature_request_id,
}) => {
  console.log(signature_request_id);
  const res = await Axios.get(
    `/lawyer/documents/electonic_signature/get-signing-url/${signature_request_id}`,
    // {
    //   params: return_url,
    // },
  );
  return res.data;
};
