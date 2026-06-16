import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";

const badgeStyles = {
  primary: "bg-[#D6E3FB] text-variable-collection-primary-color",
  blue: "bg-blue-100 text-blue-700",
  yellow: "bg-[#FEF9C3]/30 text-[#ED8224]",
  orange: "bg-[#FFDBCB] text-[#783100]",
  green: "bg-[#DCFCE7] text-[#22C55E]",
  red: "bg-red-100 text-red-700",
};
export default function SharedBadge({ text, color }) {
  // const [color, setColor] = useState("primary");
  return (
    <span
      className={`px-3 py-1 h-fit rounded-full text-xs font-bold ${
        badgeStyles[color]
      }`}
    >
      {text}
    </span>
  );
}

export const StatusDropdown = ({ value, options, onChange }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selected = options.find((item) => item.value === value);

  return (
    <div ref={dropdownRef} className={`relative`}>
      {/* Trigger */}
      <button
        onClick={() => setOpen(!open)}
        className={`
          flex
          justify-between
          px-3
          py-1
          rounded-full
          text-xs
          font-bold
          ${badgeStyles[selected.color]}
        `}
      >
        <span>{selected?.label}</span>

        <ChevronDown
          size={16}
          className={`transition ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* Menu */}
      {open && (
        <div
          className="
            absolute
            right-0
            mt-2
            w-fit
            bg-white
            rounded-2xl
            border
            shadow-lg
            z-50
            overflow-hidden
          "
        >
          <div className="px-4 pt-3 pb-2 text-xs text-gray-500">
            تغيير الحالة
          </div>

          {options.map((item) => (
            <button
              key={item.value}
              onClick={() => {
                onChange(item.value);
                setOpen(false);
              }}
              className="w-full px-3 py-2 flex items-center gap-2 hover:bg-gray-100 transition"
            >
              <div className="flex items-center justify-start gap-2">
                <span>{item.label}</span>
              </div>

              {value === item.value && (
                <Check size={16} className="text-blue-600" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
