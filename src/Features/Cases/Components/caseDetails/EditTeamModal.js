import { useState, useEffect } from "react";
import { Trash2, Plus } from "lucide-react";
import SharedModal from "../../../../shared/Components/SharedModal";
import { useClients } from "../../Hooks/useClient";

const ROLE_OPTIONS = [
  "باحث قانوني",
  "محامي",
  "شريك",
  "مستشار",
  "مساعد قانوني",
];

export default function EditTeamModal({
  isOpen,
  onClose,
  team = [],
  onSave,
  isUpdating,
}) {
  const { data: clientsData } = useClients();
  const [members, setMembers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [selectedRole, setSelectedRole] = useState(ROLE_OPTIONS[0]);

  useEffect(() => {
    if (isOpen) {
      setMembers(team.map((m) => ({ ...m })));
      setSelectedUserId("");
      setSelectedRole(ROLE_OPTIONS[0]);
    }
  }, [isOpen, team]);

  const allUsers = Array.isArray(clientsData)
    ? clientsData
    : Array.isArray(clientsData?.data)
      ? clientsData.data
      : [];

  const removeMember = (userId) => {
    setMembers((prev) => prev.filter((m) => m.user_id !== userId));
  };

  const addMember = () => {
    if (!selectedUserId) return;
    const user = allUsers.find((u) => u.ID === parseInt(selectedUserId));
    if (!user) return;
    if (members.some((m) => m.user_id === user.ID)) return;

    setMembers((prev) => [
      ...prev,
      {
        user_id: user.ID,
        name: user.full_name || user.email || "",
        email: user.email || "",
        role_in_case: selectedRole,
      },
    ]);
    setSelectedUserId("");
    setSelectedRole(ROLE_OPTIONS[0]);
  };

  const availableUsers = allUsers.filter(
    (u) => !members.some((m) => m.user_id === u.ID),
  );

  return (
    <SharedModal
      isOpen={isOpen}
      title="تعديل الفريق"
      description="قم بإضافة أو حذف أعضاء الفريق"
      titleId="edit-team-title"
      onClose={onClose}
      onSecondaryClick={onClose}
      primaryLabel="حفظ التعديلات"
      secondaryLabel="إلغاء"
      primaryType="button"
      onPrimaryClick={() => onSave(members)}
    >
      <div className="p-6 space-y-6">
        <div>
          <h4 className="text-sm font-bold text-gray-700 mb-3">
            أعضاء الفريق الحاليون
          </h4>
          {members.length === 0 ? (
            <p className="text-sm text-gray-500 py-4 text-center">
              لا يوجد أعضاء في الفريق
            </p>
          ) : (
            <div className="space-y-2">
              {members.map((member, i) => {
                const name = member.name || member.email || "";
                const initial = name ? name.charAt(0).toUpperCase() : "?";
                return (
                  <div
                    key={member.user_id || i}
                    className="flex items-center justify-between bg-gray-50 rounded-lg p-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-sm font-bold">
                        {initial}
                      </div>
                      <div>
                        <p className="text-sm font-semibold">{name}</p>
                        <p className="text-xs text-gray-400">
                          {member.role_in_case}
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeMember(member.user_id)}
                      className="text-red-500 hover:text-red-700 p-1"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="border-t pt-4">
          <h4 className="text-sm font-bold text-gray-700 mb-3">
            إضافة عضو جديد
          </h4>
          <div className="flex flex-col sm:flex-row gap-2">
            <select
              value={selectedUserId}
              onChange={(e) => setSelectedUserId(e.target.value)}
              className="flex-1 h-10 rounded-lg border border-gray-300 bg-gray-50 px-3 text-sm outline-none focus:border-[#40558C]"
            >
              <option value="">اختر عضواً</option>
              {availableUsers.map((u) => (
                <option key={u.ID} value={u.ID}>
                  {u.full_name || u.email || `#${u.ID}`}
                </option>
              ))}
            </select>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="w-full sm:w-32 h-10 rounded-lg border border-gray-300 bg-gray-50 px-3 text-sm outline-none focus:border-[#40558C]"
            >
              {ROLE_OPTIONS.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={addMember}
              disabled={!selectedUserId}
              className="flex items-center justify-center gap-1 px-4 h-10 bg-[#40558C] text-white rounded-lg text-sm font-bold disabled:opacity-40 hover:bg-[#344878] transition"
            >
              <Plus size={16} />
              إضافة
            </button>
          </div>
        </div>
      </div>
    </SharedModal>
  );
}
