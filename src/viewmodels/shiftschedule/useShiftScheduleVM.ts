// src/viewmodel/useShiftScheduleVM.ts
import { useState } from "react";

type Status = "IN" | "OUT";

const formatTime = (date: Date | null): string => {
  if (!date) return "--:--";
  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
};

const calcTotalHours = (start: Date | null, end: Date | null): string => {
  if (!start || !end) return "0h 0m";
  const diffMs = end.getTime() - start.getTime();
  if (diffMs <= 0) return "0h 0m";

  const totalMinutes = Math.floor(diffMs / (1000 * 60));
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return `${hours}h ${minutes}m`;
};

export const useShiftScheduleVM = () => {
  const [punchInTime, setPunchInTime] = useState<Date | null>(null);
  const [punchOutTime, setPunchOutTime] = useState<Date | null>(null);
  const [status, setStatus] = useState<Status>("OUT");

  const handlePunchIn = () => {
    const now = new Date();
    setPunchInTime(now);
    setPunchOutTime(null); // clear old checkout time
    setStatus("IN");
  };

  const handlePunchOut = () => {
    if (!punchInTime) return; // can’t punch out before punching in
    const now = new Date();
    setPunchOutTime(now);
    setStatus("OUT");
  };

  const punchInLabel = formatTime(punchInTime);
  const punchOutLabel = formatTime(punchOutTime);
  const totalHoursLabel = calcTotalHours(punchInTime, punchOutTime);
  const statusText = status === "IN" ? "Punched in" : "Punched out";

  return {
    punchInLabel,
    punchOutLabel,
    totalHoursLabel,
    status,
    statusText,
    handlePunchIn,
    handlePunchOut,
  };
};
