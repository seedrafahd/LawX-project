import { X } from "lucide-react";

export default function SharedModal({
  isOpen = true,
  title,
  description,
  titleId,
  icon,
  onClose,
  children,
  footer,
  primaryLabel,
  primaryIcon,
  primaryType = "button",
  primaryForm,
  onPrimaryClick,
  secondaryLabel,
  secondaryIcon,
  onSecondaryClick,
}) {
  if (!isOpen) return null;

  const modalFooter =
    footer ||
    (primaryLabel || secondaryLabel ? (
      <>
        {secondaryLabel && (
          <button
            type="button"
            onClick={onSecondaryClick || onClose}
            className="flex items-center gap-2 px-8 py-3 text-sm font-bold text-gray-700 transition hover:text-gray-900"
          >
            {secondaryIcon}
            {secondaryLabel}
          </button>
        )}
        {primaryLabel && (
          <button
            type={primaryType}
            form={primaryForm}
            onClick={onPrimaryClick}
            className="flex items-center gap-2 rounded-lg bg-variable-collection-primary-color px-10 py-3 text-sm font-bold text-white shadow-lg shadow-[#40558C]/25 transition hover:bg-[#344878]"
          >
            {primaryIcon}
            {primaryLabel}
          </button>
        )}
      </>
    ) : null);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#00000066] px-4 py-6 font-sans backdrop-blur-[6px]"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <div
        className={`flex max-h-[calc(100vh-3rem)] w-full max-w-lg flex-col overflow-hidden rounded-xl bg-white text-right shadow-2xl`}
      >
        <div className="flex flex-shrink-0 items-start justify-between border-b border-gray-100 p-6">
          <div className="flex gap-4">
            {icon && (
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#DAE1FF] text-variable-collection-primary-color">
                {icon}
              </div>
            )}
            <div className="space-y-1">
              <h2 id={titleId} className="font-bold text-gray-900">
                {title}
              </h2>
              {description && (
                <p className="text-xs text-gray-500">{description}</p>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="إغلاق"
            className="flex h-10 w-10 items-center justify-center rounded-full text-gray-600 hover:bg-gray-200"
          >
            <X />
          </button>
        </div>

        <div className={`min-h-0 flex-1 overflow-y-auto`}>{children}</div>

        {modalFooter && (
          <div className="flex flex-shrink-0 items-center justify-end gap-6 bg-[#F3F4F5] px-8 py-6 sm:px-10">
            {modalFooter}
          </div>
        )}
      </div>
    </div>
  );
}
