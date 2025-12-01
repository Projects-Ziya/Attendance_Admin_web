// PollFeedbackViewModel.ts (VIEWMODEL)

import { useState } from "react";
import type { Shift } from "../model/Shift";

export const usePollFeedbackViewModel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("Select List");

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const [scheduleShifts, setScheduleShifts] = useState<Shift[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);

  const teams = ["Sales Team", "Operation Team", "Design Team", "Marketing Team"];

  const makeId = () => Math.random().toString(36).slice(2, 10);

  const resetForm = () => {
    setSelected("Select List");
    setStartDate("");
    setEndDate("");
    setStartTime("");
    setEndTime("");
  };

  const handleSubmit = () => {
    if (
      selected === "Select List" ||
      !startDate ||
      !endDate ||
      !startTime ||
      !endTime
    ) {
      return;
    }

    if (editingId) {
      setScheduleShifts((prev) =>
        prev.map((s) =>
          s.id === editingId
            ? { ...s, team: selected, startDate, endDate, startTime, endTime }
            : s
        )
      );
      setEditingId(null);
    } else {
      const newShift: Shift = {
        id: makeId(),
        team: selected,
        startDate,
        endDate,
        startTime,
        endTime,
      };
      setScheduleShifts((prev) => [...prev, newShift]);
    }

    resetForm();
  };

  const handleEdit = (shift: Shift) => {
    setEditingId(shift.id);
    setSelected(shift.team);
    setStartDate(shift.startDate);
    setEndDate(shift.endDate);
    setStartTime(shift.startTime);
    setEndTime(shift.endTime);
  };

  const handleDelete = (id: string) => {
    setScheduleShifts((prev) => prev.filter((s) => s.id !== id));
    if (editingId === id) resetForm();
  };

  return {
    // state
    isOpen,
    selected,
    startDate,
    endDate,
    startTime,
    endTime,
    scheduleShifts,
    teams,

    // setters
    setIsOpen,
    setSelected,
    setStartDate,
    setEndDate,
    setStartTime,
    setEndTime,

    // methods
    handleSubmit,
    handleEdit,
    handleDelete,
    resetForm,
  };
};
