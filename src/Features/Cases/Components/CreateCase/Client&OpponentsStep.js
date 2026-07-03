import { useState } from "react";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import RemoveCircleOutlineOutlinedIcon from "@mui/icons-material/RemoveCircleOutlineOutlined";
import StepNavigation from "./StepNavigation";
import StepHeader from "./StepHeader";

export default function ClientAndOpponentsStep({
  formData,
  setFormData,
  onNext,
  clients,
}) {
  const [opponentInput, setOpponentInput] = useState({
    name: "",
    type: "individual",
    national_id: "",
    phone: "",
  });

  const addOpponent = () => {
    if (!opponentInput.name.trim()) return;
    const newOpponent = { ...opponentInput, name: opponentInput.name.trim() };
    const updated = [...(formData.opponents || []), newOpponent];
    setFormData("opponents", updated);
    setOpponentInput({
      name: "",
      type: "individual",
      national_id: "",
      phone: "",
    });
  };

  const removeOpponent = (index) => {
    const updated = formData.opponents.filter((_, i) => i !== index);
    setFormData("opponents", updated);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm">
      <StepHeader icon={<PersonSearchIcon />} title="اختيار العميل" />

      {/* Clients */}
      <div className="space-y-[14px] px-[25px] pt-3 pb-[18px] border-b">
        {clients.map((client) => {
          const isSelected = formData.clients?.[0]?.user_id === client.id;

          return (
            <div
              key={client.id}
              onClick={() => {
                setFormData("clients", [
                  {
                    user_id: client.id,
                    name: client.full_name,
                    is_primary: true,
                  },
                ]);
              }}
              className={`border rounded-lg px-3 py-2 flex justify-between items-center cursor-pointer transition hover:bg-variable-collection-primary-color/10
        ${isSelected ? "bg-variable-collection-primary-color/10 border-variable-collection-primary-color" : "bg-white"}
      `}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-variable-collection-primary-color/25 flex items-center justify-center">
                  {client.full_name.charAt(0)}
                </div>

                <div>
                  <p className="font-medium text-gray-700">
                    {client.full_name}
                  </p>
                  <p className="text-sm text-gray-600">
                    العنوان: {client.address}
                  </p>
                </div>
              </div>

              {isSelected && (
                <CheckCircleOutlineOutlinedIcon className="text-variable-collection-primary-color text-xl" />
              )}
            </div>
          );
        })}
      </div>

      {/* Opponents */}
      <StepHeader icon={<PersonSearchIcon />} title="إضافة الخصوم" />
      <div className="space-y-3 px-[25px] pt-3 pb-[18px] border-b">
        <div className="grid grid-cols-2 gap-3">
          <input
            type="text"
            placeholder="اسم الخصم"
            value={opponentInput.name}
            onChange={(e) =>
              setOpponentInput({ ...opponentInput, name: e.target.value })
            }
            className="border rounded-lg px-3 py-2 outline-none text-sm"
          />
          <select
            value={opponentInput.type}
            onChange={(e) =>
              setOpponentInput({ ...opponentInput, type: e.target.value })
            }
            className="border rounded-lg px-3 py-2 outline-none text-sm bg-white"
          >
            <option value="individual">فرد</option>
            <option value="company">شركة</option>
            <option value="covernment_entity">جهة حكومية</option>
          </select>
          <input
            type="number"
            placeholder="رقم الهوية"
            value={opponentInput.national_id}
            onChange={(e) =>
              setOpponentInput({
                ...opponentInput,
                national_id: e.target.value,
              })
            }
            className="border rounded-lg px-3 py-2 outline-none text-sm"
          />
          <input
            type="number"
            placeholder="رقم الجوال"
            value={opponentInput.phone}
            onChange={(e) =>
              setOpponentInput({ ...opponentInput, phone: e.target.value })
            }
            className="border rounded-lg px-3 py-2 outline-none text-sm"
          />
        </div>

        <button
          onClick={addOpponent}
          disabled={
            !opponentInput.name.trim() ||
            opponentInput.national_id.length < 10 ||
            opponentInput.phone.length < 10
          }
          className="flex items-center gap-1 text-sm text-variable-collection-primary-color font-medium disabled:opacity-40"
        >
          <AddCircleOutlineOutlinedIcon fontSize="small" />
          إضافة الخصم
        </button>

        {formData.opponents?.length > 0 && (
          <div className="space-y-2 pt-2 border-t">
            {formData.opponents.map((opp, i) => (
              <div
                key={i}
                className="flex items-center justify-between bg-gray-50 rounded-lg px-3 py-2"
              >
                <div>
                  <p className="font-medium text-gray-700 text-sm">
                    {opp.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {opp.type === "company"
                      ? "شركة"
                      : opp.type === "entity"
                        ? "جهة"
                        : "فرد"}
                    {opp.national_id && ` • ${opp.national_id}`}
                    {opp.phone && ` • ${opp.phone}`}
                  </p>
                </div>
                <button onClick={() => removeOpponent(i)}>
                  <RemoveCircleOutlineOutlinedIcon className="text-red-500 text-lg" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Buttons */}
      <StepNavigation
        onNext={onNext}
        disableNext={!formData.clients?.[0] || !formData.opponents.length}
      />
    </div>
  );
}
