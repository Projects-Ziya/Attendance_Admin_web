import React from "react";
import calender from "../../assets/icons/pollsfeedback/calendericon.svg";
import editicon from "../../assets/icons/pollsfeedback/edit.svg";
import deleteicon from "../../assets/icons/pollsfeedback/delete.svg";

type ScheduledShift = {
  id: number;
  team: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
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
  teams: string[];
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
  teams,
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
  return (
    <div className="w-[1469px] h-auto mx-auto mt-5 flex gap-[10px] opacity-100">
      {/* Left Box */}
      <div className="w-1/2 rounded-lg bg-white shadow-[0px_0px_2px_0px_#00000040] flex flex-col gap-6 pl-[40px] pr-[28px] pb-[40px]">
        <h2 className="text-[#4D4D4D] text-[22px] font-[600] mt-[49px] ms-[29px]">
          Edit Shift
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

        {/* Select Team */}
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
              {teams.map((team, idx) => (
                <li
                  key={idx}
                  className="px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 cursor-pointer"
                  onClick={() => {
                    setSelected(team);
                    setIsOpen(false);
                  }}
                >
                  {team}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Buttons */}
        <button
          className="mt-4 bg-[#00A0E3] text-white px-6 py-2 rounded text-sm font-medium"
          onClick={handleSubmit}
        >
          Submit
        </button>

        <button
          className="border border-[#00A0E3] text-[#00A0E3] px-6 py-2 rounded text-sm font-medium"
          onClick={resetForm}
        >
          Cancel Edit
        </button>
      </div>

      {/* Right Box */}
      <div className="w-1/2 rounded-lg bg-white shadow-[0px_0px_2px_0px_#00000040]">
        <h1 className="text-[#4D4D4D] text-[22px] font-[600] mt-[49px] ms-[69px]">
          Scheduled Shifts
        </h1>

        {scheduleShifts.length === 0 ? (
          <div className="text-center flex flex-col items-center justify-center mb-2 font-[600] text-[#C3C3C3] text-[22px]">
            <img src={calender} className="w-[97px] h-[97px] mt-[112px] mb-[34px]" />
            <p>No shifts scheduled yet</p>
            <p>Create your first shift to get started</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4 mt-[40px] ml-[39px]">
            {scheduleShifts.map((s) => (
              <div
                key={s.id}
                className="w-[629px] h-[162px] border border-gray-300 rounded-[5px] px-6 py-4 shadow-sm bg-white flex flex-col justify-center gap-2"
              >
                <div className="flex justify-between items-center">
                  <p className="text-[#4D4D4D] text-[16px] font-semibold tracking-wide">
                    👥 {s.team}
                  </p>

                  <div className="flex gap-4">
                    <img
                      src={editicon}
                      className="w-5 h-5 cursor-pointer"
                      onClick={() => handleEdit(s)}
                    />
                    <img
                      src={deleteicon}
                      className="w-5 h-5 cursor-pointer"
                      onClick={() => handleDelete(s.id)}
                    />
                  </div>
                </div>

                <p className="text-[#4D4D4D] text-[14px] font-medium">
                  📅 {s.startDate} - {s.endDate}
                </p>

                <p className="text-[#4D4D4D] text-[14px] font-medium">
                  🕒 {s.startTime} - {s.endTime}
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
