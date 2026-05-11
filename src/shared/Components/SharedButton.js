export default function SharedButton({
  children,
  icon,
  type = "button",
  className = "",
  ...props
}) {
  return (
    <button
      type={type}
      className={`flex w-fit items-center gap-2 rounded-xl bg-variable-collection-primary-color px-6 py-3 text-sm font-bold text-white transition hover:bg-variable-collection-primary-color/90 ${className}`}
      {...props}
    >
      {icon}
      {children}
    </button>
  );
}
