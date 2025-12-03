import { useState } from "react";
import type { Shift } from "../models/Shift"; // ✅ updated import

export function useShiftScheduleViewModel() {
  const [pinnedShifts, setPinnedShifts] = useState<Shift[]>([
    {
      title: "Morning Shift",
      date: "Dec 3, 2025",
      team: "Development Team",
      content: "Shift starts at 9:00 AM and ends at 5:00 PM.",
    },
  ]);

  const [recentShifts, setRecentShifts] = useState<Shift[]>([
    {
      title: "Night Shift",
      date: "Dec 2, 2025",
      team: "Support Team",
      content: "Shift starts at 10:00 PM and ends at 6:00 AM.",
    },
    {
      title: "Afternoon Shift",
      date: "Dec 1, 2025",
      team: "QA Team",
      content: "Shift starts at 1:00 PM and ends at 9:00 PM.",
    },
  ]);

  const deleteShift = (title: string) => {
    setPinnedShifts((prev) => prev.filter((s) => s.title !== title));
    setRecentShifts((prev) => prev.filter((s) => s.title !== title));
  };

  const togglePin = (title: string) => {
    const shift = recentShifts.find((s) => s.title === title);
    if (shift) {
      setPinnedShifts((prev) => [...prev, shift]);
      setRecentShifts((prev) => prev.filter((s) => s.title !== title));
    } else {
      const pinned = pinnedShifts.find((s) => s.title === title);
      if (pinned) {
        setRecentShifts((prev) => [...prev, pinned]);
        setPinnedShifts((prev) => prev.filter((s) => s.title !== title));
      }
    }
  };

  return {
    pinnedShifts,
    recentShifts,
    deleteShift,
    togglePin,
  };
}
