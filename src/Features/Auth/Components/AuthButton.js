export default function AuthButton({
  children,
  className = "",
  disabled = false,
  icon,
  iconPosition = "end",
  variant = "primary",
  type = "button",
  ...props
}) {
  const variantClasses = {
    primary:
      "w-full rounded-xl bg-variable-collection-primary-color py-3 text-sm font-bold text-white shadow-md hover:bg-[#2f3a66] sm:py-4 sm:text-base",
    gradient:
      "h-12 w-full rounded-2xl bg-gradient-to-r from-[#344474] to-[#59699a] text-white sm:h-14",
    text: "p-0 text-blue-500 hover:underline",
  };

  return (
    <button
      type={type}
      disabled={disabled}
      className={`inline-flex items-center justify-center gap-2 transition disabled:cursor-not-allowed disabled:opacity-50
         ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {icon && iconPosition === "start" && icon}
      {children}
      {icon && iconPosition === "end" && icon}
    </button>
  );
}
