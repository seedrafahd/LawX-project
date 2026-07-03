import { Axios } from "../../../App/Axios";

export const getlegislationsRequest = async (filters = {}) => {
  const res = await Axios.get(
    `/legislation/Get_legislation_with_filter_options`,
    {
      params: filters,
    },
  );
  return res.data;
};

export const getLawCategoriesRequest = async (page = 1) => {
  const res = await Axios.get(`/legislation/Get_legal_categories`);
  return res.data;
};

export const getlawDetailsRequest = async (law_id) => {
  const res = await Axios.get(`/legislation/get_law_details/${law_id}`);
  return res.data;
};

export const createLawRequest = async (data) => {
  const res = await Axios.post("/legislation/create_law", data);
  return res.data;
};

export const editLawRequest = async (data) => {
  const res = await Axios.post("/legislation/update_law", data);
  return res.data;
};

export const deleteLawRequest = async (law_id) => {
  await Axios.get(`/legislation/delete_law/${law_id}`);
};

export const searchLawRequest = async (data) => {
  console.log("searchLawRequest data", data);
  const res = await Axios.post("/legislation/semantic_search", data);
  console.log("searchLawRequest res", res.data);
  return res.data;
};
