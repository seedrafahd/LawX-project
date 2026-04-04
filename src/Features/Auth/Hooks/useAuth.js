import { useSelector, useDispatch } from "react-redux";
import { logout, setLoading } from "../AuthSlice";
import Cookies from "universal-cookie";
import { logoutRequest } from "../Services/AuthApi";

export const useAuth = () => {
  const cookies = new Cookies();
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const loading = useSelector((state) => state.auth.loading);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    dispatch(setLoading(true));
    try {
      await logoutRequest();
    } catch (e) {
    } finally {
      dispatch(setLoading(false));
      dispatch(logout());
      cookies.remove("auth", { path: "/" });
      sessionStorage.removeItem("auth");
    }
  };

  return {
    user,
    token,
    loading,
    role: user?.role,
    officeId: user?.office_id,
    logout: handleLogout,
    isAuthenticated: !!token,
  };
};
