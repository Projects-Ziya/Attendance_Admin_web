import React from 'react';
import { motion } from "framer-motion";
import MainLayout from "../../components/layout/MainLayout";
import Management from '../../components/PayrollManagementSystem/Management';
import payroll from "../../assets/payroll.svg";

// Animation variants
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const PayrollManagementSystem = () => {
  return (
    <MainLayout>
      <motion.div
        className="bg-[#F6F5FA] px-4 sm:px-6 lg:pl-[37px] pr-[37px]"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.div className="mb-6 sm:mb-8 lg:mb-10 mt-8 sm:mt-12" variants={itemVariants}>
          <h1 className="flex items-center gap-2 text-midGray text-[16px] leading-[16px] font-[500]">
            <span className="bg-[#DAF1FB] rounded-full w-[40px] h-[40px] flex items-center justify-center">
              <img
                src={payroll}
                alt="Section icon"
                className="w-5.5 h-5.5 object-contain"
              />
            </span>
            Payroll Management System
          </h1>
        </motion.div>

        {/* Management Component */}
        <motion.div variants={itemVariants}>
          <Management />
        </motion.div>
      </motion.div>
    </MainLayout>
  );
};

export default PayrollManagementSystem;
