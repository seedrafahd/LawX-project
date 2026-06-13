import PercentIcon from "@mui/icons-material/Percent";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import LanIcon from "@mui/icons-material/Lan";

export const INITIAL_CASES_FORM = {
  title: "",
  description: "",
  case_number: 0,
  case_category: "",
  price: 0,
  importance_stars: 1,
  clients: [],
  opponents: [],
  team: [],
  workflow: "",
  billing_type: "",
  collection_percentage: null,
  payment_milestones: [],
  lead_lawyer_id: "",
  lead_lawyer_name: "",
  court: "",
};

export const CASES_TABS = [
  { id: "all", label: "كل القضايا" },
  { id: "my", label: "قضاياي" },
  { id: "office", label: "قضايا المكتب" },
];

export const INITIAL_CASES_FILTERS = {
  tab: "all",
  status: "",
  lawyer: "",
  type: "",
  court: "",
};

export const PAYMENT_TYPE_OPTIONS = [
  {
    id: "percentage_collection",
    label: "النسبة",
    icon: <PercentIcon />,
  },
  {
    id: "installments",
    label: "أقساط شهرية",
    icon: <CalendarTodayIcon />,
  },
  {
    id: "fixed_proposal",
    label: "حسب العرض",
    icon: <LanIcon />,
  },
];

export const statusOptions = [
  { value: "open", label: "مفتوحة", color: "blue" },
  { value: "close", label: "مغلقة", color: "green" },
  { value: "pending", label: "قيد الانتظار", color: "yellow" },
  { value: "archived", label: "مؤرشفة", color: "red" },
];

export const statusStyles = {
  pending: { color: "yelow", text: "قيد الانتظار" },
  open: { color: "primary", text: "مفتوح" },
  close: { color: "green", text: "مغلق" },
};
