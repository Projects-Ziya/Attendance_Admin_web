import React from "react";
import StatusButton from "../buttons/StatusButtonOne";
import type { Project } from "../../models/Project";
import { Link } from "react-router";

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  return (
    <div className="border-b border-gray-200 -mx-4">
      <Link to={`/singleProjectTracker/${project.id}`}>
        <div className="grid grid-cols-[170px_1.3fr_1.0fr_1.0fr_160px_120px] items-center pl-11 py-4 px-7 text-sm
                        cursor-pointer hover:bg-gray-50 active:bg-gray-100 transition-colors duration-150">

          {/* Project Name + Start Date */}
          <div>
            <p className="font-medium text-ziyablack">
              {project.project_name}
            </p>
            <span className="text-gray-500 text-xs">
              {project.start_date?.split(" ")[0]}
            </span>
          </div>

          {/* Owner (coordinator avatar + name + designation) */}
          <div className="flex items-center gap-3 min-w-0">
            {project.coordinator?.profile_pic && (
              <img
                src={project.coordinator.profile_pic}
                alt={project.coordinator.name}
                className="w-10 h-10 rounded-full"
              />
            )}
            <div className="min-w-0">
              <p className="font-semibold truncate">
                {project.coordinator?.name}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {project.coordinator?.designation}
              </p>
            </div>
          </div>

          {/* Team Avatars + count */}
          <div className="flex items-center">
            <div className="flex items-center gap-2">
              {project.assignee ? (
                <img
                  src={project.assignee}
                  alt={project.assignee_name || "Assignee"}
                  className="w-8 h-8 rounded-full border-2 border-white object-cover"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-xs font-semibold">
                  ?
                </div>
              )}
              <span className="text-gray-800 text-sm truncate">
                {project.assignee_name || "N/A"}
              </span>
            </div>
          </div>

          {/* Deadline */}
          <p className="text-gray-800 text-sm">
            {project.end_date || "N/A"}
          </p>

          {/* Hours / Tasks */}
          <p className="text-gray-800 text-sm">
            {project.hours_worked ?? 0}hrs
          </p>

          {/* Status Button */}
          <StatusButton status={project.status} />
        </div>
      </Link>
    </div>
  );
};

export default ProjectCard;
