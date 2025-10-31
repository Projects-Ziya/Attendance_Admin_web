import React from "react";
import { useTaskSummary } from "../hooks/useTaskSummary"; // using the TS hook

export default function TaskSummaryCard() {
  const { data, loading, error } = useTaskSummary();

  return (
    <div
      className="w-[259px] h-[360px] p-4 flex flex-col items-center"
      style={{ border: "1px solid #cfeffd" }}
    >
      <div className="flex flex-col items-center justify-center flex-1">
        {loading ? (
          <div className="text-gray-400 text-xs">Loading...</div>
        ) : error && data ? (
          // Shows mock data when backend fails
          <>
            <div className="text-xs md:text-[24px] text-gray-400">
              {data.spentHours}/{data.totalHours} hrs
            </div>
            <div className="text-[16px] text-gray-400 mt-2 text-center">
              Spent on Overall<br />Tasks this Day
            </div>
          </>
        ) : data ? (
          // Shows backend data when API works
          <>
            <div className="text-xs md:text-[24px] text-gray-400">
              {data.spentHours}/{data.totalHours} hrs
            </div>
            <div className="text-[16px] text-gray-400 mt-2 text-center">
              Spent on Overall<br />Tasks this Day
            </div>
          </>
        ) : (
          <div className="text-red-400 text-xs">No data available</div>
        )}
      </div>
      <button className="text-[18px] text-gray-400 hover:text-ziyablue">View All</button>
    </div>
  );
}
