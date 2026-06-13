export const buildInvoicePayload = ({ form, case_id, file }) => {
  const payload = new FormData();

  const total_amount = (form.items || []).reduce(
    (sum, item) => sum + Number(item.amount || 0),
    0,
  );

  payload.append("case_id", case_id);
  payload.append("total_amount", total_amount);
  payload.append("due_date", form.due_date);

  form.items?.forEach((item, index) => {
    payload.append(`items[${index}][title]`, item.title);
    payload.append(`items[${index}][description]`, item.description || "");
    payload.append(`items[${index}][amount]`, item.amount);
  });

  if (file) {
    payload.append("documents[]", file);
  }

  return payload;
};
