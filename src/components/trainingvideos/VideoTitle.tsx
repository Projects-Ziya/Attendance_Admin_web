import React, { useState } from "react";
import UploadVideo from "./UploadVideo";
import type { Video } from "../../models/Video";
import api from "../../Api/api";
import toast from "react-hot-toast";
import DragDropUpload from "../DragDropUpload";

const UploadForm: React.FC<{ onUpload: (video: Video) => void }> = ({ onUpload }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);



  // const handleFileSelect = (file: File) => {
  //   setSelectedFile(file);
  //   console.log("Selected file:", file);
  // };


  const handleUpload = async () => {
    if (!title || !description || !selectedFile) {
      toast.error("Please provide title, description, and select a file.");
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append("video_file", selectedFile);
    formData.append("title", title);
    formData.append("description", description);

    try {
      const res = await api.post("/api/videos-upload/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const newVideo: Video = res.data.data;
      onUpload(newVideo);
      toast.success("Video uploaded successfully!");
      setTitle("");
      setDescription("");
      setSelectedFile(null);
    } catch (err) {
      console.error("Upload error:", err);
      toast.error("Upload failed!");
    } finally {
      setIsUploading(false);
    }
  };



  return (
    <div className="w-full max-w-[1350px] mx-auto space-y-6">
      <div>
        <label className="block text-[16px] font-semibold text-gray-700 mb-1">Title</label>
        <input
          type="text"
          placeholder="Enter Video Title"
          className="w-full h-[55px] px-4 rounded-lg bg-gray-100 text-gray-700 placeholder-gray-400 outline-none"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="
      pb-10">
        <label className="block text-[16px] font-semibold text-gray-700 mb-1">Description</label>
        <input
          type="text"
          placeholder="Enter Video Description"
          className="w-full h-[55px] px-4 rounded-lg bg-gray-100 text-gray-700 placeholder-gray-400 outline-none"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <UploadVideo onFileSelect={setSelectedFile} />

       

      <button
        className={`w-full h-[58px] text-white text-[18px] font-medium rounded-lg flex items-center justify-center gap-2 ${
          title && description && selectedFile
            ? "bg-[#00A0E3]"
            : "bg-gray-400 cursor-not-allowed"
        }`}
        onClick={handleUpload}
        disabled={!title || !description || !selectedFile || isUploading}
      >
        {isUploading ? "Uploading..." : "Upload"}
      </button>
    </div>
  );
};

export default UploadForm;
