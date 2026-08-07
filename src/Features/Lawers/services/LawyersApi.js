import { Axios } from "../../../App/Axios";

export const getLawyersRequest = async (filters = {}) => {
  const res = await Axios.get("/syndicate/get_lawers", {
    params: filters,
  });
  return res.data;
};

export const createLawyerRequest = async (data) => {
  const res = await Axios.post("/syndicate/createLawyer", data);
  return res.data;
};

export const editLawyerRequest = async ({ data, lawyer_id }) => {
  const res = await Axios.put(`/syndicate/lawyers/${lawyer_id}/update`, data);
  console.log(res);
  return res.data;
};

export const updateLawyerStatusRequest = async (lawyer_profile_id) => {
  const res = await Axios.patch(
    `/syndicate/lawyers/${lawyer_profile_id}/suspend`,
  );
  return res.data;
};

export const updateLawyerStateRequest = async (lawyer_profile_id) => {
  const res = await Axios.patch(
    `/syndicate/lawyers/${lawyer_profile_id}/promote`,
  );
  return res.data;
};

export const deleteLawyerRequest = async (lawyer_profile_id) => {
  const res = await Axios.delete(
    `/syndicate/lawyers/${lawyer_profile_id}/delete`,
  );
  return res.data;
};
