import React from "react";
import { FaEdit, FaTrash, FaThumbtack } from "react-icons/fa";
import { useAnnouncementNoticeBoardViewModel } from "../../viewmodels/anouncementnoticeboard/AnnouncementNoticeBoardViewModel";

const NoticeCard: React.FC<{
  title: string;
  date: string;
  content: string;
  onDelete: () => void;
  onTogglePin: () => void;
}> = ({ title, date, content, onDelete, onTogglePin }) => (
  <div className="bg-white shadow-md rounded-lg p-6 mb-4 flex flex-col gap-2">
    <div className="flex justify-between items-center">
      <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      <div className="flex gap-3 text-gray-500">
        <FaEdit className="cursor-pointer hover:text-blue-500" />
        <FaTrash
          className="cursor-pointer hover:text-red-500"
          onClick={onDelete}
        />
        <FaThumbtack
          className="cursor-pointer hover:text-yellow-500"
          onClick={onTogglePin}
        />
      </div>
    </div>
    <p className="text-sm text-gray-600">{date}</p>
    <p className="text-gray-700">{content}</p>
  </div>
);

const AnnouncementNoticeBoard: React.FC = () => {
  const {
    pinnedNotices,
    recentNotices,
    deleteNotice,
    togglePin,
  } = useAnnouncementNoticeBoardViewModel();

  return (
    <div className="w-[1469px] h-[1601px] mx-auto mt-[416px] relative opacity-100">
      <div className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">📌 Pinned Notices</h2>
        {pinnedNotices.map((notice, idx) => (
          <NoticeCard
            key={idx}
            title={notice.title}
            date={notice.date}
            content={notice.content}
            onDelete={() => deleteNotice(notice.title)}
            onTogglePin={() => togglePin(notice.title)}
          />
        ))}
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">🕒 Recent Notices</h2>
        {recentNotices.map((notice, idx) => (
          <NoticeCard
            key={idx}
            title={notice.title}
            date={notice.date}
            content={notice.content}
            onDelete={() => deleteNotice(notice.title)}
            onTogglePin={() => togglePin(notice.title)}
          />
        ))}
      </div>
    </div>
  );
};

export default AnnouncementNoticeBoard;
