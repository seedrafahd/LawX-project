import { Axios } from "../../../App/Axios";

// get all cases
export const getCasesRequest = async () => {
  const res = await Axios.get("/Case/get_cases");
  return res.data;
};

// get case details
export const getCaseDetailsRequest = async (id) => {
  const res = await Axios.get(`/Case/get_case_details/${id}`);
  return res.data;
};

// create case
export const createCaseRequest = async (data) => {
  const res = await Axios.post("/Case/create_case", data);
  console.log(res.data.data);
  return res.data.data;
};

// update case
export const updateCaseRequest = async (data) => {
  console.log(data);
  const res = await Axios.post(`/Case/update_case`, data);
  return res.data;
};

// delete case
export const deleteCaseRequest = async (id) => {
  const res = await Axios.delete(`/Case/delete_case/${id}`);
  return res.data;
};

// Get Clients
export const getClientsRequest = async (id) => {
  const res = await Axios.get(`/ManageUsers/get_clients`);
  return res.data;
};
