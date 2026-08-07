import { Axios } from "../../../App/Axios";

export const getTemplatesRequest = async (filters = {}, role) => {
  const res = await Axios.get(`/${role}/templates/getTemplates`, {
    params: filters,
  });
  return res.data;
};

export const getTemplateDetailsRequest = async (template_id, role) => {
  const res = await Axios.get(
    `/${role}/templates/show_template_details?template_id=${template_id}`,
  );
  return res.data;
};

export const getTempCategoriesRequest = async (role) => {
  const res = await Axios.get(`/${role}/templates/get_templates_categories`);
  return res.data;
};

export const createTemplateRequest = async (data) => {
  const res = await Axios.post("/syndicate/templates/upload", data);
  return res.data;
};

export const editTemplateRequest = async (data) => {
  const res = await Axios.post("/syndicate/templates/update_template", data);
  return res.data;
};

export const deleteTemplateRequest = async (template_id) => {
  await Axios.get(
    `/syndicate/templates/delete_template?template_id=${template_id}`,
  );
};

export const generateDocRequest = async (data) => {
  console.log(data);
  const res = await Axios.post("/lawyer/templates/generate_template", data);
  return res.data;
};
