import React, { useState } from "react";
import EditIcon from "../../assets/icons/editboxicon.svg";
import DeleteIcon from "../../assets/icons/delete.svg";
import PinIcon from "../../assets/icons/pollsfeedback/pollicon.svg";
import { useAnnouncementNoticeBoardViewModel } from "../../viewmodels/anouncementnoticeboard/useAnnouncementNoticeBoardViewModel";

const SectionTitle: React.FC<{ title: string; iconSrc?: string }> = ({
  title,
  iconSrc,
}) => (
  <div className="flex items-center gap-2 pb-[25px]">
    {iconSrc && <img src={iconSrc} alt="" className="w-[26px] h-[37px]" />}
    <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
  </div>
);

const NoticeCard: React.FC<{
  title: string;
  date: string;
  department?: string;
  content: string;
  onDelete: () => void;
  onTogglePin: () => void;
}> = ({ title, date, department, content, onDelete, onTogglePin }) => (
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
      {department ? ` • ${department}` : ""}
    </p>
    <p className="text-sm text-gray-700">{content}</p>
  </div>
);

const Notices: React.FC = () => {
  const { pinnedNotices, recentNotices, deleteNotice, togglePin, addNotice } =
    useAnnouncementNoticeBoardViewModel();

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [content, setContent] = useState("");

  const handleConfirm = () => {
    if (title && date && content) {
      addNotice({ title, date, content });
      setTitle("");
      setDate("");
      setContent("");
    }
  };

  return (
   
   <section className="w-[1469px] h-[1601px] pl-[40px] pt-[60px]  shadow-[0px_0px_2px_0px_#00000040] bg-[#FCFCFC] mx-auto mt-[100px]">
  <h1 className="text-xl font-semibold text-[#4D4D4D] ">Announcement / Notice Board</h1>
  <p className="text-[#4D4D4D] mb-[100px]">Share important updates with your team</p>

      <div className="flex gap-[40px]">
        {/* Create Notice Section */}
        <div className="w-[600px] bg-white border border-[#00A0E3] rounded-lg p-[30px] flex flex-col gap-[30px]">
          <h2 className="text-[25px] font-[500]">Create Notice</h2>

          <div className="flex flex-col gap-4">
            <label className="text-[20px] font-[500]">Heading</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Team Operation"
              className="border border-gray-300 rounded-lg px-4 py-3 text-[18px] bg-[#F6F6F6]"
            />

            <label className="text-[20px] font-[500]">Date</label>
            <input
              type="text"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              placeholder="3-12-2025"
              className="border border-gray-300 rounded-lg px-4 py-3 text-[18px] bg-[#F6F6F6]"
            />

            <label className="text-[20px] font-[500]">Description</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Enter description..."
              className="border border-gray-300 rounded-lg px-4 py-3 text-[18px] bg-[#F6F6F6] h-[120px]"
            />
          </div>

          <div className="flex gap-4 justify-end mt-[20px]">
            <button className="bg-[#DAF1FB] text-[#00A0E3] px-4 py-2 rounded-lg text-[16px] font-[500]">
              Are you sure you want to save this notice?
            </button>
            <button
              onClick={handleConfirm}
              className="bg-[#00A0E3] text-white px-6 py-2 rounded-lg text-[18px] font-[500]"
            >
              Confirm
            </button>
            <button
              onClick={() => {
                setTitle("");
                setDate("");
                setContent("");
              }}
              className="bg-white border border-gray-300 px-6 py-2 rounded-lg text-[18px] font-[500]"
            >
              Cancel
            </button>
          </div>
        </div>

        {/* Notice Board Section */}
        <fieldset className="border w-[769px] min-h-[1089px] border-[#00A0E3] rounded-lg pl-[46px] pr-[35px] pt-[60px] pb-[25px]">
          <legend className="mx-auto">
            <span className="bg-[#00A0E3] text-white text-sm font-semibold px-5 py-1 rounded-full">
              Notice Board
            </span>
          </legend>

          <SectionTitle title="Pinned Notices" iconSrc={PinIcon} />
          <div className="flex flex-col gap-4">
            {pinnedNotices.map((n, i) => (
              <NoticeCard
                key={`${n.title}-${i}`}
                title={n.title}
                date={n.date}
                department="HR Department"
                content={n.content}
                onDelete={() => deleteNotice(n.title)}
                onTogglePin={() => togglePin(n.title)}
              />
            ))}
          </div>

          <div className="mt-8">
            <SectionTitle title="Recent Notices" />
            <div className="flex flex-col gap-4">
              {recentNotices.map((n, i) => (
                <NoticeCard
                  key={`${n.title}-${i}`}
                  title={n.title}
                  date={n.date}
                  department="HR Department"
                  content={n.content}
                  onDelete={() => deleteNotice(n.title)}
                  onTogglePin={() => togglePin(n.title)}
                />
              ))}
            </div>
          </div>
        </fieldset>
      </div>
    </section>
  );
};

export default Notices;
