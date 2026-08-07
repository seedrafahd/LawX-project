import { Axios } from "../../../App/Axios";

export const createOfficeRequest = async (data) => {
  const res = await Axios.post(`/lawyer/Manage_Offices/activate_office`, data);
  console.log(res);
  return res.data;
};

// export const createHearingRequest = async (data) => {
//   const res = await Axios.post(`/lawyer/sessions/add_new_session`, data);
//   return res.data;
// };

// export const updateHearingRequest = async (data) => {
//   const res = await Axios.post(`/lawyer/sessions/update_session`, data);
//   return res.data;
// };

// export const deleteHearingRequest = async ({ id }) => {
//   const res = await Axios.delete(`/lawyer/sessions/delete_session/${id}`);
//   return res.data;
// };
