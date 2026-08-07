import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Axios } from "../Axios";

export default function NotConnected() {
  const navigate = useNavigate();

  useEffect(() => {
    Axios.get("/test")
      .then(() => navigate("/dashboard"))
      .catch(() => {});
  }, [navigate]);

  return (
    <div className="flex items-center justify-center h-screen flex-col gap-4">
      <h6>NOT CONNECT</h6>
      <span>لا يمكن الاتصال بالسيرفر. أعد المحاولة لاحقاً</span>
    </div>
  );
}
