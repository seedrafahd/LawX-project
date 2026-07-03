import { Axios } from "../../../App/Axios";

export const getTemplatesRequest = async (filters = {}) => {
  const res = await Axios.get(`/templates/getTemplates`, { params: filters });
  return res.data;
};

export const getTemplateDetailsRequest = async (template_id) => {
  const res = await Axios.get(
    `/templates/show_template_details?template_id=${template_id}`,
  );
  console.log(res);
  return res.data;
};

export const getTempCategoriesRequest = async () => {
  const res = await Axios.get(`/templates/get_templates_categories`);
  console.log(res);
  return res.data;
};

export const createTemplateRequest = async (data) => {
  const res = await Axios.post("/templates/upload", data);
  return res.data;
};

export const editTemplateRequest = async (data) => {
  const res = await Axios.post("/templates/update_template", data);
  return res.data;
};

export const deleteTemplateRequest = async (template_id) => {
  await Axios.get(`/templates/delete_template?template_id=${template_id}`);
};

export const generateDocRequest = async (data) => {
  console.log(data);
  const res = await Axios.post("/templates/generate_template", data);
  return res.data;
};
