import { useLocation, useNavigate } from "react-router-dom";
import { pageConfig } from "./Config/pageConfig";
import { Plus, Search } from "lucide-react";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import NotificationsIcon from "@mui/icons-material/Notifications";
import img from "./Assets/image-person.png";
import SharedButton from "../shared/Components/SharedButton";

export default function MyAppBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPage =
    pageConfig[location.pathname] ||
    (location.pathname.startsWith("/cases/case_details")
      ? pageConfig["/cases/case_details"]
      : {});

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 border-b border-[#CAC4D080] bg-white text-variable-collection-primary-color">
      <div className="flex h-full items-center justify-between px-5 py-4 sm:px-6">
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
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                id="outlined-multiline-flexible"
                type="search"
                placeholder={currentPage.search}
                className="bg-[#eff1f8] rounded-2xl border border-gray-300 px-4 py-3 pr-9 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-variable-collection-primary-color focus:ring-2 focus:ring-variable-collection-primary-color/15"
              />
            </div>

            <SharedButton
              icon={<Plus size={18} />}
              onClick={(e) => navigate("/cases/create")}
            >
              إضافة قضية
            </SharedButton>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <button
              type="button"
              className="items-center justify-center rounded-full text-[#868686] transition hover:bg-gray-100"
            >
              <NotificationsIcon />
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
