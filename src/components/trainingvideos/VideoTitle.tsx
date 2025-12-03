import React from "react";

const UploadForm: React.FC = () => {
  return (
    <div className="w-full max-w-[1275px] mx-auto space-y-6">
      {/* Title */}
      <div>
        <label className="block text-[16px] font-semibold text-gray-700 mb-1">
          Title
        </label>
        <input
          type="text"
          placeholder="Enter Video Title"
          className="w-full h-[55px] px-4 rounded-lg bg-gray-100 text-gray-700 placeholder-gray-400 outline-none"
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-[16px] font-semibold text-gray-700 mb-1">
          Descriptions
        </label>
        <input
          type="text"
          placeholder="Enter Video Descriptions"
          className="w-full h-[55px] px-4 rounded-lg bg-gray-100 text-gray-700 placeholder-gray-400 outline-none"
        />
      </div>

      {/* Upload Button */}
      <button
        className="
          w-full h-[58px] 
          bg-[#00A0E3] 
          text-white text-[18px] 
          font-medium rounded-lg 
          flex items-center justify-center gap-2
        "
      >
        <span>Upload</span>
        <img
          src="/upload-icon.png" 
          alt="upload icon"
          className="w-6 h-6"
        />
      </button>
    </div>
  );
};

export default UploadForm;
