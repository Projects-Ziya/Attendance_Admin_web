import React from "react";
import PresentHrs from "../../assets/images/icons/Present_Hrs.svg";
import AbsentHrs from "../../assets/images/icons/Absent_Hrs.svg";
import LateHrs from "../../assets/images/icons/Late_Hrs.svg";

interface HoursButtonProps {
  Hours: string;
  status: "Present" | "Late" | "Absent";
}

const HoursButton: React.FC<HoursButtonProps> = ({ Hours, status }) => {

  let bgColor = "";
  let textColor = "";
  let Icon = null;

  switch (status) {
    case "Present":
      bgColor = "bg-[#E0FFF1]";
      textColor = "text-green-500";
      Icon = <img src={PresentHrs} alt="Present" className="w-4 h-4" />;
      break;
    case "Late":
      bgColor = "bg-[#FFEFE4]";
      textColor = "text-orange-500";
      Icon = <img src={LateHrs} alt="Late" className="w-4 h-4" />;
      break;
    case "Absent":
      bgColor = "bg-[#FFE4E4]";
      textColor = "text-red-500";
      Icon = <img src={AbsentHrs} alt="Absent" className="w-4 h-4" />;
      break;
    default:
      bgColor = "bg-gray-100";
      textColor = "text-gray-500";
  }

  return (
    <div>
    <span
      className={`inline-flex items-center gap-1 py-1 px-2 pr-3 rounded-sm text-sm font-medium w-fit ${bgColor} ${textColor}`}
    >
      {Icon}
      {Hours}
    </span>
    </div>
  );
};

export default HoursButton;
