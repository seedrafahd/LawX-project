import { Axios } from "../../../App/Axios";
// Requests
export const getRequestsRequest = async () => {
  const res = await Axios.get("/Market_place/get_legal_requests");
  return res.data;
};

export const getRequestDetailsRequest = async (request_id) => {
  const res = await Axios.get(
    `/Market_place/get_legal_request_details/${request_id}`,
  );
  return res.data;
};

// Offers
export const getOffersRequest = async () => {
  const res = await Axios.get("/Market_place/get_my_proposals");
  return res.data;
};

export const getOfferDetailsRequest = async (offer_id) => {
  const res = await Axios.get(`/Market_place/get_proposal_details/${offer_id}`);
  return res.data;
};

export const createProposalRequest = async (data) => {
  const res = await Axios.post("/Market_place/send_proposal", data);
  return res.data;
};

export const updateOfferRequest = async (data) => {
  const res = await Axios.post(`/Market_place/update_proposal`, data);
  return res.data;
};

export const deleteOfferRequest = async (id) => {
  const res = await Axios.get(`/Market_place/delete_proposal/${id}`);
  return res.data;
};
