// pages/LeaveStatusPage.tsx
import React from "react";
import { useLeaveViewModel } from "../../viewmodels/EmployeeDashboard/useLeaveViewModel";
import { LeaveWorkflow } from "../../components/employeeDashboard/LeaveWorkFlow";
import { TeamMemberCard } from "../../components/employeeDashboard/TeamMemberCard";

export const LeaveStatusPage: React.FC = () => {
    const vm = useLeaveViewModel();

    const handleViewAll = () => {
        console.log("View All clicked");
    };

    return (
        <div className="w-full h-full">
            {/* Page Container */}
            <div className="flex flex-col lg:flex-row   w-full">
                {/* Left Section - Leave Workflow */}
                <div className=" mr-6 min-w-0">
                    <LeaveWorkflow
                        stages={vm.stages}
                        onApprove={vm.approveAt}
                        onReject={vm.rejectAt}
                    />
                </div>

                {/* Right Section - Team Members */}
                <aside className="w-full lg:w-[525px] bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4 sm:mb-6">
                        <h3 className="text-lg sm:text-xl font-semibold text-gray-700">
                            Team Members
                        </h3>
                        <button
                            onClick={handleViewAll}
                            className="text-sm text-gray-500 hover:text-[#43C8FF] transition-colors"
                        >
                            View All
                        </button>
                    </div>

                    <hr className="border-[#43C8FF] border-[1px] mb-4 sm:mb-6" />

                    {/* Members List */}
                    <div className="space-y-3 max-h-[75vh] overflow-y-auto pr-2">
                        {vm.team.map((member) => (
                            <TeamMemberCard key={member.id} member={member} />
                        ))}
                    </div>
                </aside>
            </div>
        </div>
    );
};
