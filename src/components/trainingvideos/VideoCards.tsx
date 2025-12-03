import React, { useState, useEffect } from "react";
import type { Video } from "../../models/Video";
import editicon from "../../assets/icons/editboxicon.svg";
import deleteicon from "../../assets/icons/delete.svg";
import videoicon from "../../assets/icons/videoicon.svg";
import api from "../../Api/api";

type Props = {
  videos: Video;
  onDelete: (id: string) => void;
  onEdit: (videos: Video) => void;
};

const VideoCard: React.FC<Props> = ({ videos, onDelete, onEdit }) => {
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [thumbnailUrl, setThumbnailUrl] = useState<string>("");

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const res = await api.get(`/api/videos-view/${videos.id}/`);
        const data = res.data.data;

        if (data.video_file) {
          setVideoUrl(data.video_file);
        }
      } catch (err) {
        console.error("Video load error:", err);
      }
    };

    fetchVideo();
  }, [videos.id]);

  if (!videos) return null;

  return (
    <div className="w-[536px] h-[629px] bg-white border border-[#C3C3C3] rounded-[15px] pr-[33px] pl-[33px] pt-[25px] opacity-100 shadow-sm flex flex-col justify-between">

      {/* Top Video Preview */}
      <div className="flex justify-center items-center w-full h-[246px] rounded-[15px] bg-black overflow-hidden relative">
        {thumbnailUrl ? (
          <img
            src={thumbnailUrl}
            alt="Video Thumbnail"
            className="w-full h-full object-cover rounded-[15px]"
          />
        ) : videoUrl ? (
          <video
            src={videoUrl}
            controls
            className="w-full h-full rounded-[15px]"
          />
        ) : (
          <img src={videoicon} alt="Video Icon" className="w-[72px] h-[52px]" />
        )}
      </div>

      {/* Title */}
      <p className="text-[#4D4D4D] text-[25px] font-medium leading-[16px] tracking-[0.08em] mt-4">
        {videos.title}
      </p>

      {/* Duration + Views */}
      <p className="text-[#4D4D4D] text-[16px] font-medium">
        ⏱ {videos.duration || "00:00"} | 👁 {videos.views} views
      </p>

      {/* Description */}
      <p className="text-[#4D4D4D] text-[20px] font-medium leading-[25px] tracking-[0.08em]">
        {videos.description || "No description"}
      </p>

      {/* Upload Info */}
      <p className="text-[#7D7D7D] text-[15px] font-medium leading-[25px] tracking-[0.08em]">
        Uploaded by {videos.uploadedBy} • {videos.uploadDate}
      </p>

      {/* Action Buttons */}
      <div className="flex justify-center gap-6 pb-8">
        <button
          className="bg-[#00A0E3] text-white px-6 py-2 rounded text-[25px] font-medium w-[272px] h-[45px]"
          onClick={() => videoUrl && window.open(videoUrl, "_blank")}
        >
          Watch
        </button>

        <div className="pt-2 flex gap-6">
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
    </div>
  );
};

export default VideoCard;
