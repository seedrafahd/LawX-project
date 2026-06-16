import { useState, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import NotificationsHeader from "../components/NotificationsHeader";
import NotificationsTabs from "../components/NotificationsTabs";
import NotificationCard from "../components/NotificationCard";
import Loader from "../../../shared/components/Loading";
import {
  useNotifications,
  useMarkAsRead,
  useMarkAllAsRead,
} from "../hooks/useNotifications";
import {
  getNotificationStyle,
  getTimeAgo,
  formatDate,
} from "../helpers/constants";

function isToday(dateString) {
  const date = new Date(dateString?.replace(" ", "T"));
  const today = new Date();
  return date.toDateString() === today.toDateString();
}

function isYesterday(dateString) {
  const date = new Date(dateString.replace(" ", "T"));
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return date.toDateString() === yesterday.toDateString();
}

function transformNotification(item, isRead) {
  const style = getNotificationStyle(item.type);
  return {
    id: item.id,
    type: style.type,
    title: style.title,
    description: item.data?.message || "",
    time: getTimeAgo(item.created_at),
    isRead,
    created_at: item.created_at,
    originalType: item.type,
    data: item.data,
  };
}

function getNotificationLink(item) {
  const shortName = item.originalType?.split("\\").pop() || "";
  if (shortName === "Send_Proposal_Notification" && item.data?.proposal_id) {
    return `/marketplace/my_offers/offer_details/${item.data.proposal_id}`;
  }
  if (shortName === "Create_Invoice_Notification" && item.data?.invoice_id) {
    return `/invoices/${item.data.invoice_id}`;
  }
  return null;
}

export default function NotificationsPage() {
  const navigate = useNavigate();
  const { data, isPending } = useNotifications();
  const markAsRead = useMarkAsRead();
  const markAllAsRead = useMarkAllAsRead();
  const [activeTab, setActiveTab] = useState("all");

  const allNotifications = useMemo(() => {
    if (!data) return [];
    const unread = (data.unread || []).map((item) =>
      transformNotification(item, false),
    );
    const read = (data.read || []).map((item) =>
      transformNotification(item, true),
    );
    return [...unread, ...read].sort(
      (a, b) => new Date(b.created_at) - new Date(a.created_at),
    );
  }, [data]);
  console.log(allNotifications);
  const filteredNotifications = useMemo(() => {
    if (activeTab === "all") return allNotifications;
    return allNotifications.filter((item) => item.type === activeTab);
  }, [allNotifications, activeTab]);

  const groupedNotifications = useMemo(() => {
    const groups = {};
    filteredNotifications.forEach((item) => {
      let groupKey;
      if (isToday(item.created_at || "")) groupKey = "اليوم";
      else if (isYesterday(item.created_at || "")) groupKey = "أمس";
      else groupKey = formatDate(item.created_at);
      if (!groups[groupKey]) groups[groupKey] = [];
      groups[groupKey].push(item);
    });
    return groups;
  }, [filteredNotifications]);

  const handleNotificationClick = useCallback(
    (item) => {
      if (!item.isRead) {
        markAsRead.mutate(item.id);
      }
      const link = getNotificationLink(item);
      if (link) navigate(link);
    },
    [markAsRead, navigate],
  );

  const handleMarkAllAsRead = useCallback(() => {
    markAllAsRead.mutate();
  }, [markAllAsRead]);

  if (isPending) {
    return <Loader />;
  }

  if (allNotifications.length === 0) {
    return (
      <div className="space-y-8">
        <NotificationsHeader />
        <div className="text-center py-16 text-gray-500">
          <p className="text-lg">لا توجد إشعارات</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <NotificationsHeader
          onMarkAllAsRead={handleMarkAllAsRead}
          isLoading={markAllAsRead.isPending}
        />
        <NotificationsTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      {Object.entries(groupedNotifications)?.length > 0 ? (
        Object.entries(groupedNotifications).map(([dateGroup, items]) => (
          <div key={dateGroup}>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-blue-600"></span>
              <h2 className="text-lg font-bold text-gray-800">{dateGroup}</h2>
            </div>

            <div className="space-y-3">
              {items.map((item) => (
                <NotificationCard
                  key={item.id}
                  item={item}
                  onClick={() => handleNotificationClick(item)}
                />
              ))}
            </div>
          </div>
        ))
      ) : (
        <p className="rounded-xl bg-white p-8 text-center text-sm font-semibold text-gray-500">
          لا توجد إشعارات بعد
        </p>
      )}
    </div>
  );
}
