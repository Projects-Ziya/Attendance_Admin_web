import React from "react";
import { motion } from "framer-motion";
import LeaveRequestTable from "../../components/LeaveRequest/LeaveRequestTable";
import ProjectApprovalTable from "../../components/LeaveRequest/ProjectApprovalTable";
import headimg from "../../assets/leaveRequestAssets/head.png";
import useRequestDashboardVM from "../../viewmodels/useRequestDashboardVM";
import useProjectApprovalVM from "../../viewmodels/UseProjectApprovalsVM";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

export default function RequestDashboard() {
  const { activeTab, setActiveTab, leaveRequests, loading: leaveLoading } =
    useRequestDashboardVM();
  const { approvals, loading: approvalsLoading } = useProjectApprovalVM();

  return (
    <motion.div
      className="px-4 sm:px-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Heading */}
      <motion.div className="mb-10 mt-6 ms-4" variants={itemVariants}>
        <h1 className="font-poppins flex items-center gap-2 text-smallGray text-[16px] font-[500] tracking-[1.28px]">
          <img src={headimg} alt="Section icon" className="w-10 h-10" />
          All Requests
        </h1>
      </motion.div>

      {/* Leave Requests Table */}
      {activeTab === "leave" && (
        <motion.div variants={itemVariants}>
          <LeaveRequestTable
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            loading={leaveLoading}
            requests={leaveRequests}
          />
        </motion.div>
      )}

      {/* Project Approvals Table */}
      {activeTab === "projects" && (
        <motion.div variants={itemVariants}>
          <ProjectApprovalTable
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            loading={approvalsLoading}
            approvals={approvals}
          />
        </motion.div>
      )}
    </motion.div>
  );
}
