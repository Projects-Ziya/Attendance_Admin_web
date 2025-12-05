import React from "react";
import ShiftScheduleicon from "../../assets/icons/shiftschedule/main.svg";
import { useShiftScheduleVM } from "../../viewmodels/shiftschedule/useShiftScheduleVM";
import MainLayout from "../../components/layout/MainLayout";

import PunchCard from "../../components/shiftSchedule/PunchCard";
import ConfigureBreakTimes from "../../components/shiftSchedule/ConfigureBreakTimes";
import TeamShift from "../../components/shiftSchedule/TeamShift";
import MorningActivityLog from "../../components/shiftSchedule/MorningActivityLog";

const ShiftSchedule: React.FC = () => {
  // ✅ single VM instance
  const vm = useShiftScheduleVM();

  const {
    punchInLabel,
    punchOutLabel,
    totalHoursLabel,
    status,
    statusText,
    handlePunchIn,
    handlePunchOut,
    showActivityLog,
    morningPunchIn,
    morningBreakStart,
    morningBreakEnd,
    morningLunchStart,
    morningLunchEnd,
    morningPunchOut,
    shiftType,
  
  } = vm;

  return (
    <MainLayout>
      <div className="h-auto w-[1469px] mb-[50px] bg-[#F6F5FA]">
        {/* Header */}
        <div className="flex items-center pt-[46px] pb-[20px]">
          <div className="h-[40px] w-[40px] flex items-center justify-center bg-[#DAF1FB] ml-[24px] rounded-[30px]">
            <span className="bg-[#DAF1FB] rounded-full w-[40px] h-[40px] flex items-center justify-center">
              <img className="h-[26px] w-[26px]" src={ShiftScheduleicon} alt="" />
            </span>
          </div>
          <p className="ml-[10px] font-[500]">Shift Schedule</p>
        </div>

        {/* Punch In / Out */}
        <PunchCard
          punchInLabel={punchInLabel}
          punchOutLabel={punchOutLabel}
          totalHoursLabel={totalHoursLabel}
          status={status}
          statusText={statusText}
          handlePunchIn={handlePunchIn}
          handlePunchOut={handlePunchOut}
        />

        {/* Break Times — pass vm down */}
        <ConfigureBreakTimes {...vm} />

         {showActivityLog && (
          <MorningActivityLog
            punchIn={morningPunchIn}
            breakStart={morningBreakStart}
            breakEnd={morningBreakEnd}
            lunchStart={morningLunchStart}
            lunchEnd={morningLunchEnd}
            punchOut={morningPunchOut}
             shiftType={shiftType} 
            onDelete={() => vm.setShowActivityLog(false)} 
          />
        )}

        {/* Team Shift — pass vm down */}
        <TeamShift {...vm} />

        {/* Morning Activity Log (conditionally rendered) */}
       
      </div>
    </MainLayout>
  );
};

export default ShiftSchedule;
