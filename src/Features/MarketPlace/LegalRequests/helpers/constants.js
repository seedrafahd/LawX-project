export const INITIAL_REQUESTS_FILTERS = {
  tab: "public",
  specialty: "",
  city: "",
  status: "",
  title: "",
};

export const MARKETPLACE_TABS = [
  { id: "public", label: "الطلبات العامة" },
  { id: "private", label: "الطلبات الموجهة لي" },
];

export const SPECIALTY_OPTIONS = [
  { value: "", label: "الكل" },
  { value: "real_estate", label: "عقاري" },
  { value: "commercial", label: "تجاري" },
  { value: "administrative", label: "إداري" },
];

export const CITY_OPTIONS = [
  { value: "", label: "الكل" },
  { value: "damascus", label: "دمشق" },
  { value: "aleppo", label: "حلب" },
  { value: "homs", label: "حمص" },
];

export const STATUS_OPTIONS = [
  { value: "", label: "الكل" },
  { value: "open", label: "مفتوح" },
  { value: "in_progress", label: "قيد المراجعة" },
  { value: "close", label: "مغلق" },
];

export const statusStyles = {
  in_progress: { color: "yellow", text: "قيد الانتظار" },
  open: { color: "primary", text: "مفتوح" },
  close: { color: "green", text: "مغلق" },
};
