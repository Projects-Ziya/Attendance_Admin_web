import React, { useState } from "react";

interface DragDropProps {
  onFileSelect: (file: File) => void;
}

const DragDropUpload: React.FC<DragDropProps> = ({ onFileSelect }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState("");

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (!file) return;

    setFileName(file.name);
    onFileSelect(file);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    onFileSelect(file);
  };

  return (
    <div
      className={`w-full h-[200px] border-2 border-dashed rounded-xl flex flex-col items-center justify-center cursor-pointer transition ${
        isDragging ? "border-blue-500 bg-blue-50" : "border-gray-400"
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => document.getElementById("fileInput")?.click()}
    >
      <p className="text-gray-600 text-lg">
        {fileName ? `Selected: ${fileName}` : "Drag & Drop your video here"}
      </p>
      <p className="text-gray-400 text-sm">or click to browse</p>

      <input
        id="fileInput"
        type="file"
        accept="video/*"
        className="hidden"
        onChange={handleFileInput}
      />
    </div>
  );
};

export default DragDropUpload;
