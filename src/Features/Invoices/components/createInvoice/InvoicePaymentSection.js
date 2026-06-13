import { Clock } from "lucide-react";
import { SectionCard } from "../SectionCard";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import RemoveCircleOutlineOutlinedIcon from "@mui/icons-material/RemoveCircleOutlineOutlined";
import { useState } from "react";

export default function InvoicePaymentSection({
  paymentMode,
  setPaymentMode,
  form,
  setForm,
  errors,
}) {
  const [newItem, setNewItem] = useState({
    title: "",
    description: "",
    amount: "",
  });

  const inputClass = "border rounded-lg px-3 py-2 outline-none text-sm";

  const addItem = () => {
    if (!newItem.title.trim() || !newItem.amount) return;
    setForm("items", [
      ...(form.items || []),
      { ...newItem, amount: Number(newItem.amount) },
    ]);
    setNewItem({ title: "", description: "", amount: "" });
  };

  const removeItem = (index) => {
    setForm(
      "items",
      form.items.filter((_, i) => i !== index),
    );
  };

  return (
    <SectionCard icon={<Clock className="h-5 w-5" />} title="بنود الفاتورة">
      <div className="space-y-6">
        <div className="space-y-3 px-[25px] pt-3 pb-[18px] border-b">
          <div className="grid grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="عنوان البند"
              value={newItem.title}
              onChange={(e) =>
                setNewItem({ ...newItem, title: e.target.value })
              }
              className={inputClass}
            />
            <input
              type="text"
              placeholder="وصف البند"
              value={newItem.description}
              onChange={(e) =>
                setNewItem({ ...newItem, description: e.target.value })
              }
              className={inputClass}
            />
            <input
              type="number"
              min={0}
              placeholder="قيمة البند"
              value={newItem.amount}
              onChange={(e) =>
                setNewItem({ ...newItem, amount: e.target.value })
              }
              className={inputClass}
            />
          </div>

          <button
            onClick={addItem}
            disabled={!newItem.title.trim() || !newItem.amount}
            className="flex items-center gap-1 text-sm text-variable-collection-primary-color font-medium disabled:opacity-40"
          >
            <AddCircleOutlineOutlinedIcon fontSize="small" />
            إضافة البند
          </button>
          {errors.items && (
            <p className="text-sm font_bold text-red-500">{errors.items}</p>
          )}

          {form.items?.length > 0 && (
            <div className="space-y-2 pt-2 border-t">
              {form.items.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between bg-gray-50 rounded-lg px-3 py-2"
                >
                  <div>
                    <p className="font-medium text-gray-700 text-sm">
                      {item.title}
                    </p>
                    <p className="text-xs text-gray-500">
                      {item.description}
                      {item.amount && ` - ${item.amount}`}
                    </p>
                  </div>
                  <button onClick={() => removeItem(i)}>
                    <RemoveCircleOutlineOutlinedIcon className="text-red-500 text-lg" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </SectionCard>
  );
}
