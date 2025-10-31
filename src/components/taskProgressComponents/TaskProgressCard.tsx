import React, { useEffect, useState } from "react";
import api from "../../Api/api";

interface TaskProgressCardProps {
  completed?: number;
  total?: number;
}

const TaskProgressCard: React.FC<TaskProgressCardProps> = () => {
  const [data, setData] = useState<{ hours_spent?: string }>({});
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchTaskHours = async () => {
      try {
        const response = await api.get("/api/taskhours/");
        if (response.data?.data?.length > 0) {
          setData(response.data.data[0]);
        }
      } catch (error) {
        console.error("Error fetching task hours:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTaskHours();
  }, []);

  return (
    <div className="flex flex-col justify-between items-center p-4 w-full max-w-[259px] aspect-[259/360] bg-blue-50 border border-blue-100 rounded-lg shadow-sm">
      {/* Main text */}
      <div className="text-center pt-11">
        {loading ? (
          <p className="text-[1.25vw] text-gray-400">Loading...</p>
        ) : (
          <>
            <p className="text-[1.25vw] text-gray-500">
              {data.hours_spent || "0 / 0 hrs"}
            </p>
            <p className="text-[1.16vm] text-gray-500 mt-1">
              Spent on Overall <br /> Tasks this Day
            </p>
          </>
        )}
      </div>

      {/* View all link */}
      <button className="text-[1.18vm] font-medium text-gray-500 hover:text-blue-600 !bg-transparent !border-none !p-0">
        View All
      </button>
    </div>
  );
};

export default TaskProgressCard;
