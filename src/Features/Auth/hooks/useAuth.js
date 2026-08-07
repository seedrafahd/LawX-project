import { useSelector, useDispatch } from "react-redux";
import { logout, setLoading } from "../AuthSlice";
import Cookies from "universal-cookie";
import { logoutRequest } from "../services/AuthApi";

export const useAuth = () => {
  const cookies = new Cookies();
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const profile = useSelector((state) => state.auth.profile);
  const loading = useSelector((state) => state.auth.loading);
  const error = useSelector((state) => state.auth.error);
  const isInitialized = useSelector((state) => state.auth.isInitialized);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    dispatch(setLoading(true));
    try {
      await logoutRequest();
    } catch (e) {
      console.log(e.message);
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
    profile,
    loading,
    error,
    role: user?.role,
    officeId: user?.office_id,
    logout: handleLogout,
    isAuthenticated: !!token,
    isInitialized,
  };
};
