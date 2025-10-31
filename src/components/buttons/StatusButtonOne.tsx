import React from "react";

interface StatusButtonProps {
  status: "On Going" | "On Hold"| "Overdue"| "Completed";
}

const StatusButtonOne: React.FC<StatusButtonProps> = ({ status }) => {
  let bgColor = "";
  let textColor = "";

  switch (status) {
    case "On Going":
      bgColor = "bg-[#E6F7FF]"; 
      textColor = "text-ziyablue"; 
      break;
    case "On Hold":
      bgColor = "bg-[#FFF4E6]"; 
      textColor = "text-[#FF9800]"; 
      break;
    case "Overdue":
      bgColor = "bg-[#FFE4E4]"; 
      textColor = "text-[#F11515]"; 
      break;
    case "Completed":
      bgColor = "bg-[#E0FFF1]"; 
      textColor = "text-[#03C96F]"; 
      break;
  }

  return (
    <div>
    <span
      className={`inline-flex items-center gap-1 py-1 px-3 rounded-lg text-sm font-medium ${bgColor} ${textColor}`}
    >
      {status}
    </span>
    </div>
  );
};

export default StatusButtonOne;
