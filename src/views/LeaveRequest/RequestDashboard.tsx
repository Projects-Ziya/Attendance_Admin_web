import React from "react";
import LeaveRequestTable from "../../components/LeaveRequest/LeaveRequestTable";
import ProjectApprovalTable from "../../components/LeaveRequest/ProjectApprovalTable";
import headimg from "../../assets/leaveRequestAssets/head.png";
import useRequestDashboardVM from "../../viewmodels/useRequestDashboardVM";
import useProjectApprovalVM from "../../viewmodels/UseProjectApprovalsVM";

export default function RequestDashboard() {
  const { activeTab, setActiveTab, leaveRequests, loading: leaveLoading } =
    useRequestDashboardVM();
  const { approvals, loading: approvalsLoading } = useProjectApprovalVM();

  return (
    <>
      <div className="mb-10 mt-6 ms-4">
        <h1 className="font-poppins flex items-center gap-2 text-smallGray text-[16px] font-[500] tracking-[1.28px]">
          <img src={headimg} alt="Section icon" className="w-10 h-10" />
          All Requests
        </h1>
      </div>

      {activeTab === "leave" && (
        <LeaveRequestTable
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        loading={leaveLoading}
        requests={leaveRequests}
        />
      )}

      {activeTab === "projects" && (
        <ProjectApprovalTable
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        loading={approvalsLoading}
        approvals={approvals}
        />
      )}
      </>
  );
}