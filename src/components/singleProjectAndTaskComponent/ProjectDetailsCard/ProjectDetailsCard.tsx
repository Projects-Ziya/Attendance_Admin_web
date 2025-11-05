import React, { useEffect, useState } from "react";
import type { ProjectDetails } from "../../../models/ProjectModel";
import { ProjectViewModel } from "../../../viewmodels/ProjectViewModel";
import CircleImage from "../CircleImage";
import DetailRow from "./DetailRow";
import BadgeWithAvatar from "./BadgeWithAvatar";
import MemberSection from "./MemberSection";
import AddNewButton from "./AddNewButton";
import UserBadge from "../UserBadge"
import { BASE_URL } from "../../../constants/urls";

interface ProjectDetailsCardProps {
  projectDetails: ProjectDetails;
}

const ProjectDetailsCard: React.FC<ProjectDetailsCardProps> = ({ projectDetails,ApiProject }) => {
  const viewModel = new ProjectViewModel(projectDetails);
  
  
 const [data, setData] = useState(ApiProject);

useEffect(() => {
  setData(ApiProject);
}, [ApiProject]);

  return (
    <div className="w-auto h-auto bg-white pr-[39px]">
      {/* Header */}
      
      <h2 className=" text-2xl font-poppins font-semibold leading-[16px] 
             tracking-[1.92px] text-[#4D4D4D] pt-[52px]">{data?.data.project_name}</h2>

        
        {/* Row for Project ID */}
        <div className="grid grid-cols-[auto_43px_auto_15px_1fr] pt-[22px] items-center">
            {/* Label */}
            <span className="h-[27px] text-[#4D4D4D] text-[18px] leading-[27px] 
              tracking-[0.08em] font-poppins font-medium">
              Project ID</span>
           {/* Spacer (43px) */}
            <div></div>
            {/* Colon */}
            <span className="text-[#4D4D4D] text-[18px] leading-[27px] font-poppins font-medium">
              :</span>
            {/* Spacer (15px) */}
            <div></div>
          {/* Project ID Value */}
            <span className="h-[27px] text-[#4D4D4D] text-[18px] leading-[27px] 
              tracking-[0.08em] font-poppins font-medium whitespace-nowrap">
              {data?.data.id}</span>
          </div>


        <div
          className="w-[1140px] border border-[#43C8FF] mt-[25px]"
        ></div>





{/* Main Grid */}
      
<div className="grid w-auto h-fit md:grid-cols-[auto_auto] gap-8 mt-[40px] bg-white">

{/* Left Side */}
<div className="w-fit h-fit flex flex-col gap-[25px] bg-white">
  <DetailRow className="grid-cols-[128px_29px_auto]" label="Client" value={data?.data.client} />
  <DetailRow className="grid-cols-[128px_29px_auto]" label="Pro.Value" value={`₹${data?.data.project_value}`} />
  <DetailRow className="grid-cols-[128px_29px_auto]" label="Wrk Hrs" value={data?.data.total_working_hours} />
  <DetailRow className="grid-cols-[128px_29px_auto]" label="Created on" value={data?.data.created_at} />
  <DetailRow className="grid-cols-[128px_29px_auto]"
    label="Created by"
    value={<UserBadge avatar={`${BASE_URL}${data?.data.assigned_by_pic}`} name={data?.data.assigned_by} />}
  />

  {/* Tags */}
  <DetailRow className="grid-cols-[128px_29px_auto]"
    label="Tags"
    value={
      <div className="grid grid-cols-2 gap-1 items-center w-fit">
       {data?.data.members?.flatMap((member) =>
  member.tags?.map((tag, index) => (
    <BadgeWithAvatar
      key={`${member.id}-${index}`}
      member={{ name: tag }}
      avatarSize={20}
      textClassName="text-xs text-gray-800"
      className="w-fit py-[8px] px-[12px]"
    />
  ))
)}

        <AddNewButton />
      </div>
    }
  />

  <DetailRow className="grid-cols-[128px_29px_auto]" label="Start on" value={data?.data.start_date} />
  <DetailRow className="grid-cols-[128px_29px_auto]" label="Due Date" value={data?.data.end_date} />

  <DetailRow className="grid-cols-[128px_29px_auto]"
    label="Priority"
    value={
      <span className={`w-fit px-4 py-1 rounded-md text-sm flex items-center gap-2 ${viewModel.getPriorityClass()}`}>
        <span className={`w-2 h-2 rounded-full ${data?.data.priority}`}></span>
        {data?.data.priority}
      </span>
    }
  />
</div>

{/* Right Side */}
<div className="w-full h-fit flex flex-col gap-[25px] bg-white">
  <DetailRow className="grid-cols-[166px_25px_auto]"
    label="Status"
    value={
      <span className={`flex items-center gap-1 ${viewModel.getStatusClass()} w-fit py-2 px-3 rounded-md text-xs`}>
        <span className={`w-2 h-2 rounded-full ${viewModel.getStatusDotClass()}`}></span>
        {data?.data.status}
      </span>
    }
  />

  {/* Members and Leads */}
  <MemberSection className="grid-cols-[166px_25px_auto]"
    title="Team Members"
    members={viewModel.getTeamMembers()}
    gridCols={3}
  />
  <MemberSection className="grid-cols-[166px_25px_auto]"
    title="Team Lead"
    members={viewModel.getTeamLeads()}
    gridCols={3}
  />

  {/* Project Manager */}
  <DetailRow className="grid-cols-[166px_25px_auto] "
    label="Project Manager"
    value={
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        <BadgeWithAvatar
          member={viewModel.getProjectManager()}
          avatarSize={20}
          textClassName="text-xs text-gray-800 "
          className="w-full py-[8px] px-[12px]"
        />
        <AddNewButton />
      </div>
    }
  />
</div>
</div>


      {/* Description */}
      <div className="mt-[43px] w-[1140px]">
         <h3 className="text-gray-800 mb-2 text-[18px] leading-[27px] tracking-[0.08em] font-medium font-poppins">
        Description
      </h3>

        <p className="font-poppins font-normal text-[16px] leading-[130%] tracking-[0.08em] text-[#4D4D4D]">
          {data?.data.description}
        </p>

      </div>
    </div>
  );
};

export default ProjectDetailsCard;
