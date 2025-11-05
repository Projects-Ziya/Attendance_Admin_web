import { useEffect, useState } from "react";
import ProjectCardChart from "./ProjectCardChart";
import api from "../../Api/api";

type BreakdownItem = {
  name: string;
  value: number;
  color: string;
};

type ProjectTaskCardProps = {
  type: "projects" | "tasks";
};

const ProjectTaskCard = ({ type }: ProjectTaskCardProps) => {
  const [total, setTotal] = useState<number>(0);
  const [breakdown, setBreakdown] = useState<BreakdownItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const endpoint =
          type === "projects"
            ? "/api/projectscount/"
            : "/api/taskcount/";

        const res = await api.get(endpoint);
        const data = res.data;

      

        if (!data || data.success === false) {
          throw new Error("API returned error or invalid data");
        }

        if (type === "projects") {
          // ✅ Corrected keys based on your actual backend response
          setTotal(data.total_projects || 0);
          setBreakdown([
            { name: "Pending", value: data.pending_projects || 0, color: "#facc15" },
            { name: "Ongoing", value: data.on_going_projects || 0, color: "#3b82f6" },
            { name: "Completed", value: data.completed_projects || 0, color: "#22c55e" },
            { name: "On Hold", value: data.on_hold_projects || 0, color: "#6366f1" },
            { name: "Overdue", value: data.overdue_projects || 0, color: "#ef4444" },
          ]);
        } else {
          setTotal(data.total_tasks || 0);
          setBreakdown([
            { name: "Pending", value: data.pending_tasks || 0, color: "#facc15" },
            { name: "Ongoing", value: data.on_going_tasks || 0, color: "#3b82f6" },
            { name: "Completed", value: data.completed_tasks || 0, color: "#22c55e" },
            { name: "On Hold", value: data.on_hold_tasks || 0, color: "#6366f1" },
            { name: "Overdue", value: data.overdue_task_count || 0, color: "#ef4444" },
          ]);
        }
      } catch (err: any) {
        console.error(`[${type}] fetch error:`, err?.response || err.message || err);
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [type]);

  if (loading) {
    return (
      <div className="bg-white shadow rounded-[10px] w-[727px] h-[381px] flex items-center justify-center">
        <p className="text-gray-500">Loading {type}...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white shadow rounded-[10px] w-[727px] h-[381px] flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-[0px_0px_2px_0px_#00000040] rounded-[10px] w-[727px] h-[381px] pl-[40px] flex flex-col">
      <h1 className="tracking-[0.08em] text-midGray text-[22px] font-semibold leading-[16px] pt-[45px]">
        {type === "projects" ? "Projects" : "Tasks"}
      </h1>

      <div className="relative pl-[170px] pt-[40px]">
        <ProjectCardChart color="#22c55e" />
        <div className="absolute top-[90px] left-[260px] flex flex-col items-center">
          <span className="text-[42px] font-[500] text-midGray tracking-[0.08em] leading-[130%]">
            {total}
          </span>
          <span className="text-[14px] font-[400] text-midGray tracking-[0.08em]">
            {type === "projects" ? "Projects" : "Tasks"}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 h-[82px] w-[472px] text-[14px] text-smallGray font-[400] tracking-[1.28px] leading-[180%]">
        {breakdown.map((item, idx) => (
          <div key={idx} className="flex items-center gap-5">
            <span
              className="inline-block w-3 h-3 rounded-[10px]"
              style={{ backgroundColor: item.color }}
            ></span>
            <span className="text-gray-600">
              {item.value} {item.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectTaskCard;