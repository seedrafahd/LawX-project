export const getMarketplaceStats = (requests) => {
  return [
    {
      title: "الطلبات المتاحة حالياً",
      value: requests.public?.length || 0,
    },

    {
      title: "طلبات موجهة إليك",
      value: requests.private?.length || 0,
    },
  ];
};
