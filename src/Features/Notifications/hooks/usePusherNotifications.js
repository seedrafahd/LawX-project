import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useQueryClient } from "@tanstack/react-query";
import pusher from "../../../services/pusher";
import toast from "react-hot-toast";

export const usePusherNotifications = () => {
  const user = useSelector((state) => state.auth.user);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!user?.ID) return;

    const channel = pusher.subscribe(`private-App.Models.User.${user.ID}`);
    channel.bind(
      "Illuminate\\Notifications\\Events\\BroadcastNotificationCreated",
      (data) => {
        console.log(data);

        queryClient.invalidateQueries({
          queryKey: ["notifications"],
        });

        toast.success(data.message);
      },
    );

    return () => {
      channel.unbind_all();
      pusher.unsubscribe(`private-App.Models.User.${user.ID}`);
    };
  }, [user?.ID, queryClient]);
};
