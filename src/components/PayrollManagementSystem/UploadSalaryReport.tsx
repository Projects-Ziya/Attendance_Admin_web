import React, { useState, DragEvent } from "react";
import { ChevronDown, Upload } from "lucide-react";
import toast from "react-hot-toast";
import api from "../../Api/api"; // <-- using your axios instance

const UploadSalaryReport: React.FC = () => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [employee, setEmployee] = useState<string>("");

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

  const handleSubmit = async () => {
    if (!selectedFile) {
      return toast.error("Please select a file before submitting.‼️");
    }

    if (!employee || employee === "Teammates") {
      return toast.error("Please select an employee name!");
    }

    try {
      toast.loading("Uploading...", { id: "upload" });

      const formData = new FormData();
      formData.append("pdf_file", selectedFile);
      formData.append("employee", employee);

      const response = await api.post("/api/salary-pdf-upload/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("File uploaded successfully!", { id: "upload" });
      console.log("API Response:", response.data);

      // reset after success
      setSelectedFile(null);
      setEmployee("");

    } catch (error: any) {
      toast.error(error.response?.data?.message || "Upload failed!", { id: "upload" });
      console.error("Upload error:", error);
    }
  };

  return (
    <div className="bg-white rounded-md p-12 border border-gray-200">
      <h2 className="text-lg font-medium text-[22px] tracking-[0.08em] leading-4 pb-12">
        Upload Salary Report
      </h2>

      <div className="mb-4">
        <label className="text-[22px] text-[#585555] tracking-[0.08em] leading-4  font-medium">
          Name of Teammates
        </label>
        <div className="mt-11">
          <div className="w-full bg-[#EFEFEF] px-4 py-3 rounded-md flex items-center justify-between cursor-pointer">
            <select
              value={employee}
              onChange={(e) => setEmployee(e.target.value)}
              className="bg-transparent w-full text-gray-600 text-sm focus:outline-none cursor-pointer appearance-none"
            >
              <option>Teammates</option>
              <option value="5">John</option>
              <option value="6">David</option>
              <option value="7">Aditi</option>
            </select>

            <ChevronDown className="text-gray-500 flex-shrink-0 ml-2 pointer-events-none" size={18} />
          </div>
        </div>
      </div>

      <div
        className={`border border-dashed rounded-md  flex flex-col justify-center items-center transition  h-[535px]
          ${dragActive ? "border-blue-400 bg-blue-50" : "border-gray-300"}`}
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

      <div className="pt-[61px]">
        <button
          className="w-full bg-[#00A0E3] text-white h-11  rounded text-sm hover:bg-blue-600 transition"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default UploadSalaryReport;
