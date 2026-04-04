import axios from "axios";
import { Axios } from "../../../Axios";
const baseURL = "http://127.0.0.1:8000/api";
export const loginRequest = async (form) => {
  try {
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
  } catch (e) {
    console.log(e.response);
  }
};

export const logoutRequest = async () => {
  try {
    await Axios.get("logout");
  } catch (e) {
    console.log(e.response);
  }
};

export const verify2FA = async ({ code, tempToken }) => {
  // const response = await fetch("/api/verify-2fa", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({
  //     code,
  //     temp_token: tempToken,
  //   }),
  // });

  // if (!response.ok) {
  //   throw new Error("فشل التحقق");
  // }

  return {
    token: "dtryghuj",
    user: {
      id: 1,
      name: "Ahmad",
      role: "office_admin",
      email: "dfghjk",
      office_id: 5,
    },
  };
};

export const resendCode = async (tempToken) => {
  // const response = await fetch("/api/resend-2fa", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({
  //     temp_token: tempToken,
  //   }),
  // });

  // if (!response.ok) {
  //   throw new Error("فشل إعادة الإرسال");
  // }

  return { message: "ok" };
};
