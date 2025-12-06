import React from "react";
import { motion } from "framer-motion";
import ProfileCard from "./DashComponents/ProfileCard";
import TotalEmployee from "./DashComponents/TotalEmployee";
import TotalActivies from "./DashComponents/TotalActivities";
import TotalAttendance from "./DashComponents/TotalAttendance";
import PendingLeaveRequests from "./DashComponents/PendingLeaveRequests";
import Totaltaskprogress from "./DashComponents/Totaltaskprogress";
import RecentActivities from "./DashComponents/RecentActivities";
import BirthdayCard from "./DashComponents/BirthdayCard";

interface DashboardComponentsProps {
  selectedSidebarItem: string;
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const DashboardComponents: React.FC<DashboardComponentsProps> = ({
  selectedSidebarItem,
}) => {
  return (
    <div className="flex-1 overflow-hidden mb-[47px] text-white pt-3">

      {/* ProfileCard */}
      <motion.div
        className="mb-4"
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        transition={{ duration: 0.4 }}
      >
        <ProfileCard />
      </motion.div>

      {/* Dashboard rows */}
      <div className="flex gap-4">

        {/* Left column */}
        <motion.div
          className="flex flex-col flex-shrink-0"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <TotalEmployee />
        </motion.div>

        {/* Right column */}
        <div className="flex flex-col gap-4 flex-1">
          <motion.div
            className="flex gap-4"
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ duration: 0.4, delay: 0.15 }}
          >
            <TotalActivies />
            <TotalAttendance />
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <PendingLeaveRequests />
          </motion.div>
        </div>
      </div>

      {/* Bottom section */}
      <motion.div
        className="mt-4"
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        transition={{ duration: 0.4, delay: 0.25 }}
      >
        <Totaltaskprogress />
      </motion.div>

      {/* Recent & Birthday */}
      <motion.div
        className="flex gap-4"
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        <RecentActivities />
        <BirthdayCard />
      </motion.div>
    </div>
  );
};

export default DashboardComponents;
