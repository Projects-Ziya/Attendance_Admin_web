import React from "react";

interface TimeSpentCardProps {
  spentHours: number;
  totalHours: number;
}

const TimeSpentCard: React.FC<TimeSpentCardProps> = ({ spentHours, totalHours }) => {
  return (
    <div className="w-[220px] h-[370px] border border-[#00A0E3] rounded-[5px] flex flex-col items-center justify-between p-[57px_27px] shadow-sm">
      
      <div className="text-[24px] font-bold text-[#00A0E3]">
        {spentHours}/{totalHours} Hrs
      </div>

      
      <div className="font-poppins font-normal text-[18px] leading-[130%] tracking-[0.08em] text-center text-[#00A0E3] opacity-80">
        Time Spent on <br /> this Project
      </div>

    </div>
  );
};

export default TimeSpentCard;
