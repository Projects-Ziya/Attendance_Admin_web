import React from "react";
import ShiftScheduleicon from "../../assets/icons/shiftschedule/main.svg";
import punchin_out from "../../assets/icons/shiftschedule/in-out.svg";
import punchin_in from "../../assets/icons/shiftschedule/in-in.svg";
import punchout from "../../assets/icons/shiftschedule/puchout.svg";
import clock_icon from "../../assets/icons/shiftschedule/clock.svg";
import break_icon from "../../assets/icons/shiftschedule/break.svg";
import lunch_icon from "../../assets/icons/shiftschedule/lunch.svg";

import { useShiftScheduleVM } from "../../viewmodels/shiftschedule/useShiftScheduleVM";
import MainLayout from "../../components/layout/MainLayout";

const ShiftSchedule: React.FC = () => {
  const {
    punchInLabel,
    punchOutLabel,
    totalHoursLabel,
    status,
    statusText,
    handlePunchIn,
    handlePunchOut,
  } = useShiftScheduleVM();

  return (
    <MainLayout>
    <div className="h-auto w-[1479px] bg-[#F6F5FA] ">
      {/* top section same as yours */}
      <div className="flex items-center pt-[146px] pl-[44px]">
        <button className="text-[18px] font-[500] text-gray-500 border bg-[#FCFCFC] h-[40px] w-[130px]  hover:text-gray-700">
          ← Back
        </button>
        <div className="h-[40px] w-[40px] flex items-center justify-center bg-[#DAF1FB] ml-[24px] rounded-[30px]">
          <img className="h-[26px] w-[26px]" src={ShiftScheduleicon} alt="" />
        </div>
        <p className="ml-[10px] font-[500]">Shift Schedule</p>
      </div>

      <div className="text-[24px] font-[600] pt-[35px] pl-[110px] text-[#4D4D4D]">
        Shift Schedule
      </div>
      <h1 className="text-[18px] font-[500] pl-[110px] pt-[25px] text-[#4D4D4D]">
        Track your work hours and break times
      </h1>

      {/* PUNCH IN / OUT CARD */}
      <div className="w-[1462px] h-[528px] bg-[#FFFFFF] mt-[32px] ml-[44px]">
        <h1 className="font-[500] text-[22px] text-[#000000] pt-[43px] pl-[66px] ">
          Punch In / Punch Out
        </h1>

        {/* buttons now call VM functions */}
        <div className="pl-[65px] flex gap-[21px] pt-[38px]">
          <button
            onClick={handlePunchIn}
            className="hover:bg-[#008dc7] h-[59px] transition duration-200 cursor-pointer gap-[28.33px] w-[672px]  flex items-center justify-center  text-[28px]   font-[500] text-white  bg-[#00A0E3] rounded-[15px]"
          >
            <div className="flex items-center">
            
              <img
                className="h-[31.66px] w-[20.58px]"
                src={punchin_in}
                alt=""
              />
            </div>
            Punch In
          </button>

          <button
            onClick={handlePunchOut}
            className="hover:bg-[#C40F0F] transition duration-200  gap-[21.75px] flex items-center justify-center h-[59px] w-[672px] bg-[#F11515] text-[28px] font-[500] text-white rounded-[15px]"
          >
            <img
              className="h-[28.5px] w-[25.33px]"
              src={punchout}
              alt=""
            />
            Punch Out
          </button>
        </div>

        {/* dynamic times + total hours */}
        <div className="flex text-center justify-between text-[25px] font-[500] text-[#686868] ml-[66px]  pt-[31px] mt-[34px] rounded-[10px] h-[119px] w-[1364px] bg-[#F6F5F5] ">
          <div className="pl-[191px]">
            <h1>Punch In</h1>
            <p>{punchInLabel}</p>
          </div>
          <div>
            <h1>Punch Out</h1>
            <p>{punchOutLabel}</p>
          </div>
          <div className="pr-[140px]">
            <h1>Total Hours</h1>
            <p>{totalHoursLabel}</p>
          </div>
        </div>

        {/* status row with circle + tick */}
        <div className="gap-[5px] ml-[66px] mt-[41px] flex items-center text-[25px] font-[500] text-[#686868] justify-center h-[97px] w-[1364px] bg-[#F6F5F5]">
          <p>Status:</p>

          {/* circle */}
          <div
            className={`h-[20px] w-[20px] border-[2px] rounded-full flex items-center justify-center text-[14px]
            ${
              status === "IN"
                ? "bg-green-500 border-green-500 text-white"
                : " border-green-500 text-green-500"
            }`}
          >
            ✓
          </div>

          <p>{statusText}</p>
        </div>
      </div>

      {/* rest of your break-time UI – unchanged */}
            {/* Configure Break Times */}
      <div className="h-[1154px] w-[1462px] pt-[73px]  bg-white ml-[44px] mt-[56px]">
        <h1 className="text-[22px] ml-[66px] font-[500] ">
          Configure Break Times
        </h1>

        {/* Relaxation Time card */}
        <div className="h-[183px] w-[1364px] ml-[64px] mt-[59px] border-[1px] rounded-[25px]">
          <h1 className="flex gap-[20px]">
            <img
              className="h-[24.16px] ml-[30px] mt-[24px] w-[24.16px]"
              src={clock_icon}
              alt=""
            />
            <h1 className="mt-[20px] text-[20px] font-[500]">
              Relaxation Time (Punch in time)
            </h1>
          </h1>
          <h1 className="flex justify-between mt-[10px] text-[15px] font-[500] ml-[28px]">
            Start
            <p className="pr-[599px]">End</p>
          </h1>
          <div>
            <input
              type="text"
              placeholder="00.00"
              className="h-[56px] pl-[17px] text-[#636262] text-[18px] font-[500] w-[591px] text-start ml-[28px] mt-[9px] rounded-[10px] bg-[#F6F5F5] outline-none"
            />
            <input
              type="text"
              placeholder="00.00"
              className="h-[56px] pl-[17px] text-[#636262] text-[18px] font-[500] w-[591px] text-start ml-[99px] mt-[9px] rounded-[10px] bg-[#F6F5F5] outline-none"
            />
          </div>
        </div>

        {/* Break Time card */}
        <div className="h-[183px]  w-[1364px] ml-[64px] mt-[25px] border-[1px] rounded-[25px]">
          <h1 className="flex gap-[20px]">
            <img
              className="h-[23.62px] ml-[30px] mt-[23px] w-[25.81px]"
              src={break_icon}
              alt=""
            />
            <h1 className="mt-[21px] text-[20px] font-[500]">Break Time</h1>
          </h1>
          <h1 className="flex justify-between mt-[10px] text-[15px] font-[500] ml-[28px]">
            Start
            <p className="pr-[599px]">End</p>
          </h1>
          <div>
            <input
              type="text"
              placeholder="00.00"
              className="h-[56px] text-[#636262] text-[18px] font-[500] pl-[17px] w-[591px] text-start ml-[28px] mt-[9px] rounded-[10px] bg-[#F6F5F5] outline-none"
            />
            <input
              type="text"
              placeholder="00.00"
              className="h-[56px] text-[#636262] text-[18px] font-[500] pl-[17px] w-[591px] text-start ml-[99px] mt-[9px] rounded-[10px] bg-[#F6F5F5] outline-none"
            />
          </div>
        </div>

        {/* Lunch Time card */}
        <div className="h-[183px]  w-[1364px] ml-[64px] mt-[25px] border-[1px] rounded-[25px]">
          <h1 className="flex gap-[20px]">
            <img
              className="h-[27px] ml-[30px] mt-[25px] w-[26px]"
              src={lunch_icon}
              alt=""
            />
            <h1 className="mt-[23px] text-[20px] font-[500]">Lunch Time</h1>
          </h1>
          <h1 className="flex justify-between mt-[10px] text-[15px] font-[500] ml-[28px]">
            Start
            <p className="pr-[599px]">End</p>
          </h1>
          <div>
            <input
              type="text"
              placeholder="00.00"
              className="h-[56px] text-[#636262] text-[18px] font-[500] pl-[17px] w-[591px] text-start ml-[28px] mt-[9px] rounded-[10px] bg-[#F6F5F5] outline-none"
            />
            <input
              type="text"
              placeholder="00.00"
              className="h-[56px] text-[#636262] text-[18px] font-[500] pl-[17px] w-[591px] text-start ml-[99px] mt-[9px] rounded-[10px] bg-[#F6F5F5] outline-none"
            />
          </div>
        </div>

        {/* Evening Break card */}
        <div className="h-[183px] w-[1364px] ml-[64px] mt-[25px] border-[1px] rounded-[25px]">
          <h1 className="flex gap-[20px]">
            <img
              className="h-[23.62px] ml-[30px] mt-[22px] w-[25.81px]"
              src={break_icon}
              alt=""
            />
            <h1 className="mt-[22px] text-[20px] font-[500]">
              Evening Break
            </h1>
          </h1>
          <h1 className="flex justify-between mt-[10px] text-[15px] font-[500] ml-[28px]">
            Start
            <p className="pr-[599px]">End</p>
          </h1>
          <div>
            <input
              type="text"
              placeholder="00.00"
              className="h-[56px] text-[18px] font-[500] text-[#636262] pl-[17px] w-[591px] text-start ml-[28px] mt-[9px] rounded-[10px] bg-[#F6F5F5] outline-none"
            />
            <input
              type="text"
              placeholder="00.00"
              className="h-[56px] text-[18px] font-[500] text-[#636262] pl-[17px] w-[591px] text-start ml-[99px] mt-[9px] rounded-[10px] bg-[#F6F5F5] outline-none"
            />
          </div>
        </div>

        <button className="hover:bg-[#008dc7] transition duration-200 cursor-pointer h-[83px] w-[1364px] bg-[#00A0E3] text-white text-[30px] font-[500] rounded-[10px] ml-[66px] mt-[40px] ">
          Save Schedule
        </button>
      </div>

    </div>
    </MainLayout>
  );
};

export default ShiftSchedule;
