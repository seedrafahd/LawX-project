import { Axios } from "../../../App/Axios";

// get all cases
export const getCasesRequest = async () => {
  const res = await Axios.get("/lawyer/Case/get_cases", {
    params: { scope: "office" },
  });
  return res.data;
};

// get case details
export const getCaseDetailsRequest = async (id) => {
  const res = await Axios.get(`/lawyer/Case/get_case_details/${id}`);
  return res.data;
};

// create case
export const createCaseRequest = async (data) => {
  const res = await Axios.post("/lawyer/Case/create_case", data);
  console.log(res.data.data);
  return res.data.data;
};

// update case
export const updateCaseRequest = async (data) => {
  console.log(data);
  const res = await Axios.post(`/lawyer/Case/update_case`, data);
  return res.data;
};

// delete case
export const deleteCaseRequest = async (id) => {
  const res = await Axios.delete(`/lawyer/Case/delete_case/${id}`);
  return res.data;
};

// Get Clients
export const getClientsRequest = async (id) => {
  const res = await Axios.get(`/lawyer/get_clients`);
  return res.data;
};
