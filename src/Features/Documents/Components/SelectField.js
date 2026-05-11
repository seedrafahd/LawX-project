import { ChevronLeft, FileText } from "lucide-react";

export default function SelectField({
  value,
  onChange,
  placeholder,
  compactValue,
}) {
  const documentTypes = [
    "عقد",
    "مذكرة دفاع",
    "محضر جلسة",
    "توكيل",
    "مستند قضية",
  ];

  return (
    <div className="relative">
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-[57px] w-full appearance-none rounded-[10px] border border-[#c9c6d1] bg-[#f8f8f9] px-12 py-3 text-right text-[15px] font-medium text-[#303541] outline-none transition focus:border-[#344474] focus:bg-white focus:ring-4 focus:ring-[#344474]/10"
      >
        <option value="">{compactValue || placeholder}</option>
        {documentTypes.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>
      <ChevronLeft
        className="pointer-events-none absolute left-6 top-1/2 -translate-y-1/2 text-[#252b36]"
        size={25}
        strokeWidth={2.8}
      />
      {compactValue && (
        <FileText
          className="pointer-events-none absolute right-6 top-1/2 -translate-y-1/2 text-[#0d65e8]"
          size={18}
          fill="#0d65e8"
          strokeWidth={2.3}
        />
      )}
    </div>
  );
}
