import React from "react";
import punchin from "../../assets/icons/shiftschedule/punchin.svg";
import punchout from "../../assets/icons/shiftschedule/puchout.svg";
import { useShiftScheduleVM } from "../../viewmodels/shiftschedule/useShiftScheduleVM";

const PunchCard: React.FC = () => {
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
    <div
  className="min-h-auto w-full mx-auto 
             sm:max-w-full md:max-w-[90%] xl:max-w-[1469px] 
             h-auto rounded-[10px] pb-[50px] pl-[60px] pr-[30px]
             shadow-[0px_0px_2px_0px_#00000040] bg-[#FFFFFF] mt-[32px]"
>
  <div className="text-[24px] font-[600] pt-[35px] text-[#4D4D4D]">
    Shift Schedule
  </div>

  <h1 className="text-[18px] font-[500] pt-[15px] text-[#4D4D4D]">
    Track your work hours and break times
  </h1>

  <h1 className="font-[500] text-[22px] text-[#000000] pt-[43px]">
    Punch In / Punch Out
  </h1>

  {/* buttons */}
  <div className="flex flex-col md:flex-row gap-[21px] pt-[38px]">
    <button
      onClick={handlePunchIn}
      className="hover:bg-[#008dc7] h-[55px] transition duration-200 cursor-pointer gap-[28.33px] 
                 w-full md:w-1/2 flex items-center justify-center text-[25px] font-[500] 
                 text-white bg-[#00A0E3] rounded-[15px]"
    >
      <img className="h-[28.5px] w-[25.33px]" src={punchin} alt="" />
      Punch In
    </button>

    <button
      onClick={handlePunchOut}
      className="hover:bg-[#C40F0F] transition duration-200 gap-[21.75px] 
                 flex items-center justify-center h-[55px] w-full md:w-1/2 
                 bg-[#F11515] text-[25px] font-[500] text-white rounded-[15px]"
    >
      <img className="h-[28.5px] w-[25.33px]" src={punchout} alt="" />
      Punch Out
    </button>
  </div>

  {/* dynamic times */}
  <div
    className="flex flex-col md:flex-row items-center text-center justify-between 
               text-[23px] font-[500] text-[#686868] pt-2 mt-[34px] rounded-[10px] 
               h-auto md:h-[100px] w-full md:max-w-[1364px] bg-[#F6F5F5] mx-auto"
  >
    <div className="md:pl-[191px]">
      <h1>Punch In</h1>
      <p>{punchInLabel}</p>
    </div>
    <div>
      <h1>Punch Out</h1>
      <p>{punchOutLabel}</p>
    </div>
    <div className="md:pr-[140px]">
      <h1>Total Hours</h1>
      <p>{totalHoursLabel}</p>
    </div>
  </div>

  {/* status */}
  <div
    className="gap-[5px] mt-[41px] flex items-center text-[22px] font-[500] text-[#686868] 
               justify-center h-[70px] w-full md:max-w-[1364px] bg-[#F6F5F5] mx-auto "
  >
    <p>Status:</p>
    <div
      className={`h-[20px] w-[20px] border-[2px] rounded-full flex items-center justify-center text-[14px]
        ${
          status === "IN"
            ? "bg-green-500 border-green-500 text-white"
            : "border-red-500 text-red-500"
        }`}
    >
      ✓
    </div>
    <p>{statusText}</p>
  </div>
</div>
  );
};

export default PunchCard;
