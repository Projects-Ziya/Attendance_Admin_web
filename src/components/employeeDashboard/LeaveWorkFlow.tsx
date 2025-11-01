import React from 'react';
import type { ApprovalStage } from '../../models/employeeDashboad/index';

type Props = {
  stages: ApprovalStage[];
  onApprove: (role: string) => void;
  onReject: (role: string) => void;
};

// Map each node to a grid cell
const gridPlacements = [
  { gridColumn: 1, gridRow: 4 }, // Employee
  { gridColumn: 4, gridRow: 7 }, // Team Lead
  { gridColumn: 7, gridRow: 2 }, // Project Lead
  { gridColumn: 10, gridRow: 8 }, // HR
  { gridColumn: 13, gridRow: 4 }  // CEO
];

// Separate component for Employee to Team Lead path
const EmployeeToTeamLeadPath: React.FC<{ isApproved: boolean }> = ({ isApproved }) => {
  const pathD = "M 40,135 Q 20,225 235,205";
  
  return (
    <path
      d={pathD}
      stroke={isApproved ? '#4CAF50' : '#D1D5DB'}
      strokeWidth="2"
      strokeDasharray="9,9"
      fill="none"
      strokeLinecap="round"
      className="transition-colors duration-300"
    />
  );
};

// Separate component for Team Lead to Project Lead path
const TeamLeadToProjectLeadPath: React.FC<{ isApproved: boolean }> = ({ isApproved }) => {
  const pathD = "M 245,205 Q 200,50 415,75";
  
  return (
    <path
      d={pathD}
      stroke={isApproved ? '#4CAF50' : '#D1D5DB'}
      strokeWidth="2"
      strokeDasharray="9,9"
      fill="none"
      strokeLinecap="round"
      className="transition-colors duration-300 "
    />
  );
};

// Separate component for Project Lead to HR path
const ProjectLeadToHRPath: React.FC<{ isApproved: boolean }> = ({ isApproved }) => {
  const pathD = "M 425,75 Q 400,300 610,250";
  
  return (
    <path
      d={pathD}
      stroke={isApproved ? '#4CAF50' : '#D1D5DB'}
      strokeWidth="2"
      strokeDasharray="9,9"
      fill="none"
      strokeLinecap="round"
      className="transition-colors duration-300"
    />
  );
};

// Separate component for HR to CEO path
const HRToCEOPath: React.FC<{ isApproved: boolean }> = ({ isApproved }) => {
  const pathD = "M 605,250 Q 610,100 780,110";
  
  return (
    <path
      d={pathD}
      stroke={isApproved ? '#4CAF50' : '#D1D5DB'}
      strokeWidth="2"
      strokeDasharray="9,9"
      fill="none"
      strokeLinecap="round"
      className="transition-colors duration-300"
    />
  );
};

export const LeaveWorkflow: React.FC<Props> = ({ stages, onApprove, onReject }) => {
  // Get approval status for each stage
  const employeeApproved = stages[0]?.status === 'approved';
  const teamLeadApproved = stages[1]?.status === 'approved';
  const projectLeadApproved = stages[2]?.status === 'approved';
  const hrApproved = stages[3]?.status === 'approved';

  return (
    <div className="bg-white shadow rounded-lg w-[943px] h-[650px]  pl-[40px] pt-[40px]">
      <h3 className="mb-[25px] text-[24px] font-[500] text-[#4D4D4D]">Leave Status</h3>
      <hr className="w-[863px] border border-[#43C8FF]" />

      <div className="pl-4 mt-[53px] w-[831px] h-[315px]">
        <div
          className="grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(13, 1fr)',
            gridTemplateRows: 'repeat(9, 35px)',
            width: '831px',
            height: '315px'
          }}
        >
          {/* SVG overlay with separate path components */}
          <svg
            className="pointer-events-none "
            style={{
              gridColumn: '1 / -1',
              gridRow: '1 / -1',
              width: '100%',
              height: '100%',
              zIndex: 1
              
            }}
          >
            {/* Path 1: Employee → Team Lead */}
            <EmployeeToTeamLeadPath isApproved={employeeApproved} />
            
            {/* Path 2: Team Lead → Project Lead */}
            <TeamLeadToProjectLeadPath isApproved={teamLeadApproved} />
            
            {/* Path 3: Project Lead → HR */}
            <ProjectLeadToHRPath isApproved={projectLeadApproved} />
            
            {/* Path 4: HR → CEO */}
            <HRToCEOPath isApproved={hrApproved} />
          </svg>

          {/* Nodes */}
          {stages.map((s, i) => {
            const { gridColumn, gridRow } = gridPlacements[i];
            const isCurrent = s.status === 'current';
            const isApproved = s.status === 'approved';
            const isRejected = s.status === 'rejected';
            const isPending = s.status === 'pending';
            const isProjectLead = s.role === 'Project Lead';
            const isEmployee = s.role === 'Employee';

            return (
              <div
                key={s.role}
                style={{
                  gridColumn,
                  gridRow,
                  justifySelf: 'center',
                  alignSelf: 'center',
                  zIndex: 2
                }}
                className="flex flex-col items-center"
              >
                {/* Label on top for Project Lead AND Employee */}
                {(isProjectLead || isEmployee) && (
                  <div className="mb-[19px] text-center  text-sm font-medium">{s.role}</div>
                )}
                
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full overflow-hidden border
                    ${isCurrent ? 'ring-4 ring-green-200' : ''}
                    ${isApproved ? 'bg-green-50 border-green-400' : ''}
                    ${isRejected ? 'bg-red-50 border-red-400' : ''}
                    ${isPending ? 'bg-white border-gray-200' : ''}`}
                  style={{
                    borderWidth: 2
                  }}
                >
                  <img
                    src={s.imageUrl || 'https://randomuser.me/api/portraits/lego/1.jpg'}
                    alt={s.role}
                    className="w-full h-full object-cover"
                    style={{
                      width: 40,
                      height: 40
                    }}
                  />
                </div>
                
                {/* Label below for all others (Team Lead, HR, CEO) */}
                {!isProjectLead && !isEmployee && (
                  <div className="mt-[19px] text-center text-sm font-[400]">{s.role}</div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Action buttons */}
      <div className="pt-[70px] pl-[510px]">
        <div className="text-sm text-gray-600 mb-3">
          Check Details, Then Approve or Reject
        </div>
        <div className="flex gap-[15px]">
          <button
            onClick={() => {
              const cur = stages.find(s => s.status === 'current');
              if (cur) onReject(cur.role);
            }}
            className="w-[173px] h-[43px] rounded-md bg-red-600 text-white hover:bg-red-700"
          >
            Reject Leave
          </button>
          <button
            onClick={() => {
              const cur = stages.find(s => s.status === 'current');
              if (cur) onApprove(cur.role);
            }}
            className="w-[173px] h-[43px] rounded-md bg-green-600 text-white hover:bg-green-700"
          >
            Approve Leave
          </button>
        </div>
      </div>
    </div>
  );
};
