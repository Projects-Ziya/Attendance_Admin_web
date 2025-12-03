import React from "react";
import EditIcon from "../../assets/icons/editboxicon.svg";
import DeleteIcon from "../../assets/icons/delete.svg";
import PinIcon from "../../assets/icons/bluepin.svg";
import {AnnouncementNoticeBoardViewModel } from "../../viewmodels/anouncementnoticeboard/AnnouncementNoticeBoardViewModel";

const SectionTitle: React.FC<{ title: string; iconSrc?: string }> = ({
  title,
  iconSrc,
}) => (
  <div className="flex items-center gap-2 pb-[25px]">
    {iconSrc && <img src={iconSrc} alt="" className="w-[26px] h-[37px]" />}
    <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
  </div>
);

const ShiftCard: React.FC<{
  title: string;
  date: string;
  team?: string;
  content: string;
  onDelete: () => void;
  onTogglePin: () => void;
}> = ({ title, date, team, content, onDelete, onTogglePin }) => (
  <div className="bg-white border border-[#00A0E3] rounded-md p-4 flex flex-col gap-2">
    <div className="flex justify-between items-start">
      <h3 className="text-base font-semibold text-gray-800">{title}</h3>
      <div className="flex gap-3 items-center">
        <img src={EditIcon} alt="Edit" className="w-5 h-5 cursor-pointer" />
        <img
          src={PinIcon}
          alt="Pin"
          className="w-5 h-5 cursor-pointer"
          onClick={onTogglePin}
        />
        <img
          src={DeleteIcon}
          alt="Delete"
          className="w-5 h-5 cursor-pointer"
          onClick={onDelete}
        />
      </div>
    </div>

    <p className="text-xs text-gray-600">
      {date}
      {team ? ` • ${team}` : ""}
    </p>

    <p className="text-sm text-gray-700">{content}</p>
  </div>
);

const ShiftTeam: React.FC = () => {
  const { pinnedShifts, recentShifts, deleteShift, togglePin } =
    useShiftScheduleViewModel();

  return (
    <section className="w-[1469px] h-[1601px] pl-[40px] pt-[60px] shadow-[0px_0px_2px_0px_#00000040] bg-[#FCFCFC] mx-auto mt-[100px]">
      <h1 className="text-xl font-semibold text-[#4D4D4D]">Shift Team Overview</h1>
      <p className="text-[#4D4D4D] mb-[100px]">Manage and track team shifts efficiently</p>

      <fieldset className="border w-[1369px] min-h-[1089px] border-[#00A0E3] rounded-lg pl-[46px] pr-[35px] pt-[60px] pb-[25px]">
        <legend className="mx-auto">
          <span className="bg-[#00A0E3] text-white text-sm font-semibold px-5 py-1 rounded-full">
            Shift Schedule
          </span>
        </legend>

        <SectionTitle title="Pinned Shifts" iconSrc={PinIcon} />
        <div className="flex flex-col gap-4">
          {pinnedShifts.map((s, i) => (
            <ShiftCard
              key={`${s.title}-${i}`}
              title={s.title}
              date={s.date}
              team={s.team}
              content={s.content}
              onDelete={() => deleteShift(s.title)}
              onTogglePin={() => togglePin(s.title)}
            />
          ))}
        </div>

        <div className="mt-8">
          <SectionTitle title="Recent Shifts" />
          <div className="flex flex-col gap-4">
            {recentShifts.map((s, i) => (
              <ShiftCard
                key={`${s.title}-${i}`}
                title={s.title}
                date={s.date}
                team={s.team}
                content={s.content}
                onDelete={() => deleteShift(s.title)}
                onTogglePin={() => togglePin(s.title)}
              />
            ))}
          </div>
        </div>
      </fieldset>
    </section>
  );
};

export default ShiftTeam;
