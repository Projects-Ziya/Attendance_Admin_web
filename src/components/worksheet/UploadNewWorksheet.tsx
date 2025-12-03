import React from "react";
import upload_icon from "../../assets/icons/documenticon.svg";

type Props = {
  onClose: () => void; // function passed from parent to close modal
};

const UploadNewWorksheet: React.FC<Props> = ({ onClose }) => {
  return (
   
      <div className="h-[943px] w-[1078px] rounded-[15px] bg-[#FCFCFC]">
        {/* Header */}
        <div className="flex justify-between">
          <h1 className="text-[35px] pt-[65px] pl-[77px] font-[500]">
            Upload New Worksheet
          </h1>
          <button
            className="pt-[52px] text-[#6C6C6C] text-[36px] hover:opacity-80 active:scale-95 transition-transform duration-150 font-[500] pr-[54px]"
            onClick={onClose} // ✅ correct prop name
          >
            x
          </button>
        </div>

        {/* File Upload Section */}
        <h1 className="text-[25px] font-[500] pt-[30px] pl-[77px]">
          Select Excel Files
        </h1>
        <div className="ml-[65px] mt-[75px]">
          <svg width="947" height="278">
            <rect
              width="100%"
              height="100%"
              fill="none"
              stroke="#6C6C6C"
              strokeWidth="3"
              strokeDasharray="10 10"
            />

            <image
              href={upload_icon}
              x="50%"
              y="40%"
              width="60"
              height="80"
              transform="translate(-30,-30)"
            />
            <text
              x="5%"
              y="80%"
              fill="#0F6EDD"
              fontSize="25"
              className="font-[500] cursor-pointer select-none hover:opacity-80"
              onClick={() => console.log("Text Clicked")}
            >
              Click to upload
            </text>
          </svg>
        </div>

        {/* Worksheet Name */}
        <h1 className="text-[30px] font-[500] pt-[47px] pl-[65px]">
          WorkSheet Name
        </h1>
        <input
          className="bg-[#EEEEEE] focus:outline-none h-[93px] w-[947px] text-[25px] rounded-[20px] pl-[28px] mt-[40px] ml-[65px] placeholder:text-[25px] placeholder:text-[#6E6565]"
          type="text"
          placeholder="Enter Worksheet Name"
        />

        {/* Upload Button */}
        <button className="h-[93px] hover:opacity-90 transition-transform duration-150 active:scale-95 w-[947px] bg-[#00A0E3] mt-[35px] rounded-[15px] text-[40px] text-white ml-[65px]">
          Upload
        </button>
      </div>
   
  );
};

export default UploadNewWorksheet;
