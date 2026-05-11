import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import AuthAppBar from "../Components/AuthAppBar";
import ellipse5 from "../../../App/Assets/Ellipse 5.png";
import ellipse6 from "../../../App/Assets/Ellipse 6.png";

export default function AuthPage() {
  const { token, user } = useSelector((state) => state.auth);

  // if already logged in //
  if (token && user) {
    if (user.role === "office_admin") return <Navigate to="/cases" replace />;
    if (user.role === "accountant") return <Navigate to="/billing" replace />;
  }

  return (
    <div className=" w-full min-h-screen flex flex-col bg-variable-collection-SCREEN-BG-color overflow-hidden">
      <div className=" flex-1 relative w-full min-h-screen bg-[#eff1f824] backdrop-blur-[18px] backdrop-brightness-[100%]">
        {/* Background shapes */}
        <img
          className="absolute top-0 right-0 w-[40vw] max-w-[530px] h-auto"
          alt="Ellipse"
          src={ellipse6}
        />

        <img
          className="absolute bottom-0 left-0 w-[40vw] max-w-[523px] h-auto mix-blend-darken"
          alt="Ellipse"
          src={ellipse5}
        />

        {/* Navbar */}
        <AuthAppBar />

        {/* Page Content */}
        <div className="px-4 md:px-8 lg:px-16 py-6">
          <Outlet />
        </div>
      </div>
      {/* Footer */}
      <div className="w-full bg-[#f8f9fa40] border-t border-[#c2c6d826] ">
        <div className=" mx-auto flex flex-col md:flex-row items-center justify-between gap-6 px-4 md:px-8 py-6">
          {/* Copyright */}
          <div className="opacity-60 text-xs text-[#191c1d] text-center md:text-right">
            © 2024 LAWX. بيئة مشفرة وآمنة.
          </div>
          {/* Links */}
          <div className="flex flex-wrap justify-center md:justify-start gap-4 opacity-60 text-xs text-[#191c1d]">
            <span className="cursor-pointer">شروط الخدمة</span>
            <span className="cursor-pointer">سياسة الخصوصية</span>
            <span className="cursor-pointer">اتصل بالدعم</span>
          </div>
        </div>
      </div>
    </div>
  );
}
