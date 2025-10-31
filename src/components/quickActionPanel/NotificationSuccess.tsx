import  { useEffect } from "react";
import success from "../../assets/success.svg";

type NotificationSuccessProps = {
  message: string;
  onClose: () => void;
};

const NotificationSuccess = ({ message, onClose }: NotificationSuccessProps) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed bottom-6 right-6 px-[42px] w-[1000px] h-[119px] bg-black text-white rounded-md shadow-lg flex items-center gap-3 z-50">
      <div className="w-[43px] h-[43px]">
        <img src={success} alt="success-icon" />
      </div>
      <div>
        <div className="font-medium text-[24px] leading-[16px] tracking-[0.08em]">
          Success
        </div>
        <div className="pt-5 leading-[16px] tracking-[0.08em] text-[18px]">
          {message}
        </div>
      </div>
    </div>
  );
};

export default NotificationSuccess;
