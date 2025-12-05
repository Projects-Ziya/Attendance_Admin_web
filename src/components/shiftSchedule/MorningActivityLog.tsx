import React from "react";
import p_in from "../../assets/icons/shiftschedule/p_in.svg";
import Break from "../../assets/icons/shiftschedule/break.svg";
import P_out from "../../assets/icons/shiftschedule/p_out.svg";
import Lunch from "../../assets/icons/shiftschedule/lunch.svg";
import deleteicon from "../../assets/icons/delete.svg";

type Props = {
  punchIn: string;
  breakStart: string;
  breakEnd: string;
  lunchStart: string;
  lunchEnd: string;
  punchOut: string;
  shiftType: string;       // ✅ dynamic heading
  onDelete: () => void;    // ✅ delete handler
};

const ActivityLog: React.FC<Props> = ({
  punchIn,
  breakStart,
  breakEnd,
  lunchStart,
  lunchEnd,
  punchOut,
  shiftType,
  onDelete,
}) => {
  return (
    <div className="flex mt-5 h-[686px] pb-[40px] rounded-[10px] shadow-[0px_0px_2px_0px_#00000040] w-[1462px] bg-white justify-center items-center">
      <div>
        {/* Header with dynamic shift type and delete icon */}
        <div className="flex justify-between pt-[44px] pl-[45px] items-center">
          <h1 className="text-[22px] font-[500]">
            {shiftType} Activity Log
          </h1>
          <img
            src={deleteicon}
            alt="delete"
            className="w-[20px] h-[20px] cursor-pointer"
            onClick={onDelete}
          />
        </div>

        {/* Activity rows */}
        <ActivityRow icon={p_in} label="Punch In" time={punchIn} />
        <ActivityRow icon={Break} label="Break Start" time={breakStart} />
        <ActivityRow icon={Break} label="Break End" time={breakEnd} />
        <ActivityRow icon={Lunch} label="Lunch Start" time={lunchStart} />
        <ActivityRow icon={Lunch} label="Lunch End" time={lunchEnd} />
        <ActivityRow icon={P_out} label="Punch Out" time={punchOut} />
      </div>
    </div>
  );
};

type ActivityRowProps = {
  icon: string;
  label: string;
  time: string;
};

const ActivityRow: React.FC<ActivityRowProps> = ({ icon, label, time }) => (
  <div className="flex justify-between items-center rounded-[10px] h-[65px] w-[1364px] mt-[30px] ml-[39px] border-[1px] border-[#CFCDCD]">
    <div className="flex items-center">
      <img className="pl-[13px]" src={icon} alt="" />
      <p className="pl-[17px] text-[20px] font-[500]">{label}</p>
    </div>
    <h1 className="pr-[28px] text-[#636262]">{time}</h1>
  </div>
);

export default ActivityLog;
