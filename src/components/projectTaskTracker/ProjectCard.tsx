import React from "react";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import StatusButton from "../buttons/StatusButtonOne";
import { Link } from "react-router-dom";

interface Project {
  id: number;
  project_name: string;
  start_date: string;
  end_date: string;
  status: string;
  coordinator: {
    id: number;
    user_id: number;
    name: string;
    designation: string;
    profile_pic?: string;
  };
  members: {
    team_leader_details?: {
      name: string;
      profile_pic?: string;
    };
    project_manager_details?: {
      name: string;
      profile_pic?: string;
    };
    tags_details?: {
      name: string;
      profile_pic?: string;
    };
  }[];
  tasks: {
    task_hours?: number | null;
  }[];
}

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  console.log(project);

  
  // ✅ Extract coordinator data
  const coordinator = project.coordinator;

  // ✅ Collect team avatars (limit to first 3)
  const teamAvatars =
    project.members
      ?.map(
        (m) =>
          m.tags_details?.profile_pic ||
          m.project_manager_details?.profile_pic ||
          m.team_leader_details?.profile_pic
      )
      .filter(Boolean) || [];

  // ✅ Get total hours (first task or 0)
  const hours = project.tasks?.[0]?.task_hours ?? 0;

  return (
    <div className="border-b border-gray-200 -mx-4">
      <div className="grid grid-cols-[165px_1.5fr_1.0fr_0.9fr_140px_160px_100px] items-center pl-11 py-4 px-7 text-sm">

        {/* ✅ Project Name + Start Date */}
        <Link to="/singleProjectTracker">
          <div>
            <p className="font-medium hover:text-blue-700 text-ziyablack">
              {project.project_name}
            </p>
            <span className="text-gray-500 text-xs">{project.start_date}</span>
          </div>
        </Link>

        {/* ✅ Coordinator Details */}
        <div className="flex items-center gap-3 min-w-0">
          {coordinator?.profile_pic ? (
            <img
              src={coordinator.profile_pic}
              alt={coordinator.name}
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-xs font-semibold">
              {coordinator?.name
                ?.split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase() || "?"}
            </div>
          )}

          <div className="min-w-0">
            <p className="font-semibold truncate">{coordinator?.name}</p>
            <p className="text-xs text-gray-500 truncate">
              {coordinator?.designation}
            </p>
            <span className="text-xs text-gray-500 uppercase">
              Coordinator
            </span>
          </div>
        </div>

        {/* ✅ Team Members (avatars + count) */}
        <div className="flex items-center">
          <div className="flex -space-x-4">
            {teamAvatars.slice(0, 3).map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`Member ${i + 1}`}
                className="w-8 h-8 rounded-full border-2 border-white object-cover"
              />
            ))}
            {project.members?.length > 3 && (
              <span className="text-xs font-medium text-ziyablue bg-[#E6F7FF] px-2 py-2 rounded-full">
                +{project.members.length - 3}
              </span>
            )}
          </div>
        </div>

        {/* ✅ Deadline (end_date) */}
        <p className="text-gray-800 text-sm">{project.end_date}</p>

        {/* ✅ Tasks / Hours */}
        <p className="text-gray-800 text-sm">
          {hours ? `${hours} hrs` : "—"}
        </p>

        {/* ✅ Status Button */}
        <StatusButton status={project.status} />

        {/* ✅ Edit/Delete Actions */}
        <div className="flex items-center gap-10 text-gray-600 font-semibold">
          <button className="hover:text-ziyablue cursor-pointer">
            <FaRegEdit size={16} />
          </button>
          <button className="hover:text-red-500 cursor-pointer">
            <RiDeleteBin6Line size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;