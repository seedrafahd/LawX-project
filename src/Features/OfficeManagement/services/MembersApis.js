import { Axios } from "../../../App/Axios";

export const searchForLawyerRequest = async (params = {}) => {
  const res = await Axios.get("/lawyer/Manage_Offices/search_for_lawers", {
    params: params,
  });
  console.log(res);
  return res.data;
};

export const getMembersRequest = async () => {
  const res = await Axios.get(
    "/lawyer/Manage_Offices/get_all_lawers_in_my_office",
  );
  console.log(res);
  return res.data;
};

export const removeMemberRequest = async (lawer_profile_id) => {
  console.log(lawer_profile_id);
  const res = await Axios.post(
    `/lawyer/Manage_Offices/remove_lawer_from_office`,
    {
      lawer_profile_id: lawer_profile_id,
    },
  );
  console.log(res);
  return res.data;
};
