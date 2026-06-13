import { Axios } from "../../../App/Axios";

export const getInvicesRequest = async () => {
  const res = await Axios.get("/Market_place/get_invices");
  return res.data;
};

export const createInviceRequest = async (data) => {
  const res = await Axios.post("/Case/create_invoice", data);
  return res.data;
};
