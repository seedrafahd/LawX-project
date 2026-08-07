import { Axios } from "../../../App/Axios";

export const getTasksRequest = async () => {
  const res = await Axios.get("/lawyer/tasks/get_my_tasks");
  return res.data;
};

export const getTasksForCaseRequest = async (id) => {
  const res = await Axios.get(`/lawyer/tasks/get_tasks_for_case/${id}`);
  return res.data;
};

export const createTaskRequest = async (data) => {
  const res = await Axios.post("/lawyer/tasks/create_task", data);
  return res.data;
};

export const updateTaskRequest = async (payload) => {
  console.log(payload);
  const res = await Axios.post(`/lawyer/tasks/edit_task`, payload);
  return res.data;
};

export const deleteTaskRequest = async ({ id }) => {
  const res = await Axios.get(`/lawyer/tasks/delete_task/${id}`);
  console.log(res);
  return res.data;
};
