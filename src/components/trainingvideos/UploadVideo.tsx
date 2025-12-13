import React, { useRef, useState } from "react";
import type { Video } from "../../models/Video";
import clapboardicon from "../../assets/icons/clapboard.svg";

type Props = {
  onFileSelect: (file: File | null) => void;
};

const UploadVideo: React.FC<Props> = ({ onFileSelect }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedFileName, setSelectedFileName] = useState("");

  const handleBrowse = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) setSelectedFileName(file.name);
    onFileSelect(file);
  };

  return (
    <div className="relative w-[1275px] h-[400px]">
      <input
        ref={fileInputRef}
        type="file"
        accept="video/*"
        className="hidden"
        onChange={handleFileChange}
      />

      <svg width="1350" height="385" className="absolute top-0 left-0">
        <rect
          width="1350"
          height="385"
          rx="8"
          fill="white"
          stroke="#000000"
          strokeWidth="1"
          strokeDasharray="10,10"
        />
      </svg>

      <div className="absolute inset-0 flex flex-col items-center pt-8 text-center gap-4 z-10">
        <p className="text-[#4D4D4D] mb-[20px] text-[22px] font-semibold">
          Upload your video you want to convert to AVI
        </p>

        <img src={clapboardicon} alt="Upload Icon" className="w-[145px] h-[143px] " />

        <p className="text-[#7D7D7D] text-[16px] font-normal">
          {selectedFileName || "Drag and drop video file or click Browse"}
        </p>

        <button
          className="bg-[#00A0E3] text-white px-6 py-2 rounded text-sm font-medium hover:text-gray-800 transition-all duration-200 hover:scale-110 active:scale-90"
          onClick={handleBrowse}
        >
          Browse
        </button>
      </div>
    </div>
  );
};

export default UploadVideo;
