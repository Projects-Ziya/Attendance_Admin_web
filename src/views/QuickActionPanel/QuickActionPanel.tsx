import React from "react";
import { motion } from "framer-motion";
import headimg from "../../assets/head.svg";
import CreateCard from "../../components/quickActionPanel/CreateCard";
import AddBranch from "../../components/quickActionPanel/AddBranch";
import EmployeeList from "../../components/quickActionPanel/EmployeeList";
import List from "../../components/quickActionPanel//List";
import EmployeeManager from "../../components/quickActionPanel/EmloyeeManager";
import MainLayout from "../../components/layout/MainLayout";

// Animation variants
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number]
 } }
};

function QuickActionPanel() {
  return (
    <MainLayout>
      <motion.div
        className="bg-[#F6F5FA] min-h-screen w-[1469px]  sm:px-4 lg:px-6   pb-24"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.div className="mb-6 sm:mb-8 lg:mb-10 mt-8 sm:mt-12" variants={itemVariants}>
          <h1 className="flex items-center gap-2 text-midGray text-[16px] leading-[16px] font-[500]">
            <span className="bg-[#DAF1FB] rounded-full w-[40px] h-[40px] flex items-center justify-center">
              <img
                src={headimg}
                alt="Section icon"
                className="w-5.5 h-5.5 object-contain"
              />
            </span>
            Quick Action panel
          </h1>
        </motion.div>

        {/* Employee Manager */}
        <motion.section className="mt-[10px]" variants={itemVariants}>
          <EmployeeManager />
        </motion.section>

        {/* Employee List */}
        <motion.section className="mt-[10px]" variants={itemVariants}>
          <EmployeeList />
        </motion.section>

        {/* List Section */}
        <motion.section className="mt-[10px] mb-[60px]" variants={itemVariants}>
          <List searchTerm="" statusFilter="" />
        </motion.section>

        {/* Create Cards */}
        <motion.div className="flex gap-[15px] w-[1469px]" variants={containerVariants}>
          <motion.div variants={itemVariants}>
            <CreateCard
              title="Create Departments"
              description="Add new departments and keep your organisation structured."
              inputs={[
                { label: "Department Name", type: "text" },
                { label: "Department head", type: "select" },
              ]}
              buttonLabel="Create"
              enableSearch={true}
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <CreateCard
              title="Create Designation"
              description="Create designstion to structure your workforce."
              inputs={[
                { label: "Designation Name", type: "text" },
                { label: "Select Department", type: "select" },
              ]}
              buttonLabel="add Task"
            />
          </motion.div>
        </motion.div>

        {/* Add Branch Section */}
        <motion.section className="mt-[60px]  w-[1469px]" variants={itemVariants}>
          <AddBranch />
        </motion.section>
      </motion.div>
    </MainLayout>
  );
}

export default QuickActionPanel;
