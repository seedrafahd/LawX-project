import { Navigate, NavLink } from "react-router-dom";
import { useAuth } from "../Features/Auth/Hooks/useAuth";
import { useState } from "react";
import ConfirmDialog from "../shared/Components/ConfirmDialog";
import logoImage from "./Assets/lawX.png";

// Icons
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import StarIcon from "@mui/icons-material/Star";
import BalanceIcon from "@mui/icons-material/Balance";
import SettingsIcon from "@mui/icons-material/Settings";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import StarsOutlinedIcon from "@mui/icons-material/StarsOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import ArticleIcon from "@mui/icons-material/Article";
import LogoutIcon from "@mui/icons-material/Logout";

const drawerWidth = 230;

export default function MyDrawer() {
  const { logout, user } = useAuth();
  const role = user?.role;

  const [mobileOpen, setMobileOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const superAdminMenuItems = [
    { icon: <DashboardIcon />, label: "لوحة التحكم", link: "dashboard" },
    { icon: <ArticleIcon />, label: "الباقات والخطط", link: "packages" },
    { icon: <LocalAtmIcon />, label: "إشتراكات ودفعات", link: "subscribes" },
    { icon: <StarsOutlinedIcon />, label: "ميزات", link: "features" },
    {
      icon: <AccountCircleOutlinedIcon />,
      label: "الملف الشخصي",
      link: "profile",
    },
    { icon: <SettingsIcon />, label: "الإعدادات", link: "settings" },
  ];

  const officeAdminMenuItems = [
    { icon: <DashboardIcon />, label: "لوحة التحكم", link: "dashboard" },
    // { icon: <PersonIcon />, label: "الموظف", link: "employee" },
    { icon: <BusinessCenterIcon />, label: "القضايا", link: "cases" },
    // { icon: <StarIcon />, label: "التقييم", link: "evaluation" },
    // { icon: <ArticleIcon />, label: "القوالب", link: "templates" },
    // { icon: <BalanceIcon />, label: "قانون", link: "law" },
    // { icon: <SettingsIcon />, label: "الإعدادات", link: "settings" },
  ];

  const menuItems =
    role === "super_admin"
      ? superAdminMenuItems
      : role === "admin"
        ? officeAdminMenuItems
        : null;

  const DrawerContent = () => (
    <div className="h-full flex flex-col justify-between py-4 px-6 gap-5">
      {/* LOGO */}
      <img src={logoImage} alt="Logo" className="w-[152px]" />
      {/* <div className="flex items-center gap-2">
        <img src={XImage} alt="Logo" className="w-[55px] h-[63px]" />
        <div className="flex-1 flex items-center">
          <span className="w-full h-full text-[clamp(24px,5vw,50px)] font-bold text-variable-collection-primary-color">
            Law
          </span>
        </div>
      </div> */}

      {/* MENU */}
      <div className="flex flex-col justify-between h-full">
        <ul className="flex flex-col gap-2">
          {menuItems.map((item, index) => (
            <NavLink key={index} to={item.link}>
              {({ isActive }) => (
                <li
                  className={`flex items-center gap-3 px-3 py-2 rounded-xl cursor-pointer transition
                  ${
                    isActive
                      ? "bg-variable-collection-primary-color text-white"
                      : "text-gray-500 hover:bg-variable-collection-primary-color/50 hover:text-white"
                  }`}
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </li>
              )}
            </NavLink>
          ))}
        </ul>

        {/* LOGOUT */}
        <div>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-3 w-full px-3 py-2 rounded-xl text-red-500 hover:bg-red-500 hover:text-white transition"
          >
            <LogoutIcon />
            <span>تسجيل خروج</span>
          </button>
        </div>
      </div>
    </div>
  );
  if (menuItems == null) {
    return <Navigate to="/unauthorized" replace />;
  }
  return (
    <div className="flex">
      {/* MOBILE TOP BAR */}
      <div className="sm:hidden fixed top-0 left-0 right-0 bg-blue-600 text-white flex items-center px-4 py-3 z-50">
        <button onClick={() => setMobileOpen(true)}>
          <MenuIcon />
        </button>
        <span className="ml-4 font-semibold">Menu</span>
      </div>

      {/* MOBILE DRAWER */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="bg-black/40 w-full"
            onClick={() => setMobileOpen(false)}
          />
          <div className="bg-white h-full" style={{ width: drawerWidth }}>
            <DrawerContent />
          </div>
        </div>
      )}

      {/* DESKTOP DRAWER */}
      <div
        className="hidden sm:block h-screen border-l bg-white"
        style={{ width: drawerWidth }}
      >
        <div className="h-16" />
        <DrawerContent />
      </div>

      {/* LOGOUT MODAL */}
      <ConfirmDialog
        open={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={logout}
        title="تأكيد تسجيل الخروج"
        description="هل أنت متأكد من رغبتك في تسجيل الخروج؟ سيتم إنهاء جلستك الحالية وستحتاج إلى تسجيل الدخول مرة أخرى للوصول إلى بياناتك."
        confirmText="تسجيل الخروج"
      />
    </div>
  );
}
