const tabs = [
  { key: "all", label: "الكل" },
  { key: "pending", label: "قيد الانتظار", dot: "bg-amber-400" },
  { key: "accepted", label: "مقبول", dot: "bg-emerald-500" },
  { key: "rejected", label: "مرفوض", dot: "bg-red-500" },
];

export default function FilterTabs({ activeTab, onChange }) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {tabs.map((tab) => {
        const active = activeTab === tab.key;
        return (
          <button
            key={tab.key}
            type="button"
            onClick={() => onChange(tab.key)}
            className={`flex min-w-[112px] items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-bold transition ${
              active
                ? "bg-[#34467d] text-white shadow-sm"
                : "bg-white text-slate-700 shadow-sm ring-1 ring-slate-100 hover:bg-slate-50"
            }`}
          >
            {tab.dot && <span className={`h-2 w-2 rounded-full ${tab.dot}`} />}
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
