import React from "react";
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

const DashboardComponents: React.FC<DashboardComponentsProps> = ({
  selectedSidebarItem,
}) => {
  return (
    <div className="flex-1 overflow-hidden text-white pt-3">
      {/* ProfileCard */}
      <div className="mb-4">
        <ProfileCard />
      </div>

      {/* Dashboard layout */}
      <div className="flex gap-4">
        {/* Left column */}
        <div className="flex flex-col flex-shrink-0">
          <TotalEmployee />
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-4 flex-1">
          <div className="flex gap-4">
            <TotalActivies />
            <TotalAttendance />
          </div>
          <div>
            <PendingLeaveRequests />
          </div>
        </div>
      </div>

      {/* Bottom section */}
      <div className="mt-4">
        <Totaltaskprogress />
      </div>

      <div className="flex gap-4">
        <RecentActivities />
        <BirthdayCard />
      </div>
    </div>
  );
};

export default DashboardComponents;
