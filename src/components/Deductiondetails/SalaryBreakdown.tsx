import React from "react";
import type { SalaryBreakdown as SalaryBreakdownType } from "../../models/deduction";

type Props = {
  salaryBreakdown: SalaryBreakdownType;
};

const SalaryBreakdown: React.FC<Props> = ({ salaryBreakdown }) => {
  return (
    <div
      className="rounded-[10px]  shadow-[0px_0px_2px_0px_#00000040] flex flex-col"
      style={{
        width: "1469px",
        height: "689px",
        background: "#FFFFFF",
        paddingLeft: "60px",
        paddingRight: "60px",
        paddingTop: "50px",
        paddingBottom: "50px",
       
      }}
    >
      {/* Header */}
      <h2
        className="font-semibold tracking-wide mb-[30px]"
        style={{ fontSize: "28px", color: "#4D4D4D" }}
      >
        Sample Monthly Salary Breakdown
      </h2>

      {/* Gross Salary */}
      <div className="flex items-center pl-7 pr-7 justify-between mb-[30px] w-[1383px] h-[133px] bg-[#F9F9F9] rounded-[20px]">
        <h2 className="text-[30px] tracking-[0.08em] font-medium text-[#4D4D4D]">
          Gross Salary
        </h2>
        <p className="text-[#000000] text-[30px] tracking-[0.08em] font-medium">
          {salaryBreakdown.grossSalary}
        </p>
      </div>

      <hr className="border-b border-[#DBDBDB] w-[1384px] mb-[20px]" />

      {/* Deductions */}
      <div className="flex flex-col gap-[20px] mb-[40px]">
        {salaryBreakdown.deductions.map((item, index) => (
          <div key={index} className="flex justify-between items-center pb-[10px]">
            <p className="text-[25px] text-[#6E6565]">{item.label}</p>
            <p className="text-[24px] text-[#F22727]">- {item.amount}</p>
          </div>
        ))}
      </div>

      {/* Net Salary */}
      <div className="flex items-center pl-7 pr-7 justify-between mb-[30px] w-[1383px] h-[133px] border border-[#03C96F] bg-[#DEFEEF] rounded-[20px]">
        <h1 className="text-[20px] font-semibold text-[#4D4D4D]">
          Net Salary (Take Home)
        </h1>
        <span className="text-[#1D741B] text-[25px]">{salaryBreakdown.netSalary}</span>
      </div>
    </div>
  );
};

export default SalaryBreakdown;
