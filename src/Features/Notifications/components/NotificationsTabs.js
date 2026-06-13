import { tabs } from "../helpers/constants";

export default function NotificationsTabs({ activeTab, setActiveTab }) {
  return (
    <div className="flex flex-wrap gap-3 pb-4 border-b-2 border-gray-200">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => setActiveTab(tab.key)}
          className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
                  ${
                    activeTab === tab.key
                      ? "bg-[#1E2B5B] text-white shadow-sm"
                      : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
                  }
                `}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}