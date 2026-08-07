import { Axios } from "../../../App/Axios";

export const loginRequest = async (form) => {
  let response = await Axios.post(`auth/login`, {
    email: form.email,
    password: form.password,
  });
  return response.data.data;
};

export const verifyIdentityRequest = async (form) => {
  let response = await Axios.post(`auth/lawyer/verify-syndicate`, form);
  return response.data.data;
};

export const registerRequest = async (form) => {
  let response = await Axios.post(`auth/lawyer/register`, form);
  return response.data.data;
};

export const logoutRequest = async () => {
  await Axios.post("auth/logout");
};

export const getLawyerProfileRequest = async () => {
  const response = await Axios.get("lawyer/profile/get_lawyer_profile");
  console.log(response);
  return response?.data?.data ?? response?.data;
};

export const verify2FARequest = async ({ code, temporary_token, user_id }) => {
  let response = await Axios.post("verify_2FA", {
    temporary_token,
    code,
    user_id,
  });

  return response.data.data;
};

// export const resendCode = async (tempToken) => {
//   return { message: "ok" };
// };

export const forgetPasswordRequest = async (body) => {
  let response = await Axios.post("auth/password/forgot", body);
  console.log(response.data.data);
  return response.data.data;
};

export const resetPasswordRequest = async (form) => {
  let response = await Axios.post("auth/password/reset", form);
  console.log(response.data);
  return response.data;
};
