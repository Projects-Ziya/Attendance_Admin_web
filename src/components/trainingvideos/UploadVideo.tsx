import React, { useRef } from "react";
import type { Video } from "../../models/Video";
import clapboardicon from "../../assets/icons/clapboard.svg";
import api from "../../Api/api";

type Props = {
  onUpload: (video: Video) => void;
};

const UploadVideo: React.FC<Props> = ({ onUpload }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleBrowse = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("video_file", file);
    formData.append("title", file.name);

    try {
      const res = await api.post("/api/videos-upload/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Use REAL backend data
      const newVideo: Video = res.data;
      onUpload(newVideo);
    } catch (err) {
      console.error("Video Upload Error:", err);
    }
  };

  return (
    <div className="relative w-[1275px] h-[400px]">

      {/* Hidden Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="video/*"
        className="hidden"
        onChange={handleFileChange}
      />

      {/* SVG border */}
      <svg width="1275" height="375" className="absolute top-0 left-0">
        <rect
          width="1275"
          height="370"
          rx="8"
          fill="white"
          stroke="#000000"
          strokeWidth="1"
          strokeDasharray="10,10"
        />
      </svg>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center pt-5 text-center gap-4 z-10">
        <p className="text-[#4D4D4D] text-[22px] font-semibold">
          Upload your video you want to convert to AVI
        </p>

        <img src={clapboardicon} alt="Upload Icon" className="w-[145px] h-[143px]" />

        <p className="text-[#7D7D7D] text-[16px] font-normal">
          Drag and drop video file
        </p>
        <p className="text-[#7D7D7D] text-[16px] font-normal">or</p>

        <button
          className="bg-[#00A0E3] text-white px-6 py-2 rounded text-sm font-medium"
          onClick={handleBrowse}
        >
          Browse
        </button>
      </div>
    </div>
  );
};

export default UploadVideo;
