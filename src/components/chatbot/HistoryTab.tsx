// src/components/HistoryTab.tsx
import React from "react";
import clock_icon from "../../assets/icons/chatbot/clock.svg";

const HistoryTab: React.FC = () => {
  return (
    <>
      <div className="flex justify-between">
        <div className="flex pl-[30px] pt-[37px]">
          <div className="h-[44px] w-[44px] bg-[#EDEDED] rounded-full">
            <img
              className="h-[24px] w-[24px] mt-[10px] ml-[10px]"
              src={clock_icon}
              alt=""
            />
          </div>
          <div className="pl-[9px]">
            <h1 className="text-[16px] font-[400]">
              Project Alpha Discussion
            </h1>
            <span className="text-[13px] font-[400] text-[#A9A7A7]">
              Meeting Notes Shared
            </span>
          </div>
        </div>
        <h1 className="text-[13px] font-[400] pr-[18px] pt-[53px] text-[#A9A7A7]">
          Yesterday
        </h1>
      </div>

      <div className="flex justify-between">
        <div className="flex pl-[30px] pt-[37px]">
          <div className="h-[44px] w-[44px] bg-[#EDEDED] rounded-full">
            <img
              className="h-[24px] w-[24px] mt-[10px] ml-[10px]"
              src={clock_icon}
              alt=""
            />
          </div>
          <div className="pl-[9px]">
            <h1 className="text-[16px] font-[400]">Q4 Planning</h1>
            <span className="text-[13px] font-[400] text-[#A9A7A7]">
              Budget Approved
            </span>
          </div>
        </div>
        <h1 className="text-[13px] font-[400] pr-[18px] pt-[53px] text-[#A9A7A7]">
          2 days ago
        </h1>
      </div>
    </>
  );
};

export default HistoryTab;
