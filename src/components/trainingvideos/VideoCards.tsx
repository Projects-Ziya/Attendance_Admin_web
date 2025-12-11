import React, { useState, useEffect } from "react";
import type { Video } from "../../models/Video";
import editicon from "../../assets/icons/editboxicon.svg";
import deleteicon from "../../assets/icons/delete.svg";
import videoicon from "../../assets/icons/videoicon.svg";
import EditVideoModal from "./EditVideoModal";
import toast from "react-hot-toast";

type Props = {
  videos: Video;
  onDelete: (id: string) => void;
};

const VideoCard: React.FC<Props> = ({ videos, onDelete }) => {
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [thumbnailUrl, setThumbnailUrl] = useState<string>("");

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  useEffect(() => {
    if (videos.video_file) {
      const fullVideoURL = videos.video_file.startsWith("http")
        ? videos.video_file
        : `http://192.168.1.12:8000${videos.video_file}`;
      setVideoUrl(fullVideoURL);
    }

    if (videos.thumbnail) {
      const fullThumbURL = videos.thumbnail.startsWith("http")
        ? videos.thumbnail
        : `http://192.168.1.12:8000${videos.thumbnail}`;
      setThumbnailUrl(fullThumbURL);
    }
  }, [videos]);

  if (!videos) return null;

  const formattedDate = videos.uploaded_at
    ? new Date(videos.uploaded_at).toLocaleDateString()
    : "";

  const handleEditClick = () => {
    setSelectedVideo(videos);
    setIsEditModalOpen(true);
  };

  return (
    <div className="w-[536px] h-[600px] bg-white border border-[#C3C3C3] rounded-[15px] pr-[33px] pl-[33px] pt-[25px] opacity-100 shadow-sm flex flex-col justify-between">

      {/* Thumbnail */}
      <div className="flex justify-center items-center w-full h-[246px] rounded-[15px] bg-black overflow-hidden relative">
        {thumbnailUrl ? (
          <img
            src={thumbnailUrl}
            alt="Video Thumbnail"
            className="w-full h-full object-cover rounded-[15px]"
          />
        ) : videoUrl ? (
          <video src={videoUrl} controls className="w-full h-full rounded-[15px]" />
        ) : (
          <img src={videoicon} alt="Video Icon" className="w-[72px] h-[52px]" />
        )}
      </div>

      {/* Title */}
      <p className="text-[#4D4D4D] text-[25px] font-medium leading-[16px] tracking-[0.08em] mt-4">
        {videos.title || "Untitled Video"}
      </p>

      {/* Duration + Views */}
      <p className="text-[#4D4D4D] text-[16px] font-medium pt-2">
        ⏱ {videos.duration || "00:00"} | 👁 {videos.views || 0} views
      </p>

      {/* Description */}
      <p className="text-gray-600 scrollable text-[14px] font-medium leading-[25px] tracking-[0.08em] break-words">
        {videos.description || "No description"}
      </p>

      {/* Uploaded Info */}
      <p className="text-[#7D7D7D] py-2 text-[15px] font-medium leading-[25px] tracking-[0.08em]">
        Uploaded by {videos.uploaded_by || "Unknown"} • {formattedDate}
      </p>

      {/* Buttons */}
      <div className="flex justify-center gap-6 pb-8">
        <button
          className="bg-[#00A0E3] text-white px-6 py-2 rounded text-[25px] font-medium w-[272px] h-[45px]"
          onClick={() => videoUrl && window.open(videoUrl, "_blank")}
        >
          Watch
        </button>

        <div className="pt-2 flex gap-6">
          {/* ✅ Edit Button */}
          <img
            src={editicon}
            alt="Edit"
            className="w-5 h-5 cursor-pointer"
            onClick={handleEditClick}
          />

          {/* ✅ Delete Button */}
          <img
            src={deleteicon}
            alt="Delete"
            className="w-5 h-5 cursor-pointer"
            onClick={() => onDelete(videos.id)}
          />
        </div>
      </div>

      {/* ✅ Edit Modal */}
      {isEditModalOpen && selectedVideo && (
        <EditVideoModal
          editingVideo={selectedVideo}
          onClose={() => setIsEditModalOpen(false)}
          onSaveEdit={() => {
            setIsEditModalOpen(false);
            toast.success("Video updated");
          }}
        />
      )}
    </div>
  );
};

export default VideoCard;
