import { useState, useEffect } from "react";
import api from "../../Api/api";

type Status = "IN" | "OUT";

type ScheduledShift = {
  id: number;
  team: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
};

const formatTime = (date: Date | null): string => {
  if (!date) return "--:--";
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
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
  // Punch In / Out logic
  const [punchInTime, setPunchInTime] = useState<Date | null>(null);
  const [punchOutTime, setPunchOutTime] = useState<Date | null>(null);
  const [status, setStatus] = useState<Status>("OUT");

  // 🔹 RESTORE PUNCH-IN AFTER REFRESH
  useEffect(() => {
    const storedPunchIn = localStorage.getItem("punchInTime");
    const storedStatus = localStorage.getItem("punchStatus");

    if (storedPunchIn && storedStatus === "IN") {
      const restoredTime = new Date(storedPunchIn);
      setPunchInTime(restoredTime);
      setStatus("IN");
      setMorningPunchIn(formatTime(restoredTime));
    }
  }, []);

  const handlePunchIn = async () => {
    try {
      const body = {
        latitude: "10.0921616",
        longitude: "76.3180602",
      };

      await api.post("/api/admin-punch-in/", body);

      const now = new Date();
      setPunchInTime(now);
      setPunchOutTime(null);
      setStatus("IN");
      setMorningPunchIn(formatTime(now));

      // ✅ Persist
      localStorage.setItem("punchInTime", now.toISOString());
      localStorage.setItem("punchStatus", "IN");
    } catch (error) {
      console.error("Punch-in error:", error);
      alert("Punch-in failed.");
    }
  };

  const handlePunchOut = async () => {
    if (!punchInTime) return;

    try {
      const body = {
        latitude: "10.0921616",
        longitude: "76.3180602",
      };

      await api.post("/api/admin-punch-out/", body);

      const now = new Date();
      setPunchOutTime(now);
      setStatus("OUT");
      setMorningPunchOut(formatTime(now));

      // ✅ Clear persistence
      localStorage.removeItem("punchInTime");
      localStorage.removeItem("punchStatus");
    } catch (error) {
      console.error("Punch-out error:", error);
      alert("Punch-out failed.");
    }
  };

  const punchInLabel = formatTime(punchInTime);
  const punchOutLabel = formatTime(punchOutTime);
  const totalHoursLabel = calcTotalHours(punchInTime, punchOutTime);
  const statusText = status === "IN" ? "Punched in" : "Punched out";

  /* ------------------ REST OF YOUR CODE (UNCHANGED) ------------------ */

  const [relaxationStart, setRelaxationStart] = useState("");
  const [relaxationEnd, setRelaxationEnd] = useState("");
  const [breakStart, setBreakStart] = useState("");
  const [breakEnd, setBreakEnd] = useState("");
  const [lunchStart, setLunchStart] = useState("");
  const [lunchEnd, setLunchEnd] = useState("");
  const [eveningBreakStart, setEveningBreakStart] = useState("");
  const [eveningBreakEnd, setEveningBreakEnd] = useState("");

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const [teams] = useState<string[]>(["Development Team", "Support Team", "QA Team"]);
  const [selected, setSelected] = useState("Select a team");
  const [isOpen, setIsOpen] = useState(false);

  const [scheduleShifts, setScheduleShifts] = useState<ScheduledShift[]>([]);
  const [showActivityLog, setShowActivityLog] = useState(false);
  const [shiftType, setShiftType] = useState("Morning");

  const [morningPunchIn, setMorningPunchIn] = useState("09:20");
  const [morningBreakStart, setMorningBreakStart] = useState("09:20");
  const [morningBreakEnd, setMorningBreakEnd] = useState("09:20");
  const [morningLunchStart, setMorningLunchStart] = useState("09:20");
  const [morningLunchEnd, setMorningLunchEnd] = useState("09:20");
  const [morningPunchOut, setMorningPunchOut] = useState("09:20");

  return {
    punchInLabel,
    punchOutLabel,
    totalHoursLabel,
    status,
    statusText,
    handlePunchIn,
    handlePunchOut,

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

    startDate,
    endDate,
    startTime,
    endTime,
    setStartDate,
    setEndDate,
    setStartTime,
    setEndTime,

    teams,
    selected,
    setSelected,
    isOpen,
    setIsOpen,
    scheduleShifts,

    morningPunchIn,
    morningBreakStart,
    morningBreakEnd,
    morningLunchStart,
    morningLunchEnd,
    morningPunchOut,
    showActivityLog,
    setShowActivityLog,

    shiftType,
    setShiftType,
  };
};
