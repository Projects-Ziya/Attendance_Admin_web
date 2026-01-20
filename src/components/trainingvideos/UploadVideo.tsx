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
    <div
  className="relative w-full mx-auto h-[400px] max-w-full md:max-w-[1275px] 
             rounded-[8px] overflow-hidden"
>
  {/* Hidden File Input */}
  <input
    ref={fileInputRef}
    type="file"
    accept="video/*"
    className="hidden"
    onChange={handleFileChange}
  />

  {/* SVG Drop Zone */}
  <svg
    className="absolute top-0 left-0 w-full h-[385px]"
    viewBox="0 0 1350 385"
    preserveAspectRatio="none"
  >
    <rect
      width="100%"
      height="100%"
      rx="8"
      fill="white"
      stroke="#000000"
      strokeWidth="1"
      strokeDasharray="10,10"
    />
  </svg>

  {/* Content Overlay */}
  <div className="absolute inset-0 flex flex-col items-center pt-8 text-center gap-4 z-10">
    <p className="text-[#4D4D4D] mb-[20px] text-[22px] font-semibold">
      Upload your video you want to convert to AVI
    </p>

    <img
      src={clapboardicon}
      alt="Upload Icon"
      className="w-[120px] h-[120px] md:w-[145px] md:h-[143px]"
    />

    <p className="text-[#7D7D7D] text-[16px] font-normal px-4">
      {selectedFileName || "Drag and drop video file or click Browse"}
    </p>

    <button
      className="bg-[#00A0E3] text-white px-6 py-2 rounded text-sm font-medium 
                 transition-all duration-200 hover:bg-[#008dc7] hover:scale-105 active:scale-95"
      onClick={handleBrowse}
    >
      Browse
    </button>
  </div>
</div>
  );
};

export default UploadVideo;
