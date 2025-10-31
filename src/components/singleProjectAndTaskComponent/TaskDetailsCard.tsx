import React from "react";

interface TaskDetailsCardProps {
  completed: number;
  total: number;
}

const TaskDetailsCard: React.FC<TaskDetailsCardProps> = ({ completed, total }) => {
  

  return (
    <div className="px-[27px] py-[20px]
    w-[220px] h-[fit] border border-[#00A0E3] rounded-[5px]  flex flex-col justify-between 
    ">
      <h2 className="w-fit h-[11px] opacity-100 rotate-0 text-[#00A0E3] text-[16px] leading-[16px] tracking-[0.08em] font-medium font-[Poppins] text-center">
  Task Details</h2>

  <div className="opacity-100 rotate-0 mt-[55px] w-[166px] h-[74px] flex flex-col gap-3">
      <p className="text-[#00A0E3] text-[14px]">Task Done</p>

      <div className="flex justify-start">
        <span className="font-[Poppins] font-medium text-[18px] leading-[130%] tracking-[0.08em] text-[#00A0E3]">{completed}</span>
        <span className="font-[Poppins] font-medium text-[18px] leading-[130%] tracking-[0.08em] text-[#00A0E3]">/</span>
        <span className="font-[Poppins] font-medium text-[18px] leading-[130%] tracking-[0.08em] text-[#00A0E3]">{total}</span>
        <span className="font-[Poppins] text-[12px] text-[#00A0E3] ml-1">Completed</span>
      </div>

      <div className="bg-[#D8F2FD] h-[6px] rounded-full transition-all duration-300"></div>
    </div>

    </div>
  );
};

export default TaskDetailsCard;
