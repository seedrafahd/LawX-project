import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import AuthAppBar from "./AuthAppBar";

export default function Auth() {
  const { token, user } = useSelector((state) => state.auth);

  // if already logged in //
  if (token && user) {
    if (user.role === "office_admin") return <Navigate to="/cases" replace />;
    if (user.role === "accountant") return <Navigate to="/billing" replace />;
  }

  return (
    <div
      dir="rtl"
      className="relative min-h-screen  overflow-hidden bg-[#f4f6fb] font-[Cairo]"
    >
      {/* Background blur shapes */}
      <div className="absolute w-[300px] h-[500px] bg-[#344474]/30 rounded-full blur-[120px] top-[-150px] right-[-150px]" />
      <div className="absolute w-[400px] h-[500px] bg-[#344474]/30 rounded-full blur-[120px] bottom-[-150px] left-[-150px]" />
      <AuthAppBar />
      <div className="mt-6">
        <Outlet />
      </div>
    </div>
  );
}
