export default function NotificationsHeader({ onMarkAllAsRead, isLoading }) {
  return (
    <div className="flex items-center justify-between mb-2">
      <h1 className="text-xl font-bold text-gray-900">الإشعارات</h1>

      <button
        onClick={onMarkAllAsRead}
        disabled={isLoading}
        className="text-sm font-semibold text-blue-600 hover:text-blue-700 disabled:text-gray-400 disabled:cursor-not-allowed"
      >
        {isLoading ? "جاري التحديث..." : "تحديد الكل كمقروء"}
      </button>
    </div>
  );
}