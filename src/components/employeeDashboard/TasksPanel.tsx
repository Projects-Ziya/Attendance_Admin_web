import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TaskIcon from "../common/ui/TaskIcon";
import Button from "../common/ui/Button";
import api from "../../Api/api";

// Define Task type
interface Task {
  task_id: number;
  title: string;
  description: string;
  status: string;
  assigned_by: string;
  due_date: string;
  avatars?: string[]; // optional, if backend provides it
}

// Define Project structure inside the response
interface Project {
  project_id: number;
  project_name: string;
  tasks?: Task[];
}

// API response type
interface ApiResponse {
  status: string;
  id: number;
  employee_name: string;
  profile_pic_url: string;
  projects: Project[];
}

const statusClasses: Record<string, string> = {
  "On hold": "bg-[#FFE4E4] text-[#F11515]",
  InProgress: "bg-[#E0F6FF] text-[#43C8FF]",
  Completed: "bg-[#E0FFF1] text-[#03C96F]",
  Pending: "bg-[#FFF7E3] text-[#FFC107]",
};

const TasksPanel: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/api/employee-project-task-by-empid/${id}/`);
        const responseData = response?.data;

        if (responseData?.projects) {
          setData(responseData);

          // 🔹 Collect all tasks from all projects
          const allTasks: Task[] = responseData.projects.flatMap(
            (proj: Project) => proj.tasks || []
          );
          setTasks(allTasks);
        } else {
          throw new Error("Invalid API response");
        }
      } catch (err: any) {
        console.error("Error fetching tasks:", err);
        setError(err.message || "Failed to fetch task details");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchTasks();
  }, [id]);

  // 🔹 Loading state
  if (loading)
    return (
      <div className="bg-white rounded-md shadow p-6 text-center text-gray-500">
        Loading tasks...
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
  if (tasks.length === 0)
    return (
     <div className="bg-[#FCFCFC] flex items-center justify-center text-center 
rounded-[10px] shadow-[0px_0px_2px_0px_#00000040] 
px-4 w-full max-w-[737px] 2xl:h-[300px] h-[200px]">
  No tasks assigned.
</div>

    );

  // ✅ Render UI
  return (
    <div className="bg-[#FCFCFC] rounded-[10px] shadow-[0px_0px_2px_0px_#00000040] px-4 pt-5 pb-8 w-full max-w-[739px]">
      <div className="flex justify-between items-center mb-3 2xl:mb-[65px]">
        <span className="text-[18px] 2xl:text-[24px] font-medium text-[#4D4D4D] ms-5">
          Tasks
        </span>
        <Button
          variant="allTasks"
          label="All Tasks"
          icon={
            <svg
              className="w-4 2xl:w-6 h-4 2xl:h-6 text-[#4D4D4D]"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              viewBox="0 0 24 24"
            >
              <path d="M19 9l-7 7-7-7" />
            </svg>
          }
        />
      </div>

      <div className="flex flex-col gap-4 justify-stretch">
        {tasks.map((t) => (
          <div
            key={t.task_id}
            className="flex flex-col md:flex-row bg-[#FCFCFC] w-full 2xl:gap-[80px]
              shadow-[0px_0px_2px_0px_#00000040] rounded-[10px] py-2 2xl:py-[10px] 
              px-3 2xl:px-6 2xl:h-[100px]"
          >
            <div className="flex gap-5 w-full max-w-[430px]">
              <TaskIcon />
              <div className="flex-1">
                <div className="font-medium text-[16px] 2xl:text-[18px] text-[#4D4D4D] 2xl:pe-9 leading-[26px]">
                  {t.title}
                </div>
                <div className="text-[13px] 2xl:text-sm text-[#909090] font-normal leading-[20px] 2xl:leading-[26px]">
                  {t.description}
                </div>
              </div>
            </div>

            <div className="flex md:flex-col mt-1 md:mt-0">
              <span
                className={`px-[10px] 2xl:px-[17px] rounded-[4px] text-[11px] 2xl:text-sm 
                font-medium mb-2 flex justify-center items-center me-auto 
                ${statusClasses[t.status] || "bg-gray-100 text-gray-600"}`}
              >
                {t.status}
              </span>

              {/* Avatars (if provided) */}
              {t.avatars && t.avatars.length > 0 && (
                <div className="flex -space-x-4 mx-auto">
                  {t.avatars.map((a, idx) => (
                    <img
                      key={idx}
                      src={a}
                      alt=""
                      className="w-8 h-8 rounded-full border-2 border-[#FCFCFC]"
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TasksPanel;
