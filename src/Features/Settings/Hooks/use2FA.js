import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggle2FA } from "../Services/SettingsApi";

export const useTwoFactor = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: toggle2FA,
    onSuccess: () => {
      queryClient.invalidateQueries(["profile"]);
    },
  });
};
