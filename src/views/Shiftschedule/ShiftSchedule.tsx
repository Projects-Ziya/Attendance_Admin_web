// src/pages/ShiftSchedule.tsx

import React from "react";
import ShiftScheduleicon from "../../assets/icons/shiftschedule/main.svg";
import { useShiftScheduleVM } from "../../viewmodels/shiftschedule/useShiftScheduleVM";
import MainLayout from "../../components/layout/MainLayout";
import { motion } from "framer-motion";

import PunchCard from "../../components/shiftSchedule/PunchCard";
import ConfigureBreakTimes from "../../components/shiftSchedule/ConfigureBreakTimes";
import TeamShift from "../../components/shiftSchedule/TeamShift";
import MorningActivityLog from "../../components/shiftSchedule/MorningActivityLog";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const ShiftSchedule: React.FC = () => {
  const vm = useShiftScheduleVM();

  const {
    punchInLabel,
    punchOutLabel,
    totalHoursLabel,
    status,
    statusText,
    handlePunchIn,
    handlePunchOut,

    // ⬇ Morning activity data
    morningPunchIn,
    morningBreakStart,
    morningBreakEnd,
    morningLunchStart,
    morningLunchEnd,
    morningPunchOut,
    shiftType,
  } = vm;

  // ✅ DATA-DRIVEN VISIBILITY (FIX)
  const showMorningActivityLog =
    !!morningPunchIn ||
    !!morningBreakStart ||
    !!morningLunchStart ||
    !!morningPunchOut;

  return (
    <MainLayout>
      <div className="h-auto w-[1469px] mb-[50px] bg-[#F6F5FA]">

        {/* Header */}
        <div className="flex items-center pt-[46px] pb-[20px]">
          <div className="h-[40px] w-[40px] flex items-center justify-center bg-[#DAF1FB] ml-[24px] rounded-[30px]">
            <span className="bg-[#DAF1FB] rounded-full w-[40px] h-[40px] flex items-center justify-center">
              <img
                className="h-[26px] w-[26px] filter-blue"
                src={ShiftScheduleicon}
                alt=""
              />
            </span>
          </div>
          <p className="ml-[10px] font-[500]">Shift Schedule</p>
        </div>

        <motion.div
          className="flex flex-col gap-[30px]"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* Punch In / Out */}
          <motion.div variants={sectionVariants}>
            <PunchCard
              punchInLabel={punchInLabel}
              punchOutLabel={punchOutLabel}
              totalHoursLabel={totalHoursLabel}
              status={status}
              statusText={statusText}
              handlePunchIn={handlePunchIn}
              handlePunchOut={handlePunchOut}
            />
          </motion.div>

          {/* Configure Break Times */}
          <motion.div variants={sectionVariants}>
            <ConfigureBreakTimes {...vm} />
          </motion.div>

          {/* Morning Activity Log */}
          {showMorningActivityLog && (
            <motion.div variants={sectionVariants}>
              <MorningActivityLog
                punchIn={morningPunchIn}
                breakStart={morningBreakStart}
                breakEnd={morningBreakEnd}
                lunchStart={morningLunchStart}
                lunchEnd={morningLunchEnd}
                punchOut={morningPunchOut}
                shiftType={shiftType}
                onDelete={() => {
                  /* optional: keep empty or clear shift data */
                }}
              />
            </motion.div>
          )}

          {/* Team Shift */}
          <motion.div variants={sectionVariants}>
            <TeamShift {...vm} />
          </motion.div>
        </motion.div>
      </div>
    </MainLayout>
  );
};

export default ShiftSchedule;
