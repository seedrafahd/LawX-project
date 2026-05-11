export default function AuthCheckbox({
  checked,
  children,
  className = "",
  onChange,
}) {
  return (
    <label
      className={`flex items-center gap-2 text-sm text-gray-800 ${className}`}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="h-4 w-4"
      />
      {children}
    </label>
  );
}
