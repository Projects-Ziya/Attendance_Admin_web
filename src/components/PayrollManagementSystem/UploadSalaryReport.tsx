import React, { useState } from "react";
import { ChevronDown, Upload } from "lucide-react";
interface UploadSalaryReportProps {
  teammates: string[];
  onSubmit: (file: File | null, teammate: string) => void;
}

const UploadSalaryReport: React.FC<UploadSalaryReportProps> = ({
  teammates,
  onSubmit,
}) => {
  const [selectedTeammate, setSelectedTeammate] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = () => {
    onSubmit(file, selectedTeammate);
  };

  return (
    <div className="w-[1389px] h-[1061px] bg-white shadow-lg rounded-lg p-8">
      {/* Dropdown */}
      <label className="block text-gray-700 font-medium mb-2">
        Name of Teammates
      </label>
      <select
        value={selectedTeammate}
        onChange={(e) => setSelectedTeammate(e.target.value)}
        className="w-full border border-gray-300 rounded-md p-3 mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Select teammate</option>
        {teammates.map((name) => (
          <option key={name} value={name}>
            {name}
          </option>
        ))}
      </select>

      {/* Upload Area */}
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        className="flex flex-col items-center justify-center border-2 border-dashed border-gray-400 rounded-lg h-[400px] cursor-pointer bg-gray-50 hover:bg-gray-100 transition"
      >
        <svg
          className="w-12 h-12 text-gray-500 mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4v16m8-8H4"
          />
        </svg>
        <p className="text-gray-600 mb-2">
          Drag and drop a PDF file or{" "}
          <label className="text-blue-600 underline cursor-pointer">
            Select PDF
            <input
=======
import React, { useState, DragEvent } from "react";
import { ChevronDown, Upload } from "lucide-react";

const UploadSalaryReport: React.FC = () => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleDrag = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
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
    <div className="bg-white rounded-md p-12 border border-gray-200">
      {/* Title */}
      <h2 className="text-lg font-medium text-[22px] tracking-[0.08em] leading-4 pb-12">Upload Salary Report</h2>

      {/* Name of Teammates */}
      <div className="mb-4">
        <label className="text-[22px] text-[#585555] tracking-[0.08em] leading-4  font-medium">Name of Teammates</label>
       <div className="mt-11">
 <div className="w-full bg-[#EFEFEF] px-4 py-3 rounded-md flex items-center justify-between cursor-pointer">
  <select
    className="bg-transparent w-full text-gray-600 text-sm focus:outline-none cursor-pointer appearance-none"
  >
    <option>Teammates</option>
    <option>John</option>
    <option>David</option>
    <option>Aditi</option>
  </select>

  <ChevronDown
    className="text-gray-500 flex-shrink-0 ml-2 pointer-events-none"
    size={18}
  />
</div>

</div>

      </div>

      {/* Drag & Drop Box */}
      <div
        className={`border border-dashed rounded-md  flex flex-col justify-center items-center transition  h-[535px]
          ${dragActive ? "border-blue-400 bg-blue-50" : "border-gray-300"}
        `}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <div className="bg-[#DAF1FB] p-4 rounded-full w-[147px] h-[147px] mb-3 flex items-center justify-center">
  <Upload className="text-[#00A0E3] w-[50px] h-[50px]"  />
</div>

        {!selectedFile ? (
          <>
            <p className=" text-4 font-medium tracking-[0.08em] leading-4">Drag and drop a PDF file</p>
            <p className=" text-4 font-medium tracking-[0.08em] leading-4 pt-2">or</p>
            <div className="pt-[49px]">
            <label
              htmlFor="fileUpload"
              className="bg-[#00A0E3] text-white text-sm px-4 py-2 rounded cursor-pointer "
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
          <p className="text-gray-700 text-sm font-medium">{selectedFile.name}</p>
        )}
      </div>

      {/* Submit Button */}

      <div className="pt-[61px]">
      <button className="w-full bg-[#00A0E3] text-white h-11  rounded text-sm hover:bg-blue-600 transition">
        Submit
      </button>
      </div>
    </div>
  );
};

export default UploadSalaryReport;
