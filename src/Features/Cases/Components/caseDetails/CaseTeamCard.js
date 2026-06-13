import { MessageCircle } from "lucide-react";

export default function CaseTeamCard({ team, onEditTeam }) {
  const members = team || [];
  return (
    <div className="bg-white rounded-2xl shadow-sm p-5">
      <h3 className="mb-4">الفريق المكلف</h3>

      {members.length > 0 ? (
        members.map((member, i) => {
          const name = member.name || member.email || "";
          const initial = name ? name.charAt(0).toUpperCase() : "?";
          return (
            <div key={member.user_id || i} className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-sm font-bold">
                  {initial}
                </div>
                <div>
                  <p className="text-sm font-semibold">{name}</p>
                  <p className="text-xs text-gray-400">{member.role_in_case}</p>
                </div>
              </div>
              <MessageCircle className="w-5 h-5 text-gray-500" />
            </div>
          );
        })
      ) : (
        <p className="text-sm font-semibold text-gray-500 mb-4">غير محدد</p>
      )}

      <button
        onClick={onEditTeam}
        className="w-full border border-dashed rounded-xl py-2 text-sm text-gray-500 hover:border-[#40558C] hover:text-[#40558C] transition"
      >
        تعديل الفريق
      </button>
    </div>
  );
}
