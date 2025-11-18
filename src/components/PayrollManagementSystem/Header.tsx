import React from "react";
import { ArrowLeft } from "lucide-react";
import payroll from "../../assets/payroll.svg"

type HeaderProps = {
  onBack?: () => void;
};

const Header: React.FC<HeaderProps> = ({ onBack }) => {
  return (
    <div className=" flex items-center gap-3 pb-[50px]  pt-[46px] shadow-sm">
      {/* Back Button */}
      {/* <button
        onClick={onBack}
        className="flex w-[130px] h-10 items-center gap-2 text-gray-600 hover:text-gray-800 bg-white border border-gray-200 rounded-md px-3 py-1 transition"
      >
        <ArrowLeft size={18} className="w-[20px]" />
        <span className="text-[18px] font-medium">Back</span>
      </button> */}

      {/* Logo & Title */}
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 rounded-full bg-[#DAF1FB] flex items-center justify-center text-white text-xs font-bold">
          <img src={payroll} alt="" />
        </div>
        <span className="text-[#909090] text-[16px] font-medium leading-4 tracking-[0.08em]">
          Payroll Management System
        </span>
      </div>
    </div>
  );
};

export default Header;
