import { Axios } from "../../../App/Axios";

export const getlegislationsRequest = async (filters = {}, role) => {
  const url =
    role === "lawyer"
      ? "/lawyer/legislation/Get_legislation_with_filter_options"
      : "/syndicate/legislation/get_laws";
  const res = await Axios.get(url, {
    params: filters,
  });
  return res.data;
};

export const getLawCategoriesRequest = async (role) => {
  const res = await Axios.get(`/${role}/legislation/Get_legal_categories`);
  return res.data;
};

export const getlawDetailsRequest = async (law_id, role) => {
  const res = await Axios.get(`/${role}/legislation/get_law_details/${law_id}`);
  return res.data;
};

export const searchLawRequest = async (data, role) => {
  const res =
    (await role) === "lawyer"
      ? Axios.post(`/${role}/legislation/semantic_search`, data)
      : Axios.get(`/${role}/legislation/semantic_search`, { params: data });
  return res.data;
};

/////////////////////////
export const createLawRequest = async (data) => {
  const res = await Axios.post("/syndicate/legislation/create_law", data);
  return res.data;
};

export const editLawRequest = async (data) => {
  const res = await Axios.post("/syndicate/legislation/update_law", data);
  return res.data;
};

export const deleteLawRequest = async (law_id) => {
  await Axios.get(`/syndicate/legislation/delete_law/${law_id}`);
};
