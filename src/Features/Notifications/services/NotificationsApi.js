import { Axios } from "../../../App/Axios";

export const getNotificationsRequest = async () => {
  const res = await Axios.get("/notifications");
  return res.data;
};

export const markAsReadRequest = async (id) => {
  const res = await Axios.get(`/notifications/${id}/mark-read`);
  return res.data;
};

export const markAllAsReadRequest = async () => {
  const res = await Axios.get("/notifications/mark-all-read");
  return res.data;
};
