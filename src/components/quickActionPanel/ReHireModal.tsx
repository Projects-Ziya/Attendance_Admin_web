import React from "react";

type RehireModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  employeeName: string;
  employeeRole: string;
  employeeId: string;
  employeeImage: string;
};

const RehireModal = ({
  isOpen,
  onClose,
  onConfirm,
  employeeName,
  employeeRole,
  employeeId,
  employeeImage,
}: RehireModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-[999]">
      <div className="bg-white border border-[#03C96F] pr-[85px] rounded-[10px] w-[667px] h-[594px] pl-[85px] shadow-metrics flex flex-col ">
        {/* Profile Section */}
        <div className="flex pt-[110px]">
          <img
            src={employeeImage}
            alt={employeeName}
            className="w-[100px] h-[100px] rounded-full object-cover"
          />
          <div className="flex flex-col pl-[20px]">
            <h2 className="text-[18px] leading-[16px] font-medium text-[#4D4D4D] ">
              {employeeName}
            </h2>
            <p className="text-[14px] text-[#909090] pt-[15px]">{employeeRole}</p>
            <p className="text-[14px] text-[#909090] pt-[15px]">{employeeId}</p>
          </div>
        </div>

        {/* Confirmation */}
        <p className="pt-[55px] text-[32px] text-[#03C96F] text-center leading-[48px] font-[400]">
          Are you sure you want to <span className="whitespace-nowrap">Rehire this employee?</span>
        </p>

        {/* Buttons */}
        <div className="flex pt-[100px]">
          <div>
            <button
              onClick={onClose}
              className="w-[137px] h-[43px] rounded-[6px] border border-gray-300 text-gray-600 font-[500] hover:bg-gray-100 transition"
            >
              Cancel
            </button>
          </div>
          <div className="pl-[118px]">
            <button
              onClick={() => {
                console.log("✅ Rehire button clicked inside modal");
                onConfirm();
              }}
              className="w-[242px] h-[43px] rounded-[6px] bg-[#03C96F] text-white font-[400] text-[18px] leading-[16px] hover:bg-green-700 transition"
            >
              Rehire Employee
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RehireModal;
