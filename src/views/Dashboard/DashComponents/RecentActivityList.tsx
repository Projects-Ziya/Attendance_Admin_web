import React, { useState, useEffect } from "react";
import { useActivityViewModel } from "../../../viewmodels/useActivityViewModel";
import SearchBar from "../../../components/recentactivities/SearchBar";
import SortDropdown from "../../../components/recentactivities/SortDropdown";
import top from "../../../assets/topicon.svg";
import type { Activity } from "../../../models/recentactivity/Activity";
import MainLayout from "../../../components/layout/MainLayout";
import api from "../../../Api/api";

// 🔹 Status color mapping
const statusColors: Record<string, string> = {
  "Project Created": "text-[#4CAF50]",
  "New Task Assigned": "text-[#3F51B5]",
  "Leave Request Approved": "text-[#8BC34A]",
  "Project Updated": "text-[#FF9800]",
  "Document Uploaded": "text-[#00BCD4]",
  "Task Completed": "text-[#009688]",
  "Attendance Edited": "text-[#9C27B0]",
  "Employee Deleted": "text-[#F44336]",
  "Settings Modified": "text-[#607D8B]",
  "New Employee Added": "text-[#2196F3]",
};

// 🔹 Row Component
const ActivityRow: React.FC<{ activity: Activity }> = ({ activity }) => (
  <tr className=" border-b bg-[#FCFCFC] leading-[180%] tracking-[0.08em] h-[80px] font-poppins">
    <td className="px-6">
      <div className="flex items-center">
        <img
          src={
            activity.profileImage ||
            `https://i.pravatar.cc/150?u=${activity.personName}`
          }
          alt={`${activity.personName}'s profile`}
          className="w-11 h-11 rounded-full object-cover"
        />
        <div className="flex flex-col pl-6">
          <span className="font-semibold  pt-[23px] text-[18px] whitespace-nowrap text-[#4D4D4D]">
            {activity.personName}
          </span>
          <span className="text-[16px] text-[#4D4D4D] whitespace-nowrap">
            {activity.role}
          </span>
          <span className="text-[16px] text-[#4D4D4D]">{activity.team}</span>
        </div>
      </div>
    </td>

    <td className="px-6 py-3">
      <div className="flex flex-col">
        <span
          className={`font-semibold whitespace-nowrap ${
            statusColors[activity.status] || "text-gray-600"
          }`}
        >
          {activity.status}
        </span>
        <span className="text-[16px] leading-[130%] text-[#909090] whitespace-nowrap">
          {activity.description}
        </span>
      </div>
    </td>

    <td className="px-6 text-[#4D4D4D] text-[16px] font-medium">
      {activity.time}
    </td>
  </tr>
);

