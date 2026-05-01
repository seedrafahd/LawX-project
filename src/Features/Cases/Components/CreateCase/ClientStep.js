import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import StepNavigation from "./StepNavigation";

export default function ClientStep({ formData, setFormData, onNext }) {
  const clients = [
    {
      id: "5f8ea816-03fe-4726-b537-9975f4dbeadd",
      name: "أحمد العلي",
    },
  ];

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex justify-between px-4 py-[18px] text-variable-collection-primary-color">
        <div className="flex gap-2 text-variable-collection-primary-color">
          <PersonSearchIcon />
          <h2 className="text-xl font-semibold">اختيار العميل</h2>
        </div>
        إضافة عميل جديد
      </div>

      {/* Cards */}
      <div className="space-y-[14px] px-[25px] pt-3 pb-[18px]">
        {/* <input
          type="text"
          placeholder="🔍 ابحث عن العميل بالاسم ، الهوية أو رقم الجوال..."
          className="w-full border rounded-lg px-[10px] py-2  outline-none"
        /> */}

        {/* Selected Item */}
        {clients.map((client) => {
          const isSelected = formData.client_id === client.id;

          return (
            <div
              key={client.id}
              onClick={() => setFormData({ ...formData, client_id: client.id })}
              className={`border rounded-lg px-3 py-2 flex justify-between items-center cursor-pointer transition hover:bg-variable-collection-primary-color/10
        ${isSelected ? "bg-variable-collection-primary-color/10 border-variable-collection-primary-color" : "bg-white"}
      `}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-variable-collection-primary-color/25 flex items-center justify-center">
                  {client.name.charAt(0)}
                </div>

                <div>
                  <p className="font-medium text-gray-700">{client.name}</p>
                  <p className="text-sm text-gray-600">رقم الجوال</p>
                </div>
              </div>

              {isSelected && (
                <CheckCircleOutlineOutlinedIcon className="text-variable-collection-primary-color text-xl" />
              )}
            </div>
          );
        })}
      </div>

      {/* Buttons */}

      <StepNavigation onNext={onNext} disableNext={!formData.client_id} />
    </div>
  );
}
