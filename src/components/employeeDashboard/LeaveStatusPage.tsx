// pages/LeaveStatusPage.tsx
import React, { useEffect, useState } from "react";
import api from "../../Api/api";
import { useLeaveViewModel } from "../../viewmodels/EmployeeDashboard/useLeaveViewModel";
import { LeaveWorkflow } from "../../components/employeeDashboard/LeaveWorkFlow";
import { TeamMemberCard } from "../../components/employeeDashboard/TeamMemberCard";
import type { TeamMember } from "../../models/employeeDashboad/index";
import { useParams } from "react-router-dom";

export const LeaveStatusPage: React.FC = () => {
  const vm = useLeaveViewModel();
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
const { id } = useParams<{ id: string }>();
  const projectId = id; // ✅ You can make this dynamic later if needed

  // ✅ Fetch members based on project ID
  const fetchMembers = async () => {
    try {
      const response = await api.get(`/api/projectmemberslist/${projectId}/`);

      const data = response.data?.data?.[0]?.members || [];

      // ✅ Format API response to match TeamMember type
      const formattedMembers: TeamMember[] = data.map((member: any) => ({
        id: member.id?.toString(),
        name: member.name,
        role: member.designation || "Team Member",
        avatarUrl: member.profile_pic || "",
        phone: member.phone_number || "",
        email: member.email || "",
      }));

      setTeamMembers(formattedMembers);
    } catch (error) {
      console.error("Error fetching team members:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, [projectId]);

  const handleViewAll = () => {
    console.log("View All clicked");
  };

  return (
    <div className="w-full h-full">
      {/* Page Container */}
      <div className="flex flex-col lg:flex-row w-full">
        {/* Left Section - Leave Workflow */}
        <div className="mr-6 min-w-0">
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
            {loading ? (
              <div className="text-gray-500 text-sm p-3">Loading team members...</div>
            ) : teamMembers.length === 0 ? (
              <div className="text-gray-500 text-sm p-3">No team members found.</div>
            ) : (
              teamMembers.map((member) => (
                <TeamMemberCard key={member.id} member={member} />
              ))
            )}
          </div>
        </aside>
      </div>
    </div>
  );
};
