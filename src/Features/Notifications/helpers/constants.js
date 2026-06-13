import { FileText, DollarSign, CalendarDays, AlertCircle, Bell } from "lucide-react";

export const tabs = [
  { key: "all", label: "الكل" },
  { key: "proposal", label: "العروض" },
  { key: "invoice", label: "الفواتير" },
  { key: "case", label: "القضايا" },
  { key: "hearing", label: "الجلسات" },
  { key: "document", label: "المستندات" },
];

const typeMapping = {
  Send_Proposal_Notification: {
    type: "proposal",
    title: "عرض جديد",
    icon: <FileText size={20} />,
    bg: "bg-indigo-700",
  },
  Create_Invoice_Notification: {
    type: "invoice",
    title: "فاتورة جديدة",
    icon: <DollarSign size={20} />,
    bg: "bg-emerald-600",
  },
  Hearing_Notification: {
    type: "hearing",
    title: "جلسة جديدة",
    icon: <CalendarDays size={20} />,
    bg: "bg-violet-600",
  },
  Document_Notification: {
    type: "document",
    title: "مستند جديد",
    icon: <FileText size={20} />,
    bg: "bg-indigo-700",
  },
  Case_Notification: {
    type: "case",
    title: "تحديث قضية",
    icon: <AlertCircle size={20} />,
    bg: "bg-blue-600",
  },
};

const defaultStyle = {
  type: "alert",
  title: "إشعار",
  icon: <Bell size={20} />,
  bg: "bg-gray-600",
};

export function getNotificationStyle(notificationClass) {
  const shortName = notificationClass?.split("\\").pop() || "";
  return typeMapping[shortName] || defaultStyle;
}

export function getTimeAgo(dateString) {
  if (!dateString) return "";
  const now = new Date();
  const date = new Date(dateString.replace(" ", "T"));
  const diffMs = now - date;
  const seconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) return "الآن";
  if (minutes < 60) return `منذ ${minutes} دقيقة`;
  if (hours < 24) return `منذ ${hours} ساعة`;
  if (days === 1) return "أمس";
  return `منذ ${days} أيام`;
}

export function formatDate(dateString) {
  if (!dateString) return "";
  const date = new Date(dateString.replace(" ", "T"));
  const options = { year: "numeric", month: "long", day: "numeric" };
  return date.toLocaleDateString("ar-EG", options);
}