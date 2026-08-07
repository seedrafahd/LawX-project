export default function AuthInput({
  action,
  icon,
  label,
  onChange,
  placeholder,
  type = "text",
  value,
}) {
  return (
    <div className={`flex flex-col gap-2`}>
      {(label || action) && (
        <div className="flex items-center justify-between">
          {label && (
            <label className="text-xs font-bold text-gray-800">{label}</label>
          )}
          {action}
        </div>
      )}

      <div className="relative">
        <input
          required={true}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`w-full rounded-xl border border-[#CBD3DF] px-4 py-3 text-right shadow-sm outline-none focus:border-[#3f4b7f] sm:py-4`}
        />
        {icon && (
          <span className="absolute left-4 top-1/2 flex -translate-y-1/2 text-[#868686]">
            {icon}
          </span>
        )}
      </div>
    </div>
  );
}
