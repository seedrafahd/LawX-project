export const buildProposalPayload = ({ form, requestId, file }) => {
  const payload = new FormData();
  console.log(form);

  payload.append("request_id", requestId);
  payload.append("price", form.price);
  payload.append("price_currency", form.price_currency);
  payload.append("estimated_days", form.estimated_days?.trim());
  payload.append("valid_until", form.valid_until);
  payload.append("payment_terms", form.payment_terms);
  payload.append("message_for_client", form.message_for_client.trim());

  payload.append("file", file || "");

  return payload;
};

export const buildUpdateOfferPayload = ({ id, form, file }) => {
  const payload = new FormData();

  payload.append("proposal_id", id);
  payload.append("price", form.price);
  payload.append("price_currency", form.price_currency);
  payload.append("estimated_days", form.estimated_days?.trim());

  if (form.message_for_client?.trim()) {
    payload.append("message_for_client", form.message_for_client.trim());
  }

  if (form.valid_until?.trim()) {
    payload.append("valid_until", form.valid_until);
  }

  if (form.payment_terms?.trim()) {
    payload.append("payment_terms", form.payment_terms);
  }

  if (file) {
    payload.append("file", file);
  }

  return payload;
};
