import { useState } from "react";

export default function AddSignerModal({ open, onClose, onAdd }) {
  const [name, setName] = useState("");
  const [role, setRole] = useState("client");

  if (!open) return null;

  const colors = {
    lawyer: "#2563eb",
    client: "#16a34a",
    bar: "#9333ea",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-[450px] rounded-xl bg-white p-6">
        <h2 className="mb-5 text-xl font-bold">إضافة موقع جديد</h2>

        <input
          placeholder="اسم الموقع"
          className="mb-4 w-full rounded-lg border p-3"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <select
          className="mb-6 w-full rounded-lg border p-3"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="lawyer">محامي</option>
          <option value="client">موكل</option>
          <option value="bar">نقابة</option>
        </select>

        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="rounded-lg border px-5 py-2">
            إلغاء
          </button>

          <button
            onClick={() => {
              onAdd({
                id: crypto.randomUUID(),
                user_id: "",
                name,
                role,
                type: "signature",
                color: colors[role],
                page: null,
                x: 0,
                y: 0,
                width: 140,
                height: 60,
                completed: false,
                status: "pending_position",
              });

              onClose();
            }}
            className="rounded-lg bg-blue-600 px-5 py-2 text-white"
          >
            إضافة
          </button>
        </div>
      </div>
    </div>
  );
}
