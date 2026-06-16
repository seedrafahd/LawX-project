import { Dialog, DialogContent } from "@mui/material";

export default function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = "تأكيد",
  confirmColor = "bg-red-700 hover:bg-red-800",
  icon = "⚠️",
}) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      BackdropProps={{
        sx: {
          backdropFilter: "blur(6px)",
          backgroundColor: "rgba(0,0,0,0.4)",
        },
      }}
      PaperProps={{
        sx: {
          borderRadius: "20px",
          backdropFilter: "blur(20px)",
          boxShadow: "0 30px 80px rgba(0,0,0,0.08)",
          padding: "24px",
          width: "400px",
          textAlign: "center",
          direction: "rtl",
        },
      }}
    >
      <DialogContent>
        {/* Icon */}
        <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center text-xl">
          {icon}
        </div>

        {/* Title */}
        <h2 className="text-lg font-bold text-gray-800 mb-2 text-center">
          {title}
        </h2>

        {/* Description */}
        <p className="text-gray-500 text-sm leading-relaxed mb-6 text-center">
          {description}
        </p>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onConfirm}
            className={`flex-1 rounded-xl ${confirmColor} py-2 px-6 text-white transition shadow-md`}
          >
            {confirmText}
          </button>

          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-xl border bg-[#E7E8E9] border-gray-200 text-black hover:bg-gray-300 transition"
          >
            إلغاء
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
