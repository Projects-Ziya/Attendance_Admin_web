import React, { useState } from "react";

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
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
        </p>
        {file && (
          <p className="text-sm text-green-600 mt-2">
            Selected file: {file.name}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        disabled={!file || !selectedTeammate}
        className="mt-8 w-full bg-blue-600 text-white font-semibold py-3 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
      >
        Submit
      </button>
    </div>
  );
};

export default UploadSalaryReport;