// 🔹 Main Component
const RecentActivityList: React.FC = () => {
  const { activities } = useActivityViewModel();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortKey, setSortKey] = useState("Time");


  // Api integration 
  const [data , setData] = useState<Activity[]>([]);
  const [loading , setloading] = useState(true);
  const [error, setError] = useState<string|null>(null);


  // ✅ pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };
  const handleSortChange = (key: string) => {
    setSortKey(key);
    setCurrentPage(1);
  };

  // 🔹 Filter + Sort
  const filteredActivities = activities
    .filter((a) => {
      const q = searchQuery.toLowerCase();
      return (
        a.personName.toLowerCase().includes(q) ||
        a.role.toLowerCase().includes(q) ||
        a.team.toLowerCase().includes(q) ||
        a.status.toLowerCase().includes(q) ||
        a.description.toLowerCase().includes(q)
      );
    })
    .sort((a, b) => {
      switch (sortKey) {
        case "Time":
          return new Date(b.time).getTime() - new Date(a.time).getTime();
        case "Activity Status":
          return (a.status || "").localeCompare(b.status || "");
        default:
          return 0;
      }
    });

  // ✅ Pagination calculations
  const totalPages = Math.max(1, Math.ceil(filteredActivities.length / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedActivities = filteredActivities.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // ✅ Keep currentPage in range if filtered size changes
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);

  // Debug (optional)
  // console.log({ len: filteredActivities.length, itemsPerPage, totalPages, currentPage });

 useEffect(() => {
  const fetchActivities = async () => {
    try {
      const res = await api.get("/api/employeesactivity/");
      // Map backend fields to Activity model
      const mapped = res.data.activities.map((a: any) => ({
        id: a.id,
        personName: `${a.first_name} ${a.last_name}`,
        role: a.employee_id,              // or map to actual role if available
        team: a.type,                     // using "type" as team for now
        status: a.activity_type,
        description: a.activity_type,     // backend has no description, reuse status
        time: a.activity_time,
        profileImage: null                // backend has no image, fallback handled in ActivityRow
      }));
      setData(mapped);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch Recent Activities list");
    } finally {
      setloading(false);
    }
  };

  fetchActivities();
}, []);


  if (loading) {
 return  (
 <div className="flex items-center justify-center w-full h-[573px]">

 
 <p>Loading Recent Activity list...</p>;
 </div>
 ) };


  if (error){
   return(
<div className="flex items-center justify-center w-full h-[573px]">
<p className="text-gray-500 text-lg">Failed to load Recent Activity list</p>  
</div>
  )} 


  return (
    <MainLayout>
      <div className="ms-[20px]">
        {/* heading */}
        <div className="mb-6 sm:mb-8 lg:mb-10 mt-8">
          <h1 className="flex items-center gap-2 text-gray-600 text-[15px] sm:text-[16px] font-[500] leading-[1.3] tracking-[1.28px]">
            <span className="bg-[#DAF1FB] rounded-full w-[36px] h-[36px] sm:w-[40px] sm:h-[40px] flex items-center justify-center">
              <img
                src={top}
                alt="Section icon"
                className="w-[27px] h-[25px] sm:w-[27px] sm:h-[25.64px] object-contain"
              />
            </span>
            Recent Activities
          </h1>
        </div>

        <div className="max-w-[1469px] bg-white rounded-lg shadow overflow-x-auto">
          <div>
            <p className="font-poppins font-semibold text-[22px] leading-[180%] tracking-[0.08em] pl-10 pt-10 text-[#4D4D4D]">
              Activities
            </p>
          </div>

          {/* Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-4 px-6">
            <SearchBar onSearch={handleSearch} />
            <SortDropdown
              options={["Last 7 Days", "Created Person", "Activity Status"]}
              onChange={handleSortChange}
            />
          </div>

          {/* Table */}
          <table className="w-full font-poppins text-left border-collapse">
            <thead>
              <tr className="text-[#4D4D4D] bg-[#F4F4F4] leading-[180%] tracking-[0.08em]">
                <th className="px-6 py-6 whitespace-nowrap">Created Person</th>
                <th className="px-6 py-6 whitespace-nowrap">Activity Status</th>
                <th className="px-6 py-6">Time</th>
              </tr>
            </thead>
            <tbody>
              {paginatedActivities.length > 0 ? (
                paginatedActivities.map((activity) => (
                  <ActivityRow key={activity.id} activity={activity} />
                ))
              ) : (
                <tr>
                  <td
                    colSpan={3}
                    className="text-center py-10 text-[#4D4D4D] font-poppins"
                  >
                    No results found
                  </td>
                </tr>
              )}

              {/* Pagination */}
              <tr className="border-t">
                <td colSpan={3} className="pt-[44px] pb-[33px]">
                  <div className="flex justify-end">
                    {/* Page 1 */}
                    <button
                      onClick={() => setCurrentPage(1)}
                      className={`px-4 text-[18px] font-semibold ${
                        currentPage === 1 ? "text-[#00A0E3]" : "text-[#909090]"
                      }`}
                    >
                      1
                    </button>
                    {/* Page 2 (shown only if totalPages >= 2) */}
                    {totalPages >= 2 && (
                      <button
                        onClick={() => setCurrentPage(2)}
                        className={`px-4 text-[18px] ${
                          currentPage === 2 ? "text-[#00A0E3] font-semibold" : "text-[#909090]"
                        }`}
                      >
                        2
                      </button>
                    )}
                    {/* Next */}
                    <button
                      onClick={() =>
                        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                      }
                      className="px-4 text-[#00A0E3]"
                    >
                      ▶
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </MainLayout>
  );
};

export default RecentActivityList;
