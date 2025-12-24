import React, { useEffect, useState } from "react";
import api from "../../../Api/api"; // axios instance
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../../constants/urls";

// Custom icon
const CustomActivityIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-6 h-6 text-[#00AEEF]"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 12h3l2 3 4-8 3 6h4" />
    <circle cx="18" cy="5" r="1" />
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke="#00AEEF" fill="none" />
  </svg>
);

interface Activity {
  id: number;
  first_name: string;
  last_name: string;
  activity_type: string;
  activity_time: string;
  profile_pic?: string | null;
}

const DEFAULT_IMG = "https://cdn-icons-png.flaticon.com/512/3135/3135715.png";

const RecentActivities: React.FC = () => {
  const [grouped, setGrouped] = useState<Record<string, Activity[]>>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // 🔹 Helper to check date group
  const getGroupLabel = (activityDate: Date) => {
    const today = new Date();
    const activityDay = new Date(
      activityDate.getFullYear(),
      activityDate.getMonth(),
      activityDate.getDate()
    );
    const todayDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const diff = (todayDay.getTime() - activityDay.getTime()) / (1000 * 60 * 60 * 24);

    if (diff === 0) return "Today";
    if (diff === 1) return "Yesterday";
    return "Earlier";
  };

  const navigate = useNavigate()

  // 🔹 Format time nicely
  const formatTime = (timeStr: string) => {
    const [datePart, timePart] = timeStr.split(" ");
    const [hours, minutes] = timePart.split(":");
    return `${hours}:${minutes}`;
  };

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        setLoading(true);
        const res = await api.get("/api/employeesactivity/");
        const data = res.data.activities || [];

        // Grouping
        const groupedActivities: Record<string, Activity[]> = {};
        data.forEach((act: Activity) => {
          const date = new Date(act.activity_time);
          const label = getGroupLabel(date);
          if (!groupedActivities[label]) groupedActivities[label] = [];
          groupedActivities[label].push(act);
        });

        setGrouped(groupedActivities);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch activities");
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  return (
    
    <div className="  bg-white p-6 rounded-lg shadow-[0px_0px_2px_0px_#00000040] mt-[15px] w-[727px] h-[632px] border border-gray-100">
      {/* Header */}
      <div className="mb-5 border-b border-[#43C8FF] pb-4">
        <div className="bg-[#E6F7FF] p-2 rounded-full w-fit mb-2">
          <CustomActivityIcon />
        </div>
        <div className="flex items-center justify-between w-full">
          <h2 className="text-[24px] font-normal text-[#4D4D4D]">
            Recent Activities
          </h2>
          <button
            className="text-gray-500 font-medium hover:text-ziyablue"
            style={{ fontSize: "18px" }}
            onClick={()=> navigate("/recentactivitylist")}
          >
            View All
          </button>
        </div>
      </div>

      {/* Loading & Error */}
      {loading && <p className="text-gray-500 text-center">Loading...</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}

      {/* Grouped Activity List */}
      <div className="space-y-4 pb-[20px] overflow-y-auto max-h-[500px] pr-2 ">
        {Object.entries(grouped).map(([label, activities]) => (
          <div key={label}>
            <p className="text-[18px] font-medium text-gray-500 mb-2">{label}</p>
            {activities.map((activity) => (
              <div
                key={activity.id}
                className="flex justify-between items-start text-lg border p-2 rounded-md mb-2"
              >
                <div className="flex gap-3">
                  <img
                    src={activity.profile_pic || DEFAULT_IMG}
                    alt={activity.first_name}
                    className="w-[60px] h-[60px] rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium text-gray-800 text-[22px]">
                      {activity.first_name} {activity.last_name}
                    </p>
                    <p className="text-gray-500">{activity.activity_type}</p>
                  </div>
                </div>
                <span className="text-[18px] text-gray-500 whitespace-nowrap">
                  {formatTime(activity.activity_time)}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivities;