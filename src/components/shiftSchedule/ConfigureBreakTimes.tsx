import React from "react";
import clock_icon from "../../assets/icons/shiftschedule/clock.svg";
import break_icon from "../../assets/icons/shiftschedule/break.svg";
import lunch_icon from "../../assets/icons/shiftschedule/lunch.svg";
import api from "../../Api/api";

type Props = {
  relaxationStart: string;
  relaxationEnd: string;
  breakStart: string;
  breakEnd: string;
  lunchStart: string;
  lunchEnd: string;
  eveningBreakStart: string;
  eveningBreakEnd: string;
  setRelaxationStart: (val: string) => void;
  setRelaxationEnd: (val: string) => void;
  setBreakStart: (val: string) => void;
  setBreakEnd: (val: string) => void;
  setLunchStart: (val: string) => void;
  setLunchEnd: (val: string) => void;
  setEveningBreakStart: (val: string) => void;
  setEveningBreakEnd: (val: string) => void;
  handleSaveSchedule: () => void;
  shiftType: string;
  setShiftType: (val: string) => void;
};

const ConfigureBreakTimes: React.FC<Props> = ({
  relaxationStart,
  relaxationEnd,
  breakStart,
  breakEnd,
  lunchStart,
  lunchEnd,
  eveningBreakStart,
  eveningBreakEnd,
  setRelaxationStart,
  setRelaxationEnd,
  setBreakStart,
  setBreakEnd,
  setLunchStart,
  setLunchEnd,
  setEveningBreakStart,
  setEveningBreakEnd,
  handleSaveSchedule,
  shiftType,
  setShiftType,
}) => {

  // ---------- FINAL SAVE → API CALL ----------
  const saveToAPI = async () => {
    try {
      const payload = {
  shifts_name: `${shiftType} Shift`,   // Morning → "Morning Shift"

  start_time: "09:00",   // You must add actual shift start time input
  end_time: "18:00",     // You must add actual shift end time input

  relaxation_start: relaxationStart,
  relaxation_end: relaxationEnd,

  break_start: breakStart,
  break_end: breakEnd,

  lunch_start: lunchStart,
  lunch_end: lunchEnd,

  evening_break_start: eveningBreakStart,
  evening_break_end: eveningBreakEnd,
};


      await api.post("/api/create-shift/", payload);

      handleSaveSchedule();
    } catch (error) {
      console.error("Shift creation failed", error);
    }
  };
  // ------------------------------------------

  const shiftOptions = ["Morning", "Afternoon", "Evening", "Night"];

  return (
    <div className="h-auto shadow-[0px_0px_2px_0px_#00000040] rounded-[10px] w-[1469px] pt-[73px] bg-white mt-[20px] pb-[66px]">
      <h1 className="text-[22px] ml-[66px] font-[500]">Configure Break Times</h1>

      {/* Shift Type Selector */}
      <div className="ml-[66px] mr-[44px] mt-[20px] mb-[10px]">
        <label className="block mb-2 text-[18px] font-[500] text-[#4D4D4D]">
          Shift Type
        </label>
        <select
          value={shiftType}
          onChange={(e) => setShiftType(e.target.value)}
          className="w-full h-[45px] px-4 py-2 border border-gray-300 rounded-lg bg-white text-[16px] font-medium text-[#4D4D4D] shadow-sm focus:outline-none focus:ring-2 focus:ring-[#00A0E3] hover:border-[#00A0E3] transition"
        >
          {shiftOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      {/* Relaxation Time */}
      <BreakCard
        icon={clock_icon}
        title="Relaxation Time (Punch in time)"
        start={relaxationStart}
        end={relaxationEnd}
        onStartChange={setRelaxationStart}
        onEndChange={setRelaxationEnd}
      />

      {/* Break Time */}
      <BreakCard
        icon={break_icon}
        title="Break Time"
        start={breakStart}
        end={breakEnd}
        onStartChange={setBreakStart}
        onEndChange={setBreakEnd}
      />

      {/* Lunch Time */}
      <BreakCard
        icon={lunch_icon}
        title="Lunch Time"
        start={lunchStart}
        end={lunchEnd}
        onStartChange={setLunchStart}
        onEndChange={setLunchEnd}
      />

      {/* Evening Break */}
      <BreakCard
        icon={break_icon}
        title="Evening Break"
        start={eveningBreakStart}
        end={eveningBreakEnd}
        onStartChange={setEveningBreakStart}
        onEndChange={setEveningBreakEnd}
      />

      {/* Save Button */}
      <button
        onClick={saveToAPI}
        className="hover:bg-[#008dc7] transition duration-200 cursor-pointer h-[53px] w-[1364px] bg-[#00A0E3] text-white text-[22px] font-[500] rounded-[10px] ml-[66px] mt-[40px]"
      >
        Save Schedule
      </button>
    </div>
  );
};

type BreakCardProps = {
  icon: string;
  title: string;
  start: string;
  end: string;
  onStartChange: (val: string) => void;
  onEndChange: (val: string) => void;
};

const BreakCard: React.FC<BreakCardProps> = ({
  icon,
  title,
  start,
  end,
  onStartChange,
  onEndChange,
}) => (
  <div className="h-[160px] w-[1364px] ml-[64px] mt-[25px] border-[1px] rounded-[25px]">
    <div className="flex gap-[20px]">
      <img
        className="h-[24px] ml-[30px] mt-[24px] w-[24px]"
        src={icon}
        alt=""
      />
      <h1 className="mt-[20px] text-[20px] font-[500]">{title}</h1>
    </div>
    <div className="flex justify-between mt-[10px] text-[15px] font-[500] ml-[28px]">
      <span>Start</span>
      <span className="pr-[599px]">End</span>
    </div>
    <div>
      <input
        type="text"
        placeholder="00.00"
        value={start}
        onChange={(e) => onStartChange(e.target.value)}
        className="h-[53px] pl-[17px] text-[#636262] text-[18px] font-[500] w-[591px] ml-[28px] mt-[9px] rounded-[10px] bg-[#F6F5F5] outline-none"
      />
      <input
        type="text"
        placeholder="00.00"
        value={end}
        onChange={(e) => onEndChange(e.target.value)}
        className="h-[53px] pl-[17px] text-[#636262] text-[18px] font-[500] w-[591px] ml-[99px] mt-[9px] rounded-[10px] bg-[#F6F5F5] outline-none"
      />
    </div>
  </div>
);

export default ConfigureBreakTimes;
