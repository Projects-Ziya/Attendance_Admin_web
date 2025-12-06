import { useEffect, useState } from "react";
import api from "../Api/api";
import img1 from "../assets/img1.svg";

export interface NotificationItem {
  id: number;
  title: string;
  message: string;
  timestamp: string;
  icon?: string;
}

export const useNotificationViewModel = () => {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  const fetchNotifications = async () => {
    try {
      const response = await api.get("/api/notification-list-admin/");
      const apiData = response.data?.data || [];

      const formatted = apiData.map((n: any) => ({
        id: n.id,
        title: n.title || "Notification",
        message: n.action,
        timestamp: n.timestamp,
        icon: img1,
      }));

      setNotifications(formatted);
    } catch (error) {
      console.error("Notification fetch failed:", error);
      setNotifications([]);
    }
  };

  const hideNotification = (id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return {
    notifications,
    hideNotification,
  };
};
