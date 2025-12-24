import React from "react";
import EditUserSvgIcon from "./EditUserSvgIcon";

interface EditProjectButtonProps {
  onClick: () => void;   // ✅ required now
  className?: string;
}

const EditProjectButton: React.FC<EditProjectButtonProps> = ({ onClick, className }) => {
  return (
    <div className={className}>
      <button
        onClick={onClick} // ✅ trigger parent state
        className="group w-[220px] bg-[#00A0E3] text-white text-sm font-medium py-2 rounded-md mb-8 flex items-center justify-center hover:bg-[#0085C8] transition-colors"
      >
        <EditUserSvgIcon active={false} /> {/* ✅ no local state here */}
        <span className="font-poppins font-medium text-[16px] leading-[16px] tracking-[0.08em] text-center">
          Edit Project
        </span>
      </button>
    </div>
  );
};

export default EditProjectButton;
