import axios from "axios";
import { Axios } from "../../../Axios";

const baseURL = "http://127.0.0.1:8000/api";

export const loginRequest = async (form) => {
  let response = await axios.post(
    `${baseURL}/login`,
    {
      email: form.email,
      password: form.password,
    },
    {
      headers: { Accept: "application/json" },
    },
  );

  return response.data.data;
};

export const logoutRequest = async () => {
  await Axios.get("logout");
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
  let response = await Axios.post("password/forgot", body);
  console.log(response.data.data);
  return response.data.data;
};

export const resetPasswordRequest = async (form) => {
  let response = await Axios.post("password/reset", form);
  console.log(response.data);
  return response.data;
};
