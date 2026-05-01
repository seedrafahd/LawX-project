import XImage from "../../../App/Assets/X.png";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";

export default function AuthAppBar() {
  return (
    <header className="w-full bg-[#f8fafccc] border-b border-[#7b7c7c26]">
      <div className=" mx-auto flex items-center justify-between px-4 sm:px-6 py-3">
        {/* Logo */}
        <div className="flex items-end gap-1">
          <img
            alt="Logo"
            src={XImage}
            className="w-6 h-8 sm:w-8 sm:h-10 md:w-10 md:h-12"
          />
          <span className="text-2xl sm:text-4xl md:text-5xl font-serif text-variable-collection-primary-color">
            law
          </span>
        </div>

        {/* Left Icons */}
        <div className="flex items-center gap-3 sm:gap-5">
          <DarkModeOutlinedIcon
            sx={{ color: "#868686" }}
            className="w-6 h-6 sm:w-8 sm:h-8"
          />
          <HelpOutlineOutlinedIcon
            sx={{ color: "#868686" }}
            className="w-6 h-6 sm:w-8 sm:h-8"
          />
        </div>
      </div>
    </header>
  );
}
