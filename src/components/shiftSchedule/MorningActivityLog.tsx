import React, { useEffect, useState } from "react";
import api from "../../Api/api";
import p_in from "../../assets/icons/shiftschedule/p_in.svg";
import Break from "../../assets/icons/shiftschedule/break.svg";
import P_out from "../../assets/icons/shiftschedule/p_out.svg";
import Lunch from "../../assets/icons/shiftschedule/lunch.svg";
import deleteicon from "../../assets/icons/delete.svg";
import toast from "react-hot-toast";

type Props = {
  punchIn: string;
  breakStart: string;
  breakEnd: string;
  lunchStart: string;
  lunchEnd: string;
  punch_out_time: string;
  shiftType: string;
};

const ActivityLog: React.FC<Props> = ({
  punchIn,
  breakStart,
  breakEnd,
  lunchStart,
  lunchEnd,
  punch_out_time,
  shiftType,
}) => {
  const [apiData, setApiData] = useState<any>(null);

  // ✅ Fetch LAST updated shift
  useEffect(() => {
    const fetchShiftData = async () => {
      try {
        const response = await api.get("/api/list-shifts/");
        const list = response.data?.data || [];

        if (list.length === 0) return;

        const last = [...list].sort(
          (a, b) =>
            new Date(b.updated_at).getTime() -
            new Date(a.updated_at).getTime()
        )[0];

        setApiData({
          id: last.id, // ✅ STORE ID (CRITICAL FIX)
          punchIn: last.relaxation_start ?? punchIn,
          breakStart: last.break_start ?? breakStart,
          breakEnd: last.break_end ?? breakEnd,
          lunchStart: last.lunch_start ?? lunchStart,
          lunchEnd: last.lunch_end ?? lunchEnd,
          eveningBreakStart: last.evening_break_start ?? breakStart,
          eveningBreakEnd: last.evening_break_end ?? breakEnd,
          punch_out_time: last.punch_out_time ?? punch_out_time,
          shiftType: last.shifts_name ?? shiftType,
        });
      } catch (error) {
        console.error("API Fetch Error:", error);
      }
    };

    fetchShiftData();
  }, []);

  // ✅ Delete using stored ID
 

  const onDelete = async (id: number) => {
    try {
      await api.delete(`/api/shift-delete/${id}/`);
      
      toast.success("Shift deleted successfully");
      setApiData(null); // optional: clears UI after delete
    } catch (err) {
      console.log("Delete error:", err);
      toast.error("Failed to delete shift");
    }
  };

  // ✅ Prevent blank render
  if (!apiData) {
    return null;
  }

  return (
    <div className="flex mt-5 h-[886px] pb-[40px] rounded-[10px] shadow-[0px_0px_2px_0px_#00000040] w-[1462px] bg-white justify-center items-center">
      <div>
        {/* Header */}
        <div className="flex justify-between pt-[44px] pl-[45px] items-center">
          <h1 className="text-[22px] font-[500]">
            {apiData.shiftType} Activity Log
          </h1>
          <img
            src={deleteicon}
            alt="delete"
            className="w-[20px] h-[20px] cursor-pointer"
            onClick={() => onDelete(apiData.id)} // ✅ PASS ID
          />
        </div>

        {/* Rows */}
        <ActivityRow icon={p_in} label="Punch In" time={apiData.punchIn} />
        <ActivityRow icon={Break} label="Break 1 Start" time={apiData.breakStart} />
        <ActivityRow icon={Break} label="Break 1 End" time={apiData.breakEnd} />
        <ActivityRow icon={Lunch} label="Food time Start" time={apiData.lunchStart} />
        <ActivityRow icon={Lunch} label="Food time End" time={apiData.lunchEnd} />
        <ActivityRow icon={Break} label="Break 2 Start" time={apiData.eveningBreakStart} />
        <ActivityRow icon={Break} label="Break 2 End" time={apiData.eveningBreakEnd} />
        <ActivityRow icon={P_out} label="Punch Out" time={apiData.punch_out_time} />
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
