import SharedField from "../../../../shared/components/SharedFeild";

export default function GenerateVariables({
  variables,
  customValues,
  setCustomValues,
}) {
  return (
    <div className="rounded-lg border border-gray-300 bg-white shadow-sm">
      {/* Header */}
      <div className="rounded-t-lg border-b border-gray-300 bg-gray-50 p-6">
        <h2 className="text-xl font-semibold text-[#0B2D5B]">
          المتغيرات والمحرر
        </h2>

        <p className="text-gray-500">أدخل البيانات المطلوبة لتخصيص القالب</p>
      </div>

      {/* Form */}
      <div className="space-y-8 p-6 pb-8">
        {variables.length ? (
          variables.map((variable, index) => (
            <SharedField key={index} label={variable}>
              <input
                className="h-12 w-full rounded-lg border border-gray-300 bg-gray-50 px-4 text-sm text-gray-700 outline-none transition placeholder:text-gray-400"
                placeholder="ادخل القيمة..."
                value={customValues[variable] || ""}
                onChange={(e) =>
                  setCustomValues({
                    ...customValues,
                    [variable]: e.target.value,
                  })
                }
              />
            </SharedField>
          ))
        ) : (
          <div className="rounded-xl bg-white p-8 text-center text-sm font-semibold text-gray-500">
            لا يوجد حقول لتعبئتها
          </div>
        )}
      </div>
    </div>
  );
}
