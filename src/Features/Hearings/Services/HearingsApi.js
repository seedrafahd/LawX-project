import { Axios } from "../../../App/Axios";

export const getHearingsRequest = async (caseId) => {
  const res = await Axios.get(`/Case/get_sessions_for_case/${caseId}`);
  return res.data;
};

export const createHearingRequest = async (data) => {
  const res = await Axios.post(`/Case/add_new_session`, data);
  return res.data;
};

export const updateHearingRequest = async (data) => {
  const res = await Axios.post(`/Case/update_session`, data);
  return res.data;
};

export const deleteHearingRequest = async ({ id }) => {
  const res = await Axios.delete(`/Case/delete_session/${id}`);
  return res.data;
};
