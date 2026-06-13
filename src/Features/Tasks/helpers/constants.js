import { Check, Clock3, PauseCircle } from "lucide-react";

export const initialForm = {
  case_id: "",
  title: "",
  description: "",
  due_date: "",
  assigned_to: "",
  task_status: "",
};

export const stats = [
  {
    title: "إجمالي المهام",
    value: 42,
    bg: "bg-white",
    text: "text-gray-900",
  },
  {
    title: "مكتمل",
    value: 22,
    bg: "bg-[#F0FDF4]",
    text: "text-[#14532D]",
  },
  {
    title: "قيد الانتظار",
    value: 12,
    bg: "bg-[#FACC15]/30",
    text: "text-[#390C00]",
  },
  {
    title: "جاري العمل",
    value: 8,
    bg: "bg-[#D6E3FB]",
    text: "text-[#0F1C2D]",
  },
];

export const statusConfig = {
  completed: {
    label: "مكتمل",
    bg: "bg-[#DCFCE7]",
    text: "text-[#15803D]",
    icon: <Check size={14} />,
  },

  in_progress: {
    label: "جاري العمل",
    bg: "bg-[#0050CB]/10",
    text: "text-[#0050CB]",
    icon: <Clock3 size={14} />,
  },

  pending: {
    label: "قيد الانتظار",
    bg: "bg-[#A33200]/10",
    text: "text-[#A33200]",
    icon: <PauseCircle size={14} />,
  },
};

export const statusOptions = [
  { value: "in_progress", label: "جاري العمل", color: "blue" },
  { value: "completed", label: "مكتمل", color: "green" },
  { value: "pending", label: "قيد الانتظار", color: "yellow" },
];
