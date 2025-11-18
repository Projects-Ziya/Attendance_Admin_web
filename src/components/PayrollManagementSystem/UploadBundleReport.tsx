import React, { useState } from "react";
import { ChevronDown, Upload, Eye } from "lucide-react";

const UploadBundleReport: React.FC = () => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  return (
    <div className="mt">
    <div className="bg-white rounded-md p-12 border border-gray-200">

        
      {/* Title */}
      <h2 className="text-lg font-medium text-[22px] tracking-[0.08em] leading-4 ">
        Upload Bundle Report
      </h2>

      <p className="text-[#585555] pt-11 pb-11 text-[22px] tracking-[0.08em] leading-4 whitespace-nowrap">Upload a bundle of salary slips. The system will generate individual slips based on the Excel format.</p>

      {/* Name of Teammates */}
      <div className="bg-[#E8F5FF] border border-[#00A0E3] rounded-md p-6 mb-10">
      <h2 className="text-[#00A0E3] font-medium  leading-4 tracking-[0.08em]">
        Excel Format Required:
      </h2>
      <p className="font-medium text-[18px] leading-6 text-[#00A0E3] pt-5 tracking-[0.08em]">Sl.No, Emp. No, Name, Bank Name, Bank A/C No, IFSC Code, Department, Designation, Basic Salary, Total Work, LOP Day, Paid Day Earnings, Total Deductions, Net Pay, Signature</p>
      <p className="font-medium text-[18px] leading-6 text-[#00A0E3] pt-4 tracking-[0.08em]">Next time upload:Name and Salary only</p>

    
    </div>

      {/* Drag & Drop Box */}
      <div
        className={`border border-[#000000] border-dashed rounded-md flex flex-col justify-center items-center transition h-[535px]
          ${dragActive ? "border-blue-400 bg-blue-50" : "border-gray-300"}
        `}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <div className="bg-[#DAF1FB] p-4 rounded-full w-[147px] h-[147px] mb-3 flex items-center justify-center">
          <Upload className="text-[#00A0E3] w-[50px] h-[50px]" />
        </div>

        {!selectedFile ? (
          <>
            <p className="text-4 font-medium tracking-[0.08em] leading-4">
              Drag and drop a PDF file
            </p>
            <p className="text-4 font-medium tracking-[0.08em] leading-4 pt-2">
              or
            </p>

            <div className="pt-[49px]">
              <label
                htmlFor="fileUpload"
                className="bg-[#00A0E3] text-white text-sm px-4 py-2 rounded cursor-pointer"
              >
                Select PDF
              </label>
            </div>

            <input
              id="fileUpload"
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
              className="hidden"
            />
          </>
        ) : (
          <p className="text-gray-700 text-sm font-medium">
            {selectedFile.name}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <div className="pt-[61px]">
        <button className="w-full bg-[#00A0E3] text-white h-11 rounded text-sm hover:bg-blue-600 transition">
          Submit
        </button>
      </div>
    </div>
    <div className="p-4 ">
      <p className="pb-5 font-medium text-[26px] leading-4 tracking-[0.08em]">Team History</p>
    <div className="border border-[#5B5B5B] rounded-md p-5">
      <p className=" font-medium text-[23px] leading-4 tracking-[0.08em]">Bundle Salary</p>
      <p className="pt-5 font-medium text-[#4D4D4D] text-[23px] leading-4 tracking-[0.08em]">Arun Dg, Subash.TP</p>
    </div>
    </div>
    </div>
  );
};

export default UploadBundleReport;
