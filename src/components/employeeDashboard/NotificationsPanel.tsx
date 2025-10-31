import React, { useEffect, useState } from "react";
import pensil from "../../assets/icons/pensil.png";
import { useParams } from "react-router-dom";
import api from "../../Api/api";

export type Notification = {
  id: number;
  user_name: string;
  action: string;
  title: string;
  timestamp: string;
};

type Props = {
  onActionClick?: (id: number) => void;
};

const NotificationsPanel: React.FC<Props> = ({ onActionClick }) => {
  const { id } = useParams<{ id: string }>();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false); // 👈 new state

  // Fetch Notifications API
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await api.get(`/api/notificationsuser/${id}/`);
        if (response?.data?.data) {
          setNotifications(response.data.data);
        } else {
          throw new Error("Invalid API response");
        }
      } catch (err: any) {
        console.error("Error fetching notifications:", err);
        setError(err.message || "Failed to fetch notifications");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchNotifications();
  }, [id]);

  // Loading state
  if (loading)
    return (
      <div className="bg-white rounded-md shadow p-6 text-center text-gray-500">
        Loading notifications...
      </div>
    );

  // Error state
  if (error)
    return (
      <div className="bg-white rounded-md shadow p-6 text-center text-red-500">
        {error}
      </div>
    );

  // Empty state
  if (!notifications.length)
    return (
      <div className="bg-white rounded-md shadow p-6 text-center text-gray-500">
        No notifications available
      </div>
    );

  // ✅ Decide how many notifications to show
  const visibleNotifications = showAll
    ? notifications
    : notifications.slice(0,3);

  return (
    <div
      className="
        bg-[#FCFCFC] rounded-[10px] shadow-[0px_0px_2px_0px_#00000040]
        p-3 sm:p-4 md:p-6 2xl:pt-7 2xl:px-9 lg:w-[739px] 2xl:pb-12
      "
    >
      {/* Header */}
      <span
        className="
          block text-[16px] sm:text-[18px] 2xl:text-[24px]
          text-[#4D4D4D] font-medium mb-3
        "
      >
        Notifications
      </span>

      <div className="border-t border-[#43C8FF] mb-3" />

      {/* Notifications List */}
      <div className="flex flex-col gap-3 sm:gap-5 md:gap-7 lg:gap-9 py-3 md:py-5">
        {visibleNotifications.map((item) => (
          <div
            key={item.id}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-start sm:items-center"
          >
            {/* Avatar */}
            <div
              className="w-12 h-12 sm:w-14 sm:h-14 2xl:w-[60px] 2xl:h-[60px]
              rounded-full flex items-center justify-center text-white text-lg font-semibold"
              style={{
                backgroundColor:
                  item.title === "Late"
                    ? "#FF7043"
                    : item.title === "Missed Punch In"
                    ? "#E53935"
                    : "#43C8FF",
              }}
            >
              {item.user_name?.charAt(0).toUpperCase()}
            </div>

            {/* Text Section */}
            <div className="flex-1 text-center sm:text-left">
              <span
                className={`block font-medium text-[16px] sm:text-[18px]
                  ${
                    item.title === "Late"
                      ? "text-[#FF7043]"
                      : item.title === "Missed Punch In"
                      ? "text-[#E53935]"
                      : "text-[#4D4D4D]"
                  }
                `}
              >
                {item.action}
              </span>

              <div className="flex flex-col md:flex-row items-center justify-between gap-2 md:gap-4 mt-1">
                <span className="text-[14px] sm:text-[16px] font-normal text-[#909090]">
                  {item.timestamp}
                </span>

                <button
                  className="flex items-center gap-2 text-[#00A0E3] text-[15px] sm:text-[16px] 2xl:text-[18px]
                    font-normal cursor-pointer border-b border-[#00A0E3]
                    hover:text-[#008ACC] transition-colors duration-200"
                  onClick={() => onActionClick && onActionClick(item.id)}
                >
                  <img
                    src={pensil}
                    className="inline-block w-4 h-4 sm:w-5 sm:h-5"
                    alt="✏"
                  />
                  <span>Edit log</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 👇 View All / Show Less Button */}
      {notifications.length > 3 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="
            block mt-4 text-[13px] sm:text-[14px] font-medium
            text-[#6B7280] hover:text-[#00A0E3] text-center sm:text-left
            transition-colors duration-200
          "
        >
          {showAll ? "Show Less" : "View All"}
        </button>
      )}
    </div>
  );
};

export default NotificationsPanel;
