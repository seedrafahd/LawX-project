export const initialForm = {
  case_id: "",
  date: "",
  time: "",
  location: "",
  nots: "",
};

export const statusOptions = [
  { value: "cancelled", label: "مؤجلة", color: "blue" },
  { value: "completed", label: "تمت", color: "green" },
  { value: "pending", label: "قادمة", color: "yellow" },
];

export const statusStyles = {
  completed: "green",
  upcoming: "blue",
  postponed: "yelow",
};

export const statusText = {
  completed: "تمت",
  pending: "قادمة",
  cancelled: "مؤجلة",
};
