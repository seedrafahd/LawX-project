import { useLocation, useNavigate } from "react-router-dom";
import { pageConfig } from "./Config/pageConfig";
import { ArrowRight, Menu, Plus } from "lucide-react";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Badge from "@mui/material/Badge";
import img from "./Assets/image-person.png";
import SharedButton from "../shared/components/SharedButton";
import { useNotifications } from "../Features/Notifications/hooks/useNotifications";
import { useAuth } from "../Features/Auth/hooks/useAuth";

export default function MyAppBar({ onMenuClick }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { profile } = useAuth();

  const isLawyer = profile?.lawer_state === "licensed";
  const isOfficeOwner = profile?.Has_Office;

  const { data } = useNotifications();
  const unreadCount = data?.unread?.length || 0;

  const matchedPageKey = Object.keys(pageConfig)
    .sort((firstKey, secondKey) => secondKey.length - firstKey.length)
    .find(
      (key) =>
        location.pathname === key || location.pathname.startsWith(`${key}/`),
    );
  const currentPage = pageConfig[matchedPageKey] || {};

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 border-b border-[#CAC4D080] bg-white text-variable-collection-primary-color">
      <div className="flex h-full items-center justify-between px-5 py-4 sm:px-6">
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="فتح القائمة"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-variable-collection-primary-color transition hover:bg-variable-collection-primary-color/10 sm:hidden"
        >
          <Menu size={22} />
        </button>

        {currentPage.type === "dashboard" ? (
          <div className="hidden min-w-0 sm:block space-y-[6px]">
            <h1 className="truncate text-2xl font-bold text-variable-collection-GREY-textcolor">
              {currentPage.title || "لوحة التحكم"}
            </h1>
            {currentPage.subtitle && (
              <p className="truncate text-lg font-semibold text-gray-500">
                {currentPage.subtitle}
              </p>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-[10px]">
            <HomeRoundedIcon />
            <h1 className="truncate text-lg font-bold text-variable-collection-GREY-textcolor">
              {currentPage.title}
            </h1>
          </div>
        )}

        {currentPage.type === "dashboard" ? (
          <div className="flex items-center gap-4 ">
            {isLawyer && !isOfficeOwner && (
              <SharedButton
                icon={<ArrowRight size={18} />}
                onClick={(e) => navigate("/office_management/activate")}
              >
                إنشاء مكتب
              </SharedButton>
            )}
            {isLawyer && (
              <SharedButton
                icon={<Plus size={18} />}
                onClick={(e) => navigate("/cases/create")}
              >
                إضافة قضية
              </SharedButton>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => navigate("/notifications")}
              className="items-center justify-center rounded-full text-[#868686] transition hover:bg-gray-100"
            >
              <Badge
                badgeContent={unreadCount}
                color="error"
                invisible={unreadCount === 0}
              >
                <NotificationsIcon />
              </Badge>
            </button>
            <img
              src={img}
              alt="profile"
              className="h-10 w-10 rounded-full bg-[#868686] "
            />
          </div>
        )}
      </div>
    </header>
  );
}
