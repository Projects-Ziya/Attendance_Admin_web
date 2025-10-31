import React from "react";
import AddCircleWithDots from "../AddCircleWithDots"; 

interface AddNewButtonProps {
  onClick?: () => void; 
  className?:string;
}

const AddNewButton: React.FC<AddNewButtonProps> = ({ onClick }) => (
  <button
    onClick={onClick}
    className="flex items-center gap-2 px-[10px] py-[8px] bg-gray-100 hover:bg-gray-200 rounded-md text-xs text-gray-700 transition h-[38px] w-fit"
  >
    <AddCircleWithDots className="w-5 h-5 text-gray-700" />
    <span> Add New</span>
  </button>
);

export default AddNewButton;
