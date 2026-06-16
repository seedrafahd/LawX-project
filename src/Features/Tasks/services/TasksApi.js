import { Axios } from "../../../App/Axios";

export const getTasksRequest = async () => {
  const res = await Axios.get("/Case/get_my_tasks");
  return res.data;
};

export const getTasksForCaseRequest = async (id) => {
  const res = await Axios.get(`/Case/get_tasks_for_case/${id}`);
  return res.data;
};

export const createTaskRequest = async (data) => {
  const res = await Axios.post("/Case/create_task", data);
  return res.data;
};

export const updateTaskStatus = async ({ id, status }) => {
  const res = await Axios.patch(`/tasks/${id}`, {
    status,
  });

  return res.data;
};

export const updateTaskRequest = async (payload) => {
  console.log(payload);
  const res = await Axios.post(`/Case/edit_task`, payload);
  return res.data;
};

export const deleteTaskRequest = async ({ id }) => {
  const res = await Axios.get(`/Case/delete_task/${id}`);
  console.log(res);
  return res.data;
};
