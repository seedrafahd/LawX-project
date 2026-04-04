import HomeRoundedIcon from "@mui/icons-material/HomeRounded";

export const pageConfig = {
  "/login": {
    type: "dashboard",
    title: "LAWX",
  },
  "/packages": {
    title: "إدارة باقات الاشتراك",
  },
  "/features": {
    title: "إدارة ميزات النظام",
  },
  "/dashboard": {
    type: "dashboard",
    title: "لوحة التحكم",
    subtitle: " مرحبا بعودتك! إليك أهم التحديثات اليوم",
    search: "البحث عن مستخدم باستخدام الاسم الأول، الاسم الأخير، أو الإيميل...",
    // addLabel: "إضافة قضية",
  },

  "/employee": {
    title: "/إدارة المحامين والموظفين",
    icon: HomeRoundedIcon,
  },
  "/cases": {
    title: "/إدارة القضايا",
  },
  "/evaluation": {
    title: "/نظام التقييم والنقاط",
  },
  "/templates": {
    title: "نظام القوالب القانونية",
  },
  "/law": {
    title: "نظام البيانات القانونية",
  },
  "/settings": {
    title: "الإعدادات",
  },
};
