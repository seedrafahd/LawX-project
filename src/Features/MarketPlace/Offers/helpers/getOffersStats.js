export const getOffersStats = (offers) => {
  return [
    {
      title: "إجمالي العروض",
      value: offers.length || 0,
      bg: "bg-white",
      text: "text-gray-900",
    },

    {
      title: "قيد الانتظار",
      value: offers.length || 0,
      bg: "bg-emerald-50",
      text: "text-emerald-800",
    },
  ];
};
