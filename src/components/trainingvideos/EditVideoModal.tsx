import React, { useState, useEffect } from "react";
import api from "../../Api/api";
import toast from "react-hot-toast";

interface Video {
  id: string;
  title: string;
  description: string;
  uploadDate: string;
  uploaderId?: string;
  [key: string]: any;
}

interface EditVideoModalProps {
  editingVideo: Video;
  onClose: () => void;
  onSaveEdit: () => void;
}

const EditVideoModal: React.FC<EditVideoModalProps> = ({
  editingVideo,
  onClose,
  onSaveEdit,
}) => {
  const [isModalHovered, setIsModalHovered] = useState(false);
  const [isInputHovered, setIsInputHovered] = useState(false);

  const showModalBorder = isModalHovered && !isInputHovered;

  const [localTitle, setLocalTitle] = useState(editingVideo?.title || "");
  const [localDate, setLocalDate] = useState(editingVideo?.uploadDate || "");
  const [localDescription, setLocalDescription] = useState(editingVideo?.description || "");
  const [localUploaderId, setLocalUploaderId] = useState(editingVideo?.uploaderId || "");

  useEffect(() => {
    setLocalTitle(editingVideo?.title || "");
    setLocalDate(editingVideo?.uploadDate || "");
    setLocalDescription(editingVideo?.description || "");
    setLocalUploaderId(editingVideo?.uploaderId || "");
  }, [editingVideo]);

  const handleSave = async () => {
    try {
  const res = await api.patch(`/api/video-update/${editingVideo.id}/`, {
  title: localTitle,
  description: localDescription,
  uploaded_at: localDate,
  uploaded_by: localUploaderId,
});


      if (res.data.success) {
        onSaveEdit();
        onClose();
        toast.success("succefully saved the changes")
      } else {
        toast.error("Failed to update video");
      }
    } catch (err) {
      console.error("Update Error:", err);
      toast.error("Error updating video");
    }
  };

  if (!editingVideo) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div
        className={`h-auto pb-5 w-[1080px] shadow-lg rounded-[20px] bg-white transition ${
          showModalBorder ? "border-4 border-sky-400" : "border border-white"
        }`}
        onMouseEnter={() => setIsModalHovered(true)}
        onMouseLeave={() => setIsModalHovered(false)}
      >
        <div className="flex justify-between items-start">
          <h1 className="text-[35px] font-[500] pt-[40px] pl-[50px]">Edit Video</h1>
          <button
            className="text-[36px] font-[500] pr-[50px] text-[#6C6C6C] pt-[40px]"
            onClick={onClose}
          >
            x
          </button>
        </div>

        {/* Video Title */}
        <p className="pt-[40px] pl-[50px] text-[25px] font-[400]">Video Title</p>
        <input
          type="text"
          value={localTitle}
          onChange={(e) => setLocalTitle(e.target.value)}
    
          className={`h-[60px] border-4 bg-[#EEEEEE] rounded-[15px] w-[960px] ml-[50px] mt-[16px] pl-5 text-[28px] transition 
          
          `}
        />

        {/* Upload Date */}
        <p className="pt-[20px] pl-[50px] text-[25px] font-[400]">Upload Date</p>
        <input
          type="date"
          value={localDate}
          onChange={(e) => setLocalDate(e.target.value)}
          className="h-[60px] border-4 bg-[#EEEEEE] rounded-[15px] w-[960px] ml-[50px] mt-[16px] pl-5 text-[28px] border-[#EEEEEE]"
        />

        {/* Description */}
        <p className="pt-[20px] pl-[50px] text-[25px] font-[400]">Description</p>
        <textarea
          value={localDescription}
          onChange={(e) => setLocalDescription(e.target.value)}
          className="h-[120px] border-4 bg-[#EEEEEE] rounded-[15px] w-[960px] ml-[50px] mt-[16px] pl-5 pt-3 text-[24px] border-[#EEEEEE] resize-none"
        />

        {/* Uploader ID (optional) */}
        {/* <p className="pt-[20px] pl-[50px] text-[25px] font-[400]">Uploader ID</p>
        <input
          type="text"
          value={localUploaderId}
          onChange={(e) => setLocalUploaderId(e.target.value)}
          className="h-[60px] border-4 bg-[#EEEEEE] rounded-[15px] w-[960px] ml-[50px] mt-[16px] pl-5 text-[24px] border-[#EEEEEE]"
        /> */}

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="h-[60px] w-[960px] ml-[50px] mt-[24px] bg-[#00A0E3] rounded-[15px] text-white text-[28px] font-[500] hover:bg-sky-600"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default EditVideoModal;
