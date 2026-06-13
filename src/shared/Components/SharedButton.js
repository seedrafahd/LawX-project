export default function SharedButton({
  children,
  icon,
  type = "button",
  colors = "bg-variable-collection-primary-color text-white hover:bg-[#26365d]",
  className = "",
  ...props
}) {
  return (
    <button
      type={type}
      className={`flex w-fit items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-bold ${colors} transition ${className}`}
      {...props}
    >
      {icon}
      {children}
    </button>
  );
}
