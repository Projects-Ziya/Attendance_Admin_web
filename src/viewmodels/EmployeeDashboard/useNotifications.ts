import { useState, useEffect } from "react";
import type { Notification } from "../../models/employeeDashboad/Notification";
import { fallbackNotifications } from "../../models/employeeDashboad/Notification";
import { fetchNotifications } from "../../services/employeeDashboard/employeeDashboardServices";
import toast from "react-hot-toast";

export function useNotificationsVM() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    fetchNotifications()
      .then((data) => {
        if (isMounted) setNotifications(data);
      })
      .catch(() => {
        if (isMounted) setNotifications(fallbackNotifications);
        setError("Failed to load notifications from API.");
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const handleActionClick = (id: string) => {
    toast(`Action for notification ID: ${id}`);
  };

  return { notifications, loading, error, handleActionClick };
}
