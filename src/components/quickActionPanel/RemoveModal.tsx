import React, { useState } from "react";

type RemoveModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (status: string, description: string) => void;
  employeeName: string;
  employeeRole: string;
  employeeId: string;
  employeeImage: string;
};

const RemoveModal = ({
  isOpen,
  onClose,
  onConfirm,
  employeeName,
  employeeRole,
  employeeId,
  employeeImage,
}: RemoveModalProps) => {
  const [status, setStatus] = useState("");
  const [description, setDescription] = useState("");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-[#FCFCFC] rounded-[10px] border border-[#F34040] shadow-md w-[667px] h-[594px] flex flex-col pl-[60px] pt-[48px]">
        <p className="font-regular text-[22px] text-[#F34040] w-[410px] leading-[33px]">
          Are you sure you want to delete this employee?
        </p>

        <div className="flex flex-row pt-[56px]">
          <img
            src={employeeImage}
            alt={employeeName}
            className="w-[100px] h-[100px] rounded-full object-cover mb-[16px]"
          />
          <div className="flex flex-col pl-[20px]">
            <h2 className="text-[18px] font-medium text-[#4D4D4D] leading-[16px]">
              {employeeName}
            </h2>
            <p className="text-[14px] text-[#909090] font-regular leading-[24px] pt-[15px]">
              {employeeRole}
            </p>
            <p className="text-[14px] text-[#909090] font-regular leading-[24px] pt-[15px]">
              Employee ID: {employeeId}
            </p>
          </div>
        </div>

        <div className="flex gap-[16px] pt-[30px]">
          <div className="w-[172px]">
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="flex-1 border text-[#4D4D4D] border-[#00A0E3] rounded-[6px] px-[12px] py-[10px] text-[14px] focus:outline-none"
            >
              <option value="">Select Status</option>
              <option value="terminated">Terminated</option>
              <option value="resigned">Resigned</option>
            </select>
          </div>
          <div className="w-[309px]">
            <input
              type="text"
              placeholder="Mini description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="flex-1 w-[309px] border border-[#00A0E3] rounded-[6px] px-[12px] py-[10px] text-[14px] focus:outline-none"
            />
          </div>
        </div>

        <p className="text-[14px] text-[#141414] font-regular pt-[48px] leading-[21px]">
          This employee will be transferred to the{" "}
          <span className="font-medium">Past Employees</span> panel.
        </p>

        <div className="flex pt-[70px]">
          <button
            onClick={onClose}
            className="py-[12px] w-[137px] h-[43px] rounded-[6px] border border-[#CFCFCF] text-[#4D4D4D] font-regular hover:bg-gray-50 transition"
          >
            Cancel
          </button>
          <div className="pl-[143px]">
            <button
              onClick={() => onConfirm(status, description)}
              className="py-[12px] w-[199px] h-[43px] rounded-[6px] bg-[#E53935] text-white font-medium hover:bg-[#D32F2F] transition"
            >
              Remove Employee
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RemoveModal;
