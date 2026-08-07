export const STATUS_OPTIONS = [
  { value: "", label: "الكل" },
  { value: "in_progress", label: "بانتظار التوقيع" },
  { value: "completed", label: "تم التوقيع" },
];

export const statusStyles = {
  pending: { color: "yellow", text: "قيد الانتظار" },
  in_progress: { color: "yellow", text: "قيد الانتظار" },
  completed: { color: "green", text: "تم التوقيع" },
};
