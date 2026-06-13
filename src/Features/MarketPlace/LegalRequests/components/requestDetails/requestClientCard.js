import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";

export default function RequestClientCard({ request }) {
  return (
    <div className="bg-white rounded-xl text-center p-6 space-y-6">
      <div className="flex gap-4">
        <div className="w-16 h-16 rounded-full bg-[#D8E2FF] text-blue-800 flex items-center justify-center">
          <AccountCircleOutlinedIcon />
        </div>
        <div className="text-start">
          <h4 className="font-extrabold text-gray-900">
            {request.client_info?.full_name || "غير محدد"}
          </h4>

          <p className="text-blue-700">{request.client_info?.email}</p>
        </div>
      </div>
      <div className="space-y-4 pt-4">
        <div className="flex justify-between">
          <p className="text-gray-600">المدينة:</p>
          <p className="text-gray-900 font-bold">{request.location_request}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-gray-600">تاريخ النشر:</p>
          <p className="text-gray-900 font-bold">{request.created_at}</p>
        </div>
      </div>
    </div>
  );
}
