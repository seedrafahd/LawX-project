export const getPaymentPlanName = (plan_id) => {
  switch (plan_id) {
    case "percentage_collection":
      return "نسبة";

    case "installments":
      return "أقساط شهرية";
    case "fixed_proposal":
      return "حسب العرض";

    default:
      break;
  }
};
