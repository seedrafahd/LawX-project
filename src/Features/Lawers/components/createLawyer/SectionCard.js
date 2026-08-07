export default function SectionCard({ title, icon, children }) {
  return (
    <div className="bg-white rounded-xl border border-[#D9E1EC] shadow-[0_2px_10px_rgba(15,23,42,0.04)] overflow-hidden">
      {/* Header */}

      <div className="h-[72px] p-4 flex items-center justify-between border-b border-[#E6EBF2] bg-[#FCFCFD]">
        <div className="flex items-center gap-2">
          {icon}

          <h2 className="text-xl font-bold text-gray-900">{title}</h2>
        </div>
      </div>

      {/* Body */}

      <div className="p-6">{children}</div>
    </div>
  );
}
