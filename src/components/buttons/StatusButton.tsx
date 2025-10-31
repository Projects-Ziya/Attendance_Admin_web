import React from "react";
import { GoDotFill } from "react-icons/go";

interface StatusButtonProps {
  status: "Active" | "Inactive";
}

const StatusButton: React.FC<StatusButtonProps> = ({ status }) => {
  const isActive = status === "Active";

  return (
    <span
      className={`flex items-center gap-1 py-1 px-3 rounded-lg text-sm font-medium ${
        isActive ? "bg-[#E0FFF1] text-[#03C96F] w-[95px]" : "bg-[#FFE4E4] text-[#F11515]"
      }`}
    >
      <GoDotFill className={isActive ? "text-[#03C96F]" : "text-[#F11515]"}/>{status}
    </span>
  );
};

export default StatusButton;
