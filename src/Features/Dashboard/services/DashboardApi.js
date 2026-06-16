import { Axios } from "../../../App/Axios";

export const getDashboardRequest = async () => {
  const res = await Axios.get("/dashboard");
  return res.data;
};

export const getAlertsRequest = async () => {
  const res = await Axios.get("/dashboard/alerts");
  return res.data;
};
