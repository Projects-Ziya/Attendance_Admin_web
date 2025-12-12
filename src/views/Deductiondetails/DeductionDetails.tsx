import React, { useState } from "react";
import { motion } from "framer-motion";
import DeductionDetailsCards from "../../components/Deductiondetails/DeductionDetailsCards";
import ImportantNotes from "../../components/Deductiondetails/ImportantNotes";
import SalaryBreakdown from "../../components/Deductiondetails/SalaryBreakdown";
import { useDeductionDetailsVM } from "../../viewmodels/deductondetails/useDeductionDetailsVM";
import MainLayout from "../../components/layout/MainLayout";
import dollaricon from "../../assets/icons/dollaricon.svg";
import DeductionCreateModal from "../../components/Deductiondetails/DeductionCreateModal";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, duration: 0.5 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const DeductionDetails: React.FC = () => {
  const { deductions, notes, salaryBreakdown, fetchDeductions } =
    useDeductionDetailsVM();
  const [openCreateModal, setOpenCreateModal] = useState(false);

  return (
    <MainLayout>
      <div className="bg-[#F6F5FA] w-[1469px] sm:px-4 lg:px-6">
        <div className="mb-6 sm:mb-8 lg:mb-10 mt-8 sm:mt-12">
          <h1 className="flex items-center gap-2 text-midGray text-[16px] leading-[16px] font-[500]">
            <span className="bg-[#DAF1FB] rounded-full w-[40px] h-[40px] flex items-center justify-center">
              <img src={dollaricon} className="w-5.5 h-5.5 object-contain" />
            </span>
            Deduction Details
          </h1>
        </div>

        <div
          className="bg-[#FCFCFC] shadow-[0px_0px_2px_0px_#00000040] rounded-[10px] 
            w-[1469px] pl-[40px] pt-[60px] pr-[45px]"
        >
          <div className="flex items-center justify-between pr-[20px]">
            <div>
              <h1 className="text-[28px] font-bold text-[#4D4D4D]">
                Deduction Details
              </h1>
              <p className="text-[16px] text-[#7D7D7D] mb-[29px]">
                Understanding salary deductions and contributions
              </p>
            </div>

            <button
              onClick={() => setOpenCreateModal(true)}
              className="relative group flex items-center justify-center 
                w-[45px] h-[45px] bg-blue-600 text-white rounded-full 
                shadow-md overflow-hidden transition-all duration-300 
                hover:w-[140px]"
            >
              <span className="text-[28px] font-bold transition-all duration-300 group-hover:opacity-0">
                +
              </span>
              <span
                className="absolute opacity-0 group-hover:opacity-100 
                text-[16px] font-medium transition-all duration-300"
              >
                Add Card
              </span>
            </button>
          </div>

          <div className="w-full h-[108px] bg-[#DAF1FB] p-4 mb-[48px]">
            <h2 className="text-[#00A0E3] font-[500] text-[19px] tracking-[0.08em]">
              Salary Deductions Overview
            </h2>
            <p className="text-[#00A0E3] font-[500] text-[16px] tracking-[0.08em] pt-2">
              Salary deductions are statutory requirements as per Indian labour
              laws. These deductions provide social security benefits and tax
              compliance.
            </p>
          </div>

          {/* Animated Deduction Cards */}
          <motion.section
            className="mb-[20px]"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.div variants={cardVariants}>
              <DeductionDetailsCards deductions={deductions} />
            </motion.div>
          </motion.section>
        </div>

        <section className="w-[1469px] mb-[30px]">
          <ImportantNotes notes={notes} />
        </section>

        <section className="w-[1469px] mb-[30px]">
          <SalaryBreakdown salaryBreakdown={salaryBreakdown} />
        </section>
      </div>

      <DeductionCreateModal
        isOpen={openCreateModal}
        onClose={() => setOpenCreateModal(false)}
        onCreated={() => {
          fetchDeductions(); // refresh cards
        }}
      />
    </MainLayout>
  );
};

export default DeductionDetails;
