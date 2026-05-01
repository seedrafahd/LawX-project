import { useMutation } from "@tanstack/react-query";
import { changePassword } from "../Services/SettingsApi";

export const useChangePassword = () => {
  return useMutation({
    mutationFn: changePassword,
  });
};
