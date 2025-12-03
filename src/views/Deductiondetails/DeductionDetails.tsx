import React from "react";
import DeductionDetailsCards from "../../components/Deductiondetails/DeductionDetailsCards";
import ImportantNotes from "../../components/Deductiondetails/ImportantNotes";
import SalaryBreakdown from "../../components/Deductiondetails/SalaryBreakdown";
import { useDeductionDetailsVM } from "../../viewmodels/deductondetails/useDeductionDetailsVM";
import MainLayout from "../../components/layout/MainLayout";
import dollaricon from "../../assets/icons/dollaricon.svg";

const DeductionDetails: React.FC = () => {
  const { deductions, notes, salaryBreakdown } = useDeductionDetailsVM();

  return (
    <MainLayout>
    <div className="bg-[#F6F5FA]  w-[1469px]  sm:px-4  lg:px-6 ">
      {/* Page Header */}
 <div className="mb-6 sm:mb-8 lg:mb-10 mt-8 sm:mt-12 ">
          <h1 className=" flex items-center gap-2 text-midGray text-[16px]  leading-[16px] font-[500] ">
            <span className="bg-[#DAF1FB] rounded-full w-[40px] h-[40px] flex items-center justify-center">
              <img
                src={dollaricon}
                alt="Section icon"
                className="w-5.5 h-5.5 object-contain"
              />
            </span>
          Deduction Details
          </h1>
        </div>

      <div className="bg-[#FCFCFC]  shadow-[0px_0px_2px_0px_#00000040] rounded-[10px]  w-[1469px] pl-[40px] pt-[60px] pr-[45px]" >
        <h1 className="text-[28px] font-bold text-[#4D4D4D]">Deduction Details</h1>
        <p className="text-[16px] text-[#7D7D7D] mb-[29px]">
          Understanding salary deductions and contributions
        </p>
        <div className="w-full h-[108px] bg-[#DAF1FB] p-4 mb-[48px]">
          <h2 className="text-[#00A0E3] font-[500] text-[19px] tracking-[0.08em]">
            Salary Deductions Overview
          </h2>
          <p className="text-[#00A0E3] font-[500] text-[16px] tracking-[0.08em] pt-2">
            Salary deductions are statutory requirements as per Indian labour laws. These deductions
            provide social security benefits and tax compliance.
          </p>
        </div>
     

      {/* Deduction Cards */}
      <section className="mb-[20px]">
        <DeductionDetailsCards deductions={deductions} />
      </section>
       </div>

      {/* Important Notes */}
      <section className=" w-[1469px] mb-[30px]">
      <ImportantNotes notes={notes} />
      </section>

      {/* Salary Breakdown */}
      <section className=" w-[1469px] mb-[30px]">
     <SalaryBreakdown salaryBreakdown={salaryBreakdown} />
</section>
    </div>
    
    </MainLayout>
  );
};

export default DeductionDetails;
