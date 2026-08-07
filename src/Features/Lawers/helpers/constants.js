export const initialForm = {
  national_id: "",
  full_name: "",
  father_name: "",
  mother_name: "",
  mother_family_name: "",
  birth_place: "",
  birth_date: "",
  civil_registry_number: "",
  syndicate_card_number: "",
  syndicate_branch: "",
  lawyer_state: "licensed",
};

export const INITIAL_LAWYERS_FILTERS = {
  page: 1,
  search_fullname: "",
  lawyer_state: "",
  is_suspended: "",
};

export const LAWYER_TYPE_OPTIONS = [
  { value: "", label: "الكل" },
  { value: "licensed", label: "مؤستذ" },
  { value: "trainee", label: "متدرب" },
];

export const STATUS_OPTIONS = [
  { value: "", label: "الكل" },
  { value: "0", label: "نشط" },
  { value: "1", label: "معلق" },
];

export const memberStatusStyles = {
  0: { color: "green", text: "نشط" },
  1: { color: "yellow", text: "معلق" },
  false: { color: "green", text: "نشط" },
  true: { color: "yellow", text: "معلق" },
};

export const LAWYER_STATUS_OPTIONS = [
  { value: "false", label: "نشط", color: "green" },
  { value: "true", label: "معلق", color: "red" },
];

export const LAWYER_STATE_OPTIONS = [
  { value: "licensed", label: "محامي", color: "blue" },
  { value: "trainee", label: "متدرب", color: "yellow" },
];
