import React from "react";
import { motion } from "framer-motion";
import MainLayout from "../../components/layout/MainLayout";
import headimg from "../../assets/head.svg";
import MetricsCard from "../../components/ProductivityAndStatus/MetricsCard";
import ProjectTaskCard from "../../components/ProductivityAndStatus/ProjectTaskCards";
import WorkHours from "../../components/ProductivityAndStatus/WorkHours";
import AttendanceLeaveChart from "../../components/ProductivityAndStatus/AttendanceLeaveChart";

// Animation variants
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0, 0, 0.2, 1]
 } }
};

function ProductivityStats() {
  return (
    <MainLayout>
      <motion.div
        className="bg-[#F6F5FA] w-[1469px] sm:px-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Page Header */}
        <motion.div className="mb-6 sm:mb-8 lg:mb-10 mt-8" variants={itemVariants}>
          <h1 className="flex items-center gap-2 text-gray-600 text-[15px] sm:text-[16px] font-[500] leading-[1.3] tracking-[1.28px]">
            <span className="bg-[#DAF1FB] rounded-full w-[36px] h-[36px] sm:w-[40px] sm:h-[40px] flex items-center justify-center">
              <img
                src={headimg}
                alt="Section icon"
                className="w-[27px] h-[25px] sm:w-[27px] sm:h-[25.64px] object-contain"
              />
            </span>
            Productivity & Stats
          </h1>
        </motion.div>

        {/* Work Hours Section */}
        <motion.section className="mb-[15px]" variants={itemVariants}>
          <WorkHours />
        </motion.section>

        {/* Metrics Section */}
        <motion.section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[15px] w-[1469px]" variants={containerVariants}>
          <motion.div variants={itemVariants}><MetricsCard description="Total Hours Today" /></motion.div>
          <motion.div variants={itemVariants}><MetricsCard description="Total Hours This Week" /></motion.div>
          <motion.div variants={itemVariants}><MetricsCard description="Total Hours This Month" /></motion.div>
          <motion.div variants={itemVariants}><MetricsCard description="Overtime Hours" /></motion.div>
        </motion.section>

        {/* Project/Task Section */}
        <motion.section className="grid grid-cols-1 lg:grid-cols-2 gap-[15px] mt-[60px] w-[1469px]" variants={containerVariants}>
          <motion.div variants={itemVariants}><ProjectTaskCard type="projects" /></motion.div>
          <motion.div variants={itemVariants}><ProjectTaskCard type="tasks" /></motion.div>
        </motion.section>

        {/* Attendance & Leave Chart Section */}
        <motion.section className="gap-[15px] mt-[60px] mb-[95px] w-[1469px]" variants={itemVariants}>
          <AttendanceLeaveChart />
        </motion.section>
      </motion.div>
    </MainLayout>
  );
}

export default ProductivityStats;
