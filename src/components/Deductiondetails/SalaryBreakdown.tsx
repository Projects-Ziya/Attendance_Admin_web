import React from "react";
import type { SalaryBreakdown as SalaryBreakdownType } from "../../models/deduction";

type Props = {
  salaryBreakdown: SalaryBreakdownType;
};

const SalaryBreakdown: React.FC<Props> = ({ salaryBreakdown }) => {
  return (
   <div
  className="rounded-[10px] shadow-[0px_0px_2px_0px_#00000040] flex flex-col 
             w-full mx-auto sm:max-w-full md:max-w-[90%] xl:max-w-[1469px] 
             bg-[#FFFFFF] px-6 md:px-[60px] py-[50px] h-auto"
>
  {/* Header */}
  <h2 className="font-semibold tracking-wide mb-[30px] text-[28px] text-[#4D4D4D]">
    Sample Monthly Salary Breakdown
  </h2>

  {/* Gross Salary */}
  <div
    className="flex items-center justify-between mb-[30px] 
               w-full md:max-w-[1383px] h-auto min-h-[133px] 
               bg-[#F9F9F9] rounded-[20px] px-7"
  >
    <h2 className="text-[30px] tracking-[0.08em] font-medium text-[#4D4D4D]">
      Gross Salary
    </h2>
    <p className="text-[#000000] text-[30px] tracking-[0.08em] font-medium">
      {salaryBreakdown.grossSalary}
    </p>
  </div>

  <hr className="border-b border-[#DBDBDB] w-full md:max-w-[1384px] mb-[20px]" />

  {/* Deductions */}
  <div className="flex flex-col gap-[20px] mb-[40px] w-full md:max-w-[1383px]">
    {salaryBreakdown.deductions.map((item, index) => (
      <div
        key={index}
        className="flex justify-between items-center pb-[10px]"
      >
        <p className="text-[25px] text-[#6E6565]">{item.label}</p>
        <p className="text-[24px] text-[#F22727]">- {item.amount}</p>
      </div>
    ))}
  </div>

  {/* Net Salary */}
  <div
    className="flex items-center justify-between mb-[30px] 
               w-full md:max-w-[1383px] h-auto min-h-[133px] 
               border border-[#03C96F] bg-[#DEFEEF] rounded-[20px] px-7"
  >
    <h1 className="text-[20px] font-semibold text-[#4D4D4D]">
      Net Salary (Take Home)
    </h1>
    <span className="text-[#1D741B] text-[25px]">
      {salaryBreakdown.netSalary}
    </span>
  </div>
</div>
  );
};

export default SalaryBreakdown;
