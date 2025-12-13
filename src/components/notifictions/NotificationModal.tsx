import React, { useEffect, useRef } from "react";
import { useNotificationViewModel } from "../../viewmodels/useNotificationViewModel";

interface Props {
  onHide: () => void;
}

const NotificationModal: React.FC<Props> = ({ onHide }) => {
  const { notifications, hideNotification } = useNotificationViewModel();
  const modalRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onHide();
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [onHide]);

  return (
    <div className="fixed inset-0 z-40 flex justify-end items-start pt-12 bg-black/0">

      {/* Click-outside overlay */}
      <div className="absolute inset-0" onClick={onHide}></div>

      {/* MODAL */}
      <div
        ref={modalRef}
        className="relative bg-[#1F1F1F] w-[700px] max-h-[330px] rounded-xl shadow-2xl overflow-hidden z-50"
      >
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-800">
          <h2 className="text-white text-lg font-semibold">Notifications</h2>

          <button
            onClick={onHide}
            className="text-gray-300 hover:text-white text-sm"
          >
            ✕
          </button>
        </div>

        {/* List */}
        <div className="px-6 py-4 overflow-y-auto max-h-[250px] space-y-5">
          {notifications.length === 0 ? (
            <p className="text-gray-400 text-sm">No notifications available.</p>
          ) : (
            [...notifications].reverse().map((n) => (
              <div key={n.id} className="flex gap-5">
                <img src={n.icon} className="w-6 h-6 mt-1" />

                <div className="flex-1">
                  <p className="text-[#8BC34A] font-semibold text-[17px]">
                    {n.title}
                  </p>
                  <p className="text-white text-sm">{n.message}</p>
                  <p className="text-gray-500 text-xs mt-1">{n.timestamp}</p>

                  <button
                    className="text-red-400 text-xs mt-1 hover:underline"
                    onClick={() => hideNotification(n.id)}
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};

export default NotificationModal;
