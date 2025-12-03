import React, { useState, useEffect } from "react";
import api from "../../Api/api";
import toast from "react-hot-toast";

interface Worksheet {
  id: string;
  leaid: string;
  name: string;
  [key: string]: any; // other possible worksheet properties
}

interface EditModalProps {
  onClose: () => void;
  editingWorksheet: Worksheet;
  onChangeEditingName: (newName: string) => void;
  onSaveEdit: () => void;
}

const EditModal: React.FC<EditModalProps> = ({
  onClose,
  editingWorksheet,
  onSaveEdit,
}) => {
  const [isModalHovered, setIsModalHovered] = useState(false);
  const [isInputHovered, setIsInputHovered] = useState(false);

  const showModalBorder = isModalHovered && !isInputHovered;

  // Local state to reflect editingWorksheet name
  const [localName, setLocalName] = useState(editingWorksheet?.name || "");

  useEffect(() => {
    setLocalName(editingWorksheet?.name || "");
  }, [editingWorksheet]);

const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setLocalName(e.target.value); 
  };

  const handleEdit = async () => {
    try {
      const res = await api.patch(`/api/worksheet-update/${editingWorksheet.id}/
`, {
        title: localName,
      });

      if (res.data.success) {
        toast.success("Worksheet updated successfully");
        onSaveEdit();   // Refresh list in parent
        onClose();      // Close modal
      } else {
        toast.error("Failed to update");
      }
    } catch (err) {
      console.error("Update Error:", err);
      toast.error("Error updating worksheet");
    }
  };

  const handleSave = () => {
    handleEdit(); // Only call handleEdit (ID already inside)
  };

  if (!editingWorksheet) return null;

  return (
    <div
      className="flex pt-11 pb-10 justify-center"
      onMouseEnter={() => setIsModalHovered(true)}
      onMouseLeave={() => setIsModalHovered(false)}
    >
      <div
        className={`h-[526px] w-[1078px] shadow-lg rounded-[20px] bg-[#FFFFFF] transition ${
          showModalBorder ? "border-4 border-sky-400" : "border border-[white]"
        }`}
      >
        <div className="flex justify-between">
          <h1 className="text-[35px] font-[500] pt-[56px] pl-[65px]">Edit Worksheet</h1>
          <button
            className="text-[36px] font-[500] pr-[54px] text-[#6C6C6C] pt-[52px]"
            onClick={onClose}
          >
            x
          </button>
        </div>
        <p className="pt-[68px] pl-[65px] text-[25px] font-[400]">Worksheet Name</p>
        <input
          value={localName}
          onChange={handleInputChange}
          onMouseEnter={() => setIsInputHovered(true)}
          onMouseLeave={() => setIsInputHovered(false)}
          className={`h-[93px] border-4 bg-[#EEEEEE] rounded-[15px] w-[959px] ml-[65px] mt-[24px] pl-5 text-[40px] transition${
            isInputHovered ? " border-4 border-sky-400" : " border border-[#EEEEEE]"
          }`}
          type="text"
        />
        <button
          onClick={handleSave}
          className="h-[93px] border bg-[#00A0E3] rounded-[15px] w-[959px] ml-[65px] mt-[24px] text-[white] hover:bg-sky-600 pl-5 text-[40px] font-[500]"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default EditModal;
