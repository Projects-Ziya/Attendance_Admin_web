import React, { useState, useEffect } from "react";
import api from "../../Api/api";
import toast from "react-hot-toast";

interface Notice {
  id: string;
  title: string;
  description: string;
  date: string;
  department?: string;
  [key: string]: any; // other possible properties
}

interface EditNoticeModalProps {
  editingNotice: Notice;
  onClose: () => void;
  onSaveEdit: () => void;
}

const EditNoticeModal: React.FC<EditNoticeModalProps> = ({
  editingNotice,
  onClose,
  onSaveEdit,
}) => {
  const [isModalHovered, setIsModalHovered] = useState(false);
  const [isInputHovered, setIsInputHovered] = useState(false);

  const showModalBorder = isModalHovered && !isInputHovered;

  const [localTitle, setLocalTitle] = useState(editingNotice?.title || "");
  const [localDate, setLocalDate] = useState(editingNotice?.date || "");
  const [localDescription, setLocalDescription] = useState(
    editingNotice?.description || ""
  );

  useEffect(() => {
    setLocalTitle(editingNotice?.title || "");
    setLocalDate(editingNotice?.date || "");
    setLocalDescription(editingNotice?.description || "");
  }, [editingNotice]);

  const handleSave = async () => {
    try {
      const res = await api.put(`/api/notice-update/${editingNotice.id}/`, {
        title: localTitle,
        date: localDate,
        description: localDescription,
      });

      if (res.data.success) {
        onSaveEdit(); // Refresh parent list
        onClose(); // Close modal
      } else {
        toast.error("Failed to update notice");
      }
    } catch (err) {
      console.error("Update Error:", err);
      toast.error("Error updating notice");
    }
  };

  if (!editingNotice) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div
        className={`h-[700px] w-[1080px] shadow-lg rounded-[20px] bg-white transition ${
          showModalBorder ? "border-4 border-sky-400" : "border border-white"
        }`}
        onMouseEnter={() => setIsModalHovered(true)}
        onMouseLeave={() => setIsModalHovered(false)}
      >
        <div className="flex justify-between items-start">
          <h1 className="text-[35px] font-[500] pt-[40px] pl-[50px]">Edit Notice</h1>
          <button
            className="text-[36px] font-[500] pr-[50px] text-[#6C6C6C] pt-[40px]"
            onClick={onClose}
          >
            x
          </button>
        </div>

        {/* Title */}
        <p className="pt-[40px] pl-[50px] text-[25px] font-[400]">Notice Title</p>
        <input
          type="text"
          value={localTitle}
          onChange={(e) => setLocalTitle(e.target.value)}
          onMouseEnter={() => setIsInputHovered(true)}
          onMouseLeave={() => setIsInputHovered(false)}
          className={`h-[60px] border-4 bg-[#EEEEEE] rounded-[15px] w-[960px] ml-[50px] mt-[16px] pl-5 text-[28px] transition ${
            isInputHovered ? "border-4 border-sky-400" : "border border-[#EEEEEE]"
          }`}
        />

        {/* Date */}
        <p className="pt-[20px] pl-[50px] text-[25px] font-[400]">Date</p>
        <input
          type="date"
          value={localDate}
          onChange={(e) => setLocalDate(e.target.value)}
          className="h-[60px] border-4 bg-[#EEEEEE] rounded-[15px] w-[960px] ml-[50px] mt-[16px] pl-5 text-[28px] border border-[#EEEEEE]"
        />

        {/* Description */}
        <p className="pt-[20px] pl-[50px] text-[25px] font-[400]">Description</p>
        <textarea
          value={localDescription}
          onChange={(e) => setLocalDescription(e.target.value)}
          className="h-[120px] border-4 bg-[#EEEEEE] rounded-[15px] w-[960px] ml-[50px] mt-[16px] pl-5 pt-3 text-[24px] border border-[#EEEEEE] resize-none"
        />

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

export default EditNoticeModal;
