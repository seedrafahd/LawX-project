import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../Features/Auth/hooks/useAuth";
import Loader from "../../shared/components/Loading";

export default function ProtectedRoute({ allowedRole }) {
  const { token, user, isInitialized } = useAuth();

  if (!isInitialized) {
    return <Loader />;
  }

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // if (allowedRole && user?.role !== allowedRole) {
  //   return <Navigate to="/unauthorized" replace />;
  // }
  if (allowedRole && !allowedRole.includes(user?.role)) {
    return <Navigate to="/unauthorized" />;
  }

  return <Outlet />;
}
