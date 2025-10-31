import React from "react";
import { Pencil } from "lucide-react";

interface EditUserSvgIconProps {
  active?: boolean;
  onClick?: () => void;
}

const EditUserSvgIcon: React.FC<EditUserSvgIconProps> = ({ active = false, onClick }) => {
  return (
    <div className="relative inline-block mr-1 " onClick={onClick}>
      {/* Main User Icon */}
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className=" rounded"
      >
        {/* User Head */}
        <circle
          cx="16"
          cy="12"
          r="4"
          stroke="white"
          strokeWidth="1"
          fill="none"
        />

        {/* Shoulders Arc */}
        <path
          d="M8 23.5 A8 8 0 0 1 24 23.5"
          stroke="white"
          strokeWidth="1"
          fill="none"
          strokeLinecap="round"
        />
      </svg>

      {/* Pencil Icon */}
      <Pencil
          size={14.5}
          className={`absolute bottom-0 right-0 rounded-full p-[2px] mb-1 transition-colors 
            ${active ? "bg-[#0085C8]" : "bg-[#00A0E3]"} 
            group-hover:bg-[#0085C8]`}
        />

    </div>
  );
};

export default EditUserSvgIcon;
