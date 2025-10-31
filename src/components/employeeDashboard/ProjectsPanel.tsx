import React, { useEffect, useState } from "react";
import { EllipsisVertical } from "lucide-react";
import Button from "../common/ui/Button";
import { useParams } from "react-router-dom";
import api from "../../Api/api";

interface Project {
  project_id: number;
  project_name: string;
  client: string;
  start_date: string;
  end_date: string;
  priority: string;
  project_value: string;
  total_working_hours: string;
  extra_time: string;
  status: string;
  description: string;
}

interface ApiResponse {
  status: string;
  id: number;
  employee_name: string;
  profile_pic_url: string;
  projects: Project[];
}

const ProjectsPanel: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 🔹 Fetch only once when id changes
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/api/employee-project-task-by-empid/${id}/`);

        if (response?.data?.projects) {
          setData(response.data);
        } else {
          throw new Error("Invalid API response");
        }
      } catch (err: any) {
        console.error("Error fetching Project details:", err);
        setError(err.message || "Failed to fetch Project Details");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProjects();
  }, [id]);

  // 🔹 Loading state
  if (loading)
    return (
      <div className="bg-white rounded-md shadow p-6 text-center text-gray-500">
        Loading project details...
      </div>
    );

  // 🔹 Error state
  if (error)
    return (
      <div className="bg-white rounded-md shadow p-6 text-center text-red-500">
        {error}
      </div>
    );

  // 🔹 Empty state
  if (!data || !data.projects || data.projects.length === 0)
    return (
         <div className="bg-[#FCFCFC] flex items-center justify-center text-center 
rounded-[10px] shadow-[0px_0px_2px_0px_#00000040] 
px-4 w-full max-w-[737px] 2xl:h-[300px] h-[200px]">
  No tasks assigned.
</div>
    );

  // ✅ Main UI
  return (
    <div className="bg-[#FCFCFC] rounded-[10px] shadow-[0px_0px_2px_0px_#00000040] px-4 py-5 w-full max-w-[737px]">
      {/* Header */}
      <div className="flex justify-between items-center mb-3 2xl:mb-7">
        <span className="text-[18px] 2xl:text-[24px] text-[#4D4D4D] font-medium md:ms-5">
          Projects
        </span>
        <Button variant="ongoingProjects" label="Ongoing Projects" />
      </div>

      {/* Project List */}
      <div className="flex flex-col gap-3 md:gap-5">
        {data.projects.map((p) => (
          <div
            key={p.project_id}
            className="border border-[#009fe3b0] rounded-[10px] px-4 2xl:px-8 py-3 2xl:py-6 flex flex-col gap-y-[14px]"
          >
            {/* Title Row */}
            <div className="flex justify-between">
              <span className="text-[16px] 2xl:text-[18px] font-medium text-[#4D4D4D]">
                {p.project_name}
              </span>
              <EllipsisVertical className="text-[#909090] w-6 h-6 2xl:w-8 2xl:h-8" />
            </div>

            {/* Project Info */}
            <div className="flex flex-col md:flex-row justify-between">
              <div>
                <p className="font-semibold text-[16px] 2xl:text-[18px] text-[#4D4D4D]">
                  Client: {p.client || "N/A"}
                </p>
                <p className="text-[15px] 2xl:text-[17px] font-normal text-[#909090]">
                  Priority: {p.priority || "N/A"}
                </p>
                <p className="text-[15px] 2xl:text-[17px] font-normal text-[#909090]">
                  Status: {p.status || "N/A"}
                </p>
              </div>

              <div className="text-[16px] 2xl:text-[18px] text-right">
                <p className="text-[#4D4D4D] font-medium">
                  Deadline: {p.end_date || "N/A"}
                </p>
                <p className="text-[#909090] font-normal">
                  Started: {p.start_date || "N/A"}
                </p>
              </div>
            </div>

            {/* Time & Value */}
            <div className="flex flex-col md:flex-row justify-between mt-2">
              <span className="text-[16px] text-[#4D4D4D] font-medium">
                Total Hours: {p.total_working_hours || "0"}h
              </span>
              <span className="text-[16px] text-[#4D4D4D] font-medium">
                Extra Time: {p.extra_time || "0"}h
              </span>
              <span className="text-[16px] text-[#4D4D4D] font-medium">
                Value: ₹{p.project_value || "0"}
              </span>
            </div>

            {/* Description */}
            {p.description && (
              <p className="text-[#6B6B6B] text-[15px] 2xl:text-[17px] italic mt-2">
                {p.description}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsPanel;
