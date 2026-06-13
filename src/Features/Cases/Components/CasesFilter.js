export function FilterToolbar({ handleChange, teamMembers = [] }) {
  console.log(teamMembers);
  return (
    <div className="flex flex-wrap items-end gap-6">
      {/* state */}
      <div className="flex flex-col gap-1">
        <label className="text-xs text-gray-500 pr-[2px]">الحالة</label>
        <select
          className="bg-gray-50 border-none rounded-xl px-3 py-2 text-sm min-w-[140px]"
          onChange={(e) => handleChange("status", e.target.value)}
        >
          <option value="">الكل</option>
          <option value="pending">قيد المعالجة</option>
          <option value="closed">مغلقة</option>
          <option value="open">مفتوحة</option>
        </select>
      </div>

      {/* lawyer */}
      <div className="flex flex-col gap-1">
        <label className="text-xs text-gray-500 pr-[2px]">المحامي</label>
        <select
          className="bg-gray-50 border-none rounded-xl px-3 py-2 text-sm min-w-[160px]"
          onChange={(e) => handleChange("lawyer", e.target.value)}
        >
          <option value=""> الكل</option>
          {teamMembers.map((member) => {
            const name = member.name;
            return (
              <option key={name} value={name}>
                {name}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
}
