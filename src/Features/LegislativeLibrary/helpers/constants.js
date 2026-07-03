export const initialForm = {
  title: "",
  country: "",
  effective_date: "",
  category: "",
  content: "",
  number: "",
  status: "active",
  book: "",
  part: "",
  chapter: "",
  related_legislation_ids: [],
  articles: [],
};

export const INITIAL_LIBRARY_FILTERS = {
  country: "",
  status: "",
  category: "",
  title: "",
};

export const STATUS_OPTIONS = [
  { value: "", label: "الكل" },
  { value: "active", label: "مفعل" },
  { value: "amended", label: "معدل" },
  { value: "repealed", label: "ملغي" },
];

export const statusStyles = {
  active: { color: "green", text: "مفعل" },
  amended: { color: "yellow", text: "معدل" },
  repealed: { color: "red", text: "ملغي" },
};
