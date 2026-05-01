import CaseCard from "./CaseCard";

export default function OfficeListView() {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <CaseCard key={i} />
      ))}
    </div>
  );
}

function OfficeCaseCard() {
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border-r-4 border-blue-500">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-bold">قضية تجارية - شركة النور</h3>
        <img
          alt=""
          src="https://i.pravatar.cc/40"
          className="w-8 h-8 rounded-full"
        />
      </div>

      <p className="text-sm text-gray-500 mb-3">تفاصيل مختصرة عن القضية...</p>

      <div className="w-full bg-gray-100 rounded-full h-2">
        <div className="bg-blue-500 h-2 rounded-full w-[60%]" />
      </div>
    </div>
  );
}
