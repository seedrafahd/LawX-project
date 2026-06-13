export default function IconActionButton({
  icon: Icon,
  onClick,
  variant = "primary",
}) {
  const variants = {
    primary:
      "bg-variable-collection-primary-color/20 text-variable-collection-primary-color",

    danger:
      "bg-variable-collection-error-color/20 text-variable-collection-error-color",
  };

  return (
    <button
      onClick={onClick}
      className={`rounded-full p-[10px] ${variants[variant]}`}
    >
      <Icon size={16} />
    </button>
  );
}
