import React from "react";
import type { Video } from "../../models/Video";
import clapboardicon from "../../assets/icons/clapboard.svg";

type Props = {
  onUpload: (video: Video) => void; // ✅ single video object
};

const UploadVideo: React.FC<Props> = ({ onUpload }) => {
  const handleUpload = () => {
    const newVideo: Video = {
      id: Math.random().toString(36).slice(2, 10),
      title: "Employee Onboarding Process",
      duration: "13:00",
      views: 46,
      description: "Complete guide for new employee onboarding procedures",
      uploadedBy: "HR Department",
      uploadDate: "2023-11-20",
    };
    onUpload(newVideo); // ✅ call with single video
  };

  return (
    <div className="relative w-[1275px] h-[638px]">
      {/* SVG dashed border */}
      <svg
        width="1275"
        height="638"
        className="absolute top-0 left-0"
        style={{ opacity: 1 }}
      >
        <rect
          x="0"
          y="0"
          width="1275"
          height="638"
          rx="8"
          ry="8"
          fill="white"
          stroke="#000000"
          strokeWidth="1"
          strokeDasharray="10,10"
        />
      </svg>

      {/* Content inside the box */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center gap-4 z-10">
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
          onClick={handleUpload}
        >
          Browse
        </button>
      </div>
    </div>
  );
};

export default UploadVideo;
