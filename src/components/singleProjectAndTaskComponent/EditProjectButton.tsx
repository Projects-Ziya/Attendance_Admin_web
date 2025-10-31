import React, { useState } from "react";
import EditUserSvgIcon from "./EditUserSvgIcon";

interface EditProjectButtonProps {
  onClick?: () => void;
  className?: string;  
}

const EditProjectButton: React.FC<EditProjectButtonProps> = ({ onClick }) => {
  const [active, setActive] = useState(false);

  const handleClick = () => {
    setActive(!active); // toggle pencil bg color
    onClick?.();
  };


  return (
    <div className="">
<button
  onClick={handleClick}
  className="group w-[220px] bg-[#00A0E3] text-white text-sm font-medium py-2 rounded-md mb-8 flex items-center justify-center hover:bg-[#0085C8] transition-colors"
>
  <EditUserSvgIcon active={active} />
  <span className="font-poppins font-medium text-[16px] leading-[16px] tracking-[0.08em] text-center">
    Edit Project
  </span>
</button>
</div>
  );
};

export default EditProjectButton;
