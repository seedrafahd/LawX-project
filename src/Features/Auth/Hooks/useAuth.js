import { useSelector, useDispatch } from "react-redux";
import { logout } from "../AuthSlice";

export const useAuth = () => {
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return {
    user,
    token,
    role: user?.role,
    officeId: user?.office_id,
    logout: handleLogout,
    isAuthenticated: !!token,
  };
};
