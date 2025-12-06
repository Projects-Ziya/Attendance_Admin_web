import React, { useEffect, useState } from "react";
import calender from "../../assets/icons/pollsfeedback/calendericon.svg";
import editicon from "../../assets/icons/pollsfeedback/edit.svg";
import deleteicon from "../../assets/icons/pollsfeedback/delete.svg";
import api from "../../Api/api";

type ScheduledShift = {
  id: number;
  team: number;
  start_date: string;
  end_date: string;
  start_time: string;
  end_time: string;
  teams_name?: string;
};


type Props = {
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  setStartDate: (val: string) => void;
  setEndDate: (val: string) => void;
  setStartTime: (val: string) => void;
  setEndTime: (val: string) => void;
  selected: string;
  setSelected: (val: string) => void;
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
  scheduleShifts: ScheduledShift[];
  handleSubmit: () => void;
  resetForm: () => void;
  handleEdit: (shift: ScheduledShift) => void;
  handleDelete: (id: number) => void;
};

const TeamShift: React.FC<Props> = ({
  startDate,
  endDate,
  startTime,
  endTime,
  setStartDate,
  setEndDate,
  setStartTime,
  setEndTime,
  selected,
  setSelected,
  isOpen,
  setIsOpen,
  scheduleShifts,
  handleSubmit,
  resetForm,
  handleEdit,
  handleDelete,
}) => {
  const [deptList, setDeptList] = useState<{ id: number; name: string }[]>([]);
  const [shifts, setShifts] = useState<ScheduledShift[]>(scheduleShifts || []);
  const [editingShiftId, setEditingShiftId] = useState<number | null>(null);

  const fetchDepartments = async () => {
    try {
      const res = await api.get("/api/list-departments/");
      if (Array.isArray(res.data)) setDeptList(res.data);
      else if (Array.isArray(res.data.data)) setDeptList(res.data.data);
      else setDeptList([]);
    } catch (err) {
      console.error("Failed to load departments", err);
      setDeptList([]);
    }
  };

  const fetchShifts = async () => {
    try {
      const res = await api.get("/api/shift-addon/");
      if (Array.isArray(res.data)) setShifts(res.data);
      else if (Array.isArray(res.data.data)) setShifts(res.data.data);
      else setShifts([]);
    } catch (err) {
      console.error("Failed to fetch shifts", err);
      setShifts([]);
    }
  };

  useEffect(() => {
    fetchDepartments();
    fetchShifts();
  }, []);

  const submitShift = async () => {
    try {
      const selectedDept = deptList.find((d) => d.name === selected);
      const payload = {
        start_date: startDate,
        end_date: endDate,
        start_time: startTime + ":00",
        end_time: endTime + ":00",
        team: selectedDept ? selectedDept.id : null,
      };

      if (editingShiftId) {
        // Edit existing shift
        await api.patch(`/api/shift-addon-edit-delete/${editingShiftId}/`, payload);
        setEditingShiftId(null); // reset editing mode
      } else {
        // Add new shift
        await api.post("/api/shift-addon/", payload);
      }

      handleSubmit();
      fetchShifts();
      resetForm();
    } catch (err) {
      console.error("Shift Error:", err);
    }
  };

  // Prefill form on edit
  const handleEditClick = (shift: ScheduledShift) => {
    setStartDate(shift.start_date);
setEndDate(shift.end_date);
setStartTime(shift.start_time.slice(0, 5)); // "HH:MM"
setEndTime(shift.end_time.slice(0, 5));


    const dept = deptList.find((d) => d.id === shift.team);
    if (dept) setSelected(dept.name);

    setEditingShiftId(shift.id);
  };

  const deleteShift = async (id: number) => {
    try {
      await api.delete(`/api/shift-addon-edit-delete/${id}/`);
      fetchShifts();
    } catch (err) {
      console.error("Failed to delete shift", err);
    }
  };

  return (
    <div className="w-[1469px] h-auto mx-auto mt-5 flex gap-[10px] opacity-100">
      <div className="w-1/2 rounded-lg bg-white shadow-[0px_0px_2px_0px_#00000040] flex flex-col gap-6 pl-[40px] pr-[28px] pb-[40px]">
        <h2 className="text-[#4D4D4D] text-[22px] font-[600] mt-[49px] ms-[29px]">
          {editingShiftId ? "Edit Shift" : "Add Shift"}
        </h2>

        {/* Date Range */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Date:</label>
          <div className="flex gap-4">
            <div className="flex flex-col gap-1 w-1/2">
              <label className="text-xs text-gray-600">Start:</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="border border-gray-300 rounded px-3 py-2 text-sm"
              />
            </div>
            <div className="flex flex-col gap-1 w-1/2">
              <label className="text-xs text-gray-600">End:</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="border border-gray-300 rounded px-3 py-2 text-sm"
              />
            </div>
          </div>
        </div>

        {/* Shift Time */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Shift Time:</label>
          <div className="flex gap-4">
            <div className="flex flex-col gap-1 w-1/2">
              <label className="text-xs text-gray-600">Start:</label>
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="border border-gray-300 rounded px-3 py-2 text-sm"
              />
            </div>
            <div className="flex flex-col gap-1 w-1/2">
              <label className="text-xs text-gray-600">End:</label>
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="border border-gray-300 rounded px-3 py-2 text-sm"
              />
            </div>
          </div>
        </div>

        {/* Select Department */}
        <div className="flex flex-col gap-2 w-full">
          <label className="text-sm font-medium text-gray-700 mb-2 block">
            Select Team:
          </label>

          <button
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-left bg-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {selected}
          </button>

          {isOpen && (
            <ul className="w-full mt-2 bg-white border border-gray-300 rounded shadow z-10">
              {deptList.map((dept) => (
                <li
                  key={dept.id}
                  className="px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 cursor-pointer"
                  onClick={() => {
                    setSelected(dept.name);
                    setIsOpen(false);
                  }}
                >
                  {dept.name}
                </li>
              ))}
            </ul>
          )}
        </div>

        <button
          className="mt-4 bg-[#00A0E3] text-white px-6 py-2 rounded text-sm font-medium"
          onClick={submitShift}
        >
          {editingShiftId ? "Update Shift" : "Submit"}
        </button>

        <button
          className="border border-[#00A0E3] text-[#00A0E3] px-6 py-2 rounded text-sm font-medium"
          onClick={() => {
            resetForm();
            setEditingShiftId(null);
          }}
        >
          Cancel
        </button>
      </div>

      <div className="w-1/2 h-[650px] scrollable rounded-lg bg-white shadow-[0px_0px_2px_0px_#00000040]">
        <h1 className="text-[#4D4D4D] text-[22px] font-[600] mt-[49px] ms-[69px]">
          Scheduled Shifts
        </h1>

        {shifts.length === 0 ? (
          <div className="text-center flex flex-col items-center justify-center mb-2 font-[600] text-[#C3C3C3] text-[22px]">
            <img src={calender} className="w-[97px] h-[97px] mt-[112px] mb-[34px]" />
            <p>No shifts scheduled yet</p>
            <p>Create your first shift to get started</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4 mt-[40px] ml-[39px]">
            {shifts.map((s) => (
              <div
                key={s.id}
                className="w-[629px] h-[162px] border border-gray-300 rounded-[5px] px-6 py-4 shadow-sm bg-white flex flex-col justify-center gap-2"
              >
                <div className="flex justify-between items-center">
                  <p className="text-[#4D4D4D] text-[16px] font-semibold tracking-wide">
                    👥 {s.teams_name}
                  </p>
                  <div className="flex gap-4">
                    <img
                      src={editicon}
                      className="w-5 h-5 cursor-pointer"
                      onClick={() => handleEditClick(s)}
                    />
                    <img
                      src={deleteicon}
                      className="w-5 h-5 cursor-pointer"
                      onClick={() => deleteShift(s.id)}
                    />
                  </div>
                </div>

                <p className="text-[#4D4D4D] text-[14px] font-medium">
                  📅 {s.start_date} - {s.end_date}
                </p>
                <p className="text-[#4D4D4D] text-[14px] font-medium">
                  🕒 {s.start_time} - {s.end_time}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamShift;
