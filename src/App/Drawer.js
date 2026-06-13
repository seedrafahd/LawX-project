import { Navigate, NavLink } from "react-router-dom";
import { useAuth } from "../Features/Auth/Hooks/useAuth";
import { useState } from "react";
import ConfirmDialog from "../shared/Components/ConfirmDialog";
import logoImage from "./Assets/lawX.png";

// Icons
import DashboardIcon from "@mui/icons-material/Dashboard";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import SettingsIcon from "@mui/icons-material/Settings";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import StarsOutlinedIcon from "@mui/icons-material/StarsOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ArticleIcon from "@mui/icons-material/Article";
import LogoutIcon from "@mui/icons-material/Logout";
import { Bell } from "lucide-react";

const DRAWER_WIDTH = 230;

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
  { icon: <BusinessCenterIcon />, label: "القضايا", link: "cases" },
  { icon: <BusinessCenterIcon />, label: "المهام", link: "tasks" },
  {
    icon: <BusinessCenterIcon />,
    label: "سوق الطلبات",
    link: "marketplace/requests",
  },
  {
    icon: <BusinessCenterIcon />,
    label: "عروضي",
    link: "marketplace/my_offers",
  },
  { icon: <Bell />, label: "الإشعارات", link: "notifications" },
];

export default function MyDrawer({ mobileOpen, onMobileClose }) {
  const { logout, user } = useAuth();
  const role = user?.role;

  const [showModal, setShowModal] = useState(false);

  const menuItems =
    role === "super_admin"
      ? superAdminMenuItems
      : role === "admin"
        ? officeAdminMenuItems
        : null;
  if (!menuItems) {
    return <Navigate to="/unauthorized" replace />;
  }

  const DrawerContent = () => (
    <div className="h-full flex flex-col justify-between py-4 px-6 gap-5">
      {/* LOGO */}
      <img src={logoImage} alt="lawX_Logo" className="w-[152px]" />

      {/* MENU */}
      <div className="flex flex-col justify-between h-full">
        <ul className="flex flex-col gap-2">
          {menuItems.map((item, index) => (
            <NavLink key={index} to={item.link} onClick={onMobileClose}>
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

  return (
    <div className="flex">
      {/* MOBILE DRAWER */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] flex justify-start sm:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={onMobileClose}
          />
          <div
            className="relative h-full bg-white shadow-2xl"
            style={{ width: DRAWER_WIDTH }}
          >
            <DrawerContent />
          </div>
        </div>
      )}

      {/* DESKTOP DRAWER */}
      <div
        className="hidden sm:block h-screen border-l bg-white overflow-hidden"
        style={{ width: DRAWER_WIDTH }}
      >
        <div className="h-16" />
        <div className="h-[calc(100vh-64px)]">
          <DrawerContent />
        </div>
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
