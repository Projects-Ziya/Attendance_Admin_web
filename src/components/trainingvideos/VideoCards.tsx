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
        : `https://attendance.ziyaacademy.co.in${videos.video_file}`;
      setVideoUrl(fullVideoURL);
    }

    if (videos.thumbnail) {
      const fullThumbURL = videos.thumbnail.startsWith("http")
        ? videos.thumbnail
        : `https://attendance.ziyaacademy.co.in${videos.thumbnail}`;
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
   <div
  className="w-full max-w-[536px] h-auto bg-white border border-[#C3C3C3] 
             rounded-[15px] px-[33px] pt-[25px] opacity-100 shadow-sm 
             flex flex-col justify-between mx-auto"
>
  {/* Thumbnail */}
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
  <p className="text-[#4D4D4D] text-[22px] md:text-[25px] font-medium leading-[20px] tracking-[0.08em] mt-4">
    {videos.title || "Untitled Video"}
  </p>

  {/* Duration + Views */}
  <p className="text-[#4D4D4D] text-[14px] md:text-[16px] font-medium pt-2">
    ⏱ {videos.duration || "00:00"} | 👁 {videos.views || 0} views
  </p>

  {/* Description */}
  <p className="text-gray-600 scrollable text-[13px] md:text-[14px] font-medium leading-[22px] tracking-[0.08em] break-words">
    {videos.description || "No description"}
  </p>

  {/* Uploaded Info */}
  <p className="text-[#7D7D7D] py-2 text-[14px] md:text-[15px] font-medium leading-[22px] tracking-[0.08em]">
    Uploaded by {videos.uploaded_by || "Unknown"} • {formattedDate}
  </p>

  {/* Buttons */}
  <div className="flex justify-between items-center gap-6 pb-8">
    <button
      className="relative px-6 py-2 w-[130px] md:w-[150px] h-[45px] md:h-[50px] 
                 text-[18px] md:text-[20px] font-medium bg-[#00A0E3] 
                 backdrop-blur-sm rounded-lg text-white border border-white/20 
                 hover:bg-sky-600 transition-all duration-200 
                 hover:scale-105 active:scale-90"
      onClick={() => videoUrl && window.open(videoUrl, "_blank")}
    >
      Watch
    </button>

    <div className="pt-2 flex gap-6">
      {/* ✅ Edit Button */}
      <button
        className="cursor-pointer w-[36px] md:w-[40px] h-[36px] md:h-[40px] 
                   flex rounded-lg justify-center items-center transition-all 
                   border border-gray-400 duration-200 hover:scale-110 active:scale-90"
        onClick={handleEditClick}
      >
        <img src={editicon} alt="Edit" className="w-5 h-5" />
      </button>

      {/* ✅ Delete Button */}
      <button
        className="cursor-pointer w-[36px] md:w-[40px] h-[36px] md:h-[40px] 
                   flex rounded-lg justify-center items-center transition-all 
                   border border-red-500 duration-200 hover:scale-110 active:scale-90"
        onClick={() => onDelete(videos.id)}
      >
        <img src={deleteicon} alt="Delete" className="w-5 h-5" />
      </button>
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
