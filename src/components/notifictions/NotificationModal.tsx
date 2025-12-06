import React from "react";
import { useNotificationViewModel } from "../../viewmodels/useNotificationViewModel";

interface Props {
  onHide: () => void;
}

const NotificationModal: React.FC<Props> = ({ onHide }) => {
  const { notifications, hideNotification } = useNotificationViewModel();

  return (
    <div className="absolute top-12 right-0 z-50">
      <div className="w-[748px] h-[273px] bg-[#181818] rounded-[10px] overflow-y-auto pt-[31px] pl-[46px] flex shadow-lg">
        <div className="flex flex-col pr-[48px] space-y-[10px]">
          {notifications.map((n) => (
            <div key={n.id} className="flex items-start gap-[32px]">
              <img src={n.icon} className="w-[21px] h-[25px] mt-1" />
              <div>
                <h3 className="font-semibold text-[18px] text-[#8BC34A]">
                  {n.title}
                </h3>

                <p className="text-white text-[14px]">{n.message}</p>

                <p className="text-gray-400 text-[12px] mt-1">
                  {n.timestamp}
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

        <div className="me-[10px]">
          <button
            className="text-white text-[18px] mt-[11px] w-[126px] h-[43px] rounded-md hover:bg-white hover:text-black transition"
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
