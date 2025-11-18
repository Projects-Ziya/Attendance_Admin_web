import React from "react";
import { useNotificationViewModel } from "../../viewmodels/useNotificationViewModel";

interface Props {
  onHide: () => void;
}

const NotificationModal: React.FC<Props> = ({ onHide }) => {
  const { notifications, hideNotification } = useNotificationViewModel();

  return (
    // Instead of full-screen fixed, make this absolute
    <div className="absolute top-12 right-0 z-50">
      <div className="w-[748px] h-[273px] bg-[#181818] rounded-[10px] overflow-y-auto scrollable pt-[31px] pl-[46px] flex shadow-lg">
        {/* Notifications */}
        <div className="flex flex-col pr-[48px] space-y-[10px]">
          {notifications.map((n) => (
            <div key={n.id} className="flex items-start gap-[32px]">
              <img src={n.icon} className="w-[21px] h-[25px] mt-1" />
              <div>
                <h3
                  className="font-semibold text-[18px]"
                  style={{
                    color: n.type === "success" ? "#8BC34A" : "#00BCD4",
                  }}
                >
                  {n.title}
                </h3>
                <p className="text-[#FFFFFF] text-[14px] leading-[20px]">
                  {n.message}
                </p>
                <button
                  className="text-xs text-red-400 mt-1"
                  onClick={() => hideNotification(n.id)}
                >
                  Dismiss
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Header with Hide button */}
        <div className="me-[10px]">
          <button
            className="text-[#FFFFFF] text-[18px] mt-[11px] w-[126px] h-[43px] rounded-md hover:bg-white hover:text-black transition"
            onClick={onHide}
          >
            Hide
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationModal;
