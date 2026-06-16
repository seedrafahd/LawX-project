import { Axios } from "../../../App/Axios";

export const getProfile = async () => {
  // let response = await Axios.get(
  //   "manage_account/profile/personal/super_admin/get_profile",
  // );
  // return response.data;
};

export const updateProfile = async (data) => {
  //   const res = await fetch("/api/profile", {
  //     method: "PUT",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(data),
  //   });
  //   return res.json();
};

export const changePassword = async (body) => {
  // let response = await Axios.post(
  //   "manage_account/profile/security/change_password",
  //   body,
  // );
  // console.log(response.data.data);
  // return response.data.data;
};

export const toggle2FA = async () => {
  //   const res = await fetch("/api/toggle-2fa", {
  //     method: "POST",
  //   });
  //   return res.json();
};
