export default function AuthFormCard({
  children,
  className = "",
  icon,
  onSubmit,
  subtitle,
  title,
}) {
  return (
    <form
      onSubmit={onSubmit}
      className={`w-full max-w-md mx-auto flex flex-col p-6 sm:p-8 md:p-10 bg-white/80 backdrop-blur-md text-variable-collection-primary-color
         rounded-3xl border border-[#c2c6d826] shadow-sm ${className}`}
    >
      {/* Header */}
      <div className="flex flex-col items-center gap-3 pb-10">
        <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gray-200 flex items-center justify-center text-lg">
          {icon}
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center">
          {title}
        </h1>

        <p className="text-xs sm:text-sm text-center text-[#424656]">
          {subtitle}
        </p>
      </div>

      {/* Form */}
      <div className="flex flex-col gap-6">{children}</div>

      {/* Footer */}
      <div className="pt-10 flex justify-center">
        <div className="flex flex-wrap justify-center gap-3">
          <div className="px-3 py-1 bg-blue-100 rounded-full text-[10px]">
            نظام معتمد
          </div>
          <div className="px-3 py-1 bg-gray-100 rounded-full text-[10px]">
            تشفير 256-BIT
          </div>
        </div>
      </div>
    </form>
  );
}
