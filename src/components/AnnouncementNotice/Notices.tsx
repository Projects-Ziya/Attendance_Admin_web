import React from "react";
import EditIcon from "../../assets/icons/editboxicon.svg"
import DeleteIcon from "../../assets/icons/delete.svg";
import PinIcon from "../../assets/icons/bluepin.svg";
import { useAnnouncementNoticeBoardViewModel } from "../../viewmodels/anouncementnoticeboard/AnnouncementNoticeBoardViewModel";



const SectionTitle: React.FC<{ title: string; iconSrc?: string }> = ({
  title,
  iconSrc,
}) => (
  <div className="flex items-center gap-2 pb-[25px] ">
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
  const { pinnedNotices, recentNotices, deleteNotice, togglePin } =
    useAnnouncementNoticeBoardViewModel();

  return (
   
   <section className="w-[1469px] h-[1601px] pl-[40px] pt-[60px]  shadow-[0px_0px_2px_0px_#00000040] bg-[#FCFCFC] mx-auto mt-[35px]">
  <h1 className="text-xl font-semibold text-[#4D4D4D] ">Announcement / Notice Board</h1>
  <p className="text-[#4D4D4D] mb-[100px]">Share important updates with your team</p>

  <fieldset className="border w-[1369px] min-h-[1089px] border-[#00A0E3] rounded-lg pl-[46px] pr-[35px] pt-[60px] pb-[25px] ">
    <legend className="mx-auto">
      <span className="bg-[#00A0E3] text-white text-sm font-semibold px-5 py-1 rounded-full">
        Notice Board
      </span>
    </legend>

    {/* --- CONTENT GOES HERE --- */}
    <SectionTitle title="Pinned Notices" iconSrc={PinIcon}/>

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
</section>

    
  );
};

export default Notices;
