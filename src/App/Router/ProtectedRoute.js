import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../Features/Auth/Hooks/useAuth";

export default function ProtectedRoute({ allowedRole }) {
  const { token, user } = useAuth();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRole && user?.role !== allowedRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
}
