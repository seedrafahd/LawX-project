import { Axios } from "../../../App/Axios";

// get all cases
export const getCasesRequest = async () => {
  const res = await Axios.get("/Case/get_cases");
  return res.data;
};

// create case
export const createCaseRequest = async (data) => {
  const res = await Axios.post("/Case/create_case", data);
  console.log(res.data.data);
  return res.data.data;
};

// update case
export const updateCaseRequest = async ({ id, data }) => {
  const res = await Axios.put(`/Case/update_case`, data);
  return res.data;
};

// delete case
export const deleteCaseRequest = async (id) => {
  const res = await Axios.delete(`/cases/${id}`);
  return res.data;
};
