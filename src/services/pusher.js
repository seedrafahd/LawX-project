import Pusher from "pusher-js";
import Cookies from "universal-cookie";

const pusher = new Pusher(process.env.REACT_APP_PUSHER_KEY, {
  cluster: process.env.REACT_APP_PUSHER_CLUSTER,

  authorizer: (channel) => ({
    authorize: (socketId, callback) => {
      const cookie = new Cookies();
      let auth = cookie.get("auth");
      if (!auth) {
        try {
          auth = JSON.parse(sessionStorage.getItem("auth"));
        } catch {
          auth = null;
        }
      }
      const token = auth?.token;

      if (!token) {
        return callback(true, { status: 401 });
      }

      const request = new XMLHttpRequest();
      request.open("POST", `http://127.0.0.1:8000/broadcasting/auth`, true);
      request.setRequestHeader(
        "Content-Type",
        "application/x-www-form-urlencoded",
      );
      request.setRequestHeader("Authorization", `Bearer ${token}`);
      request.setRequestHeader("Accept", "application/json");

      request.onload = () => {
        if (request.status === 200) {
          callback(false, JSON.parse(request.responseText));
        } else {
          callback(true, request);
        }
      };

      request.onerror = () => callback(true, request);

      request.send(
        `socket_id=${encodeURIComponent(socketId)}&channel_name=${encodeURIComponent(channel.name)}`,
      );
    },
  }),
});

export default pusher;
