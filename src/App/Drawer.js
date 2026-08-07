import { Navigate, NavLink } from "react-router-dom";
import { useAuth } from "../Features/Auth/hooks/useAuth";
import { useState } from "react";
import ConfirmDialog from "../shared/components/ConfirmDialog";
import logoImage from "./Assets/lawX.png";

// Icons
import DashboardIcon from "@mui/icons-material/Dashboard";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import {
  Bell,
  ClipboardCheck,
  HandCoins,
  LayoutTemplate,
  Scale,
  ShoppingBag,
} from "lucide-react";

const DRAWER_WIDTH = 230;

// const syndicateMenuItems = [
//   // {
//   //   icon: <AccountCircleOutlinedIcon />,
//   //   label: "الملف الشخصي",
//   //   link: "profile",
//   // },
//   // { icon: <SettingsIcon />, label: "الإعدادات", link: "settings" },
// ];

export default function MyDrawer({ mobileOpen, onMobileClose }) {
  const { logout, user, profile } = useAuth();
  const role = user?.role;
  const type = profile?.lawer_state;

  const [showModal, setShowModal] = useState(false);

  const isSyndicate = role === "syndicate";
  const isLawyer = type === "licensed";
  const isOfficeMember = profile?.Employed_In_Office;
  const isOfficeOwner = profile?.Has_Office;

  const showInvitations = !isOfficeMember && !isOfficeOwner && !isSyndicate;

  const showOfficeManagement = isOfficeOwner;

  const canViewCases = isLawyer;

  const showTasks = role !== "syndicate";

  const menuItems = [
    { icon: <DashboardIcon />, label: "لوحة التحكم", link: "dashboard" },

    isSyndicate && {
      icon: <PersonIcon />,
      label: "المحاميين",
      link: "lawyers",
    },

    showOfficeManagement && {
      icon: <DashboardIcon />,
      label: "إدارة المكتب",
      link: "office_management",
    },

    showInvitations && {
      icon: <PersonIcon />,
      label: "دعواتي",
      link: "my_receive_invitations",
    },

    canViewCases && {
      icon: <BusinessCenterIcon />,
      label: "القضايا",
      link: "cases",
    },

    showTasks && { icon: <ClipboardCheck />, label: "المهام", link: "tasks" },

    isLawyer && {
      icon: <ShoppingBag />,
      label: "سوق الطلبات",
      link: "marketplace/requests",
    },
    isLawyer && {
      icon: <HandCoins />,
      label: "عروضي",
      link: "marketplace/my_offers",
    },

    {
      icon: <Scale />,
      label: " قانون",
      link: "laws",
    },
    {
      icon: <LayoutTemplate />,
      label: " قوالب",
      link: "templates",
    },
    { icon: <Bell />, label: "الإشعارات", link: "notifications" },
  ].filter(Boolean);

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
        onConfirm={() => {
          setShowModal(false);
          logout();
        }}
        title="تأكيد تسجيل الخروج"
        description="هل أنت متأكد من رغبتك في تسجيل الخروج؟ سيتم إنهاء جلستك الحالية وستحتاج إلى تسجيل الدخول مرة أخرى للوصول إلى بياناتك."
        confirmText="تسجيل الخروج"
      />
    </div>
  );
}
