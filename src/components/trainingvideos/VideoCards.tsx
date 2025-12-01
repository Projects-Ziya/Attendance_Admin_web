import React from "react";
import type { Video } from "../../models/Video";
import editicon from "../../assets/icons/editboxicon.svg";
import deleteicon from "../../assets/icons/delete.svg";
import videoicon from "../../assets/icons/videoicon.svg";

type Props = {
  videos: Video;                          // ✅ single video object
  onDelete: (id: string) => void;
  onEdit: (videos: Video) => void;
};

const VideoCard: React.FC<Props> = ({ videos, onDelete, onEdit }) => {
  if (!videos) return null; // Defensive check

  return (
    <div className="w-[536px] h-[629px] bg-white border border-[#C3C3C3] rounded-[15px] pr-[33px] pl-[33px] pt-[25px] opacity-100 shadow-sm flex flex-col justify-between ">
      {/* Top Icon */}
      <div className="flex justify-center items-center  w-full h-[246px] rounded-[15px] bg-gradient-to-r from-[#4E7BFF] to-[#9222FF] ">
        <img src={videoicon} alt="Video Icon" className="w-[72px] h-[52px]" />
      </div>

      {/* Title */}
      <p className="text-[#4D4D4D] text-[25px] font-medium  leading-[16px] tracking-[0.08em]">
        Employee Onboarding Process
      </p>

      {/* Duration + Views */}
      <p className="text-[#4D4D4D] text-[16px] font-medium ">
        ⏱ {videos.duration}15:00 | 👁 {videos.views} 46 views
      </p>

      {/* Description */}
      <p className="text-[#4D4D4D] text-[20px] font-medium text-centerleading-[25px] tracking-[0.08em]">
        {videos.description}  Complete guide for new employee 
onboarding procedures
      </p>

      {/* Upload Info */}
      <p className="text-[#7D7D7D] text-[15px] font-medium leading-[25px] tracking-[0.08em] ">
        Uploaded by {videos.uploadedBy} - {videos.uploadDate}HR Department • 2025-11-20

      </p>

      {/* Action Buttons */}
      <div className="flex justify-center gap-6 pb-8">
        <button className="bg-[#00A0E3] text-white px-6 py-2 rounded text-[25px] font-medium leading-[16px] tracking-[0.08em] w-[272px] h-[45px]">
          Watch
        </button>
        <img
          src={editicon}
          alt="Edit"
          className="w-5 h-5 cursor-pointer"
          onClick={() => onEdit(videos)}
        />
        <img
          src={deleteicon}
          alt="Delete"
          className="w-5 h-5 cursor-pointer"
          onClick={() => onDelete(videos.id)}
        />
      </div>
    </div>
  );
};

export default VideoCard;
