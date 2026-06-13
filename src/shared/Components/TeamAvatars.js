export default function TeamAvatars({ team = [] }) {
  const members = Array.isArray(team) ? team : [team];
  const validMembers = members.filter((m) => m && (m.name || m.email));
  if (validMembers.length === 0) return null;

  return (
    <div className="relative group">
      <div className="flex">
        {validMembers.slice(0, 4).map((member, i) => {
          const name = member.name || member.email || "";
          const initial = name ? name.charAt(0).toUpperCase() : "?";
          return (
            <div
              key={member.user_id || i}
              className="w-9 h-9 rounded-full border-2 border-white bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold -ml-3 last:ml-0"
              title={name}
            >
              {initial}
            </div>
          );
        })}
        {validMembers.length > 4 && (
          <div className="w-9 h-9 rounded-full border-2 border-white bg-gray-100 text-gray-500 flex items-center justify-center text-xs font-bold -ml-3">
            +{validMembers.length - 4}
          </div>
        )}
      </div>

      {validMembers.length > 0 && (
        <div
          className="absolute -top-10 left-1/2 -translate-x-1/2
                opacity-0 group-hover:opacity-100
                transition-all duration-200 whitespace-nowrap
                bg-gray-200 text-gray-700 text-xs font-bold px-2 py-1 rounded-xl shadow-lg"
        >
          {validMembers.map((m) => m.name || m.email || "?").join(" - ")}
        </div>
      )}
    </div>
  );
}
