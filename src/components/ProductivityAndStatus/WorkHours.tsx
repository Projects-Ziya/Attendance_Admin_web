import React, { useEffect, useState } from "react";
import api from "../../Api/api";

type HoursData = {
  total_working_hours: number;
  productive_hours: number;
  break_hours: number;
  overtime_hours: number;
};

const WorkHours: React.FC = () => {
  const [data, setData] = useState<HoursData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ✅ api
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/api/monthly-productivity-count/");

        // Axios responses have data directly
        if (response.data.success && response.data.data) {
          setData(response.data.data);
        } else {
          throw new Error("Invalid response structure");
        }
      } catch (err: any) {
        console.error("Error fetching work hours:", err);
        setError(err.message || "Failed to fetch work hours");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading)
    return (
      <div className="bg-white rounded-[10px] shadow p-6 text-center text-gray-500">
        Loading work hours...
      </div>
    );

  if (error)
    return (
      <div className="bg-white rounded-[10px] shadow p-6 text-center text-red-500">
        {error}
      </div>
    );

  if (!data)
    return (
      <div className="bg-white rounded-[10px] shadow p-6 text-center text-gray-500">
        No data available
      </div>
    );

  // 🧮 Calculate total and percentages
  const { total_working_hours, productive_hours, break_hours, overtime_hours } = data;

  const total = total_working_hours || 1; // prevent division by zero
  const productivePct = (productive_hours / total) * 100;
  const breakPct = (break_hours / total) * 100;
  const overtimePct = (overtime_hours / total) * 100;

  const gradient = `linear-gradient(to right,
    #D9D9D9 0%,
    #03C95A ${productivePct}%,
    #FFC107 ${productivePct + breakPct}%,
    #1B84FF ${productivePct + breakPct + overtimePct}%,
    #D9D9D9 100%
  )`;

  const timeLabels = [
    "09:00", "10:00", "11:00", "12:00", "01:00",
    "02:00", "03:00", "04:00", "05:00",
    "06:00", "07:00", "08:00", "09:00"
  ];

  // ⏱️ Convert float hours → "xh ym"
  const formatHours = (h: number) => {
    const hrs = Math.floor(h);
    const mins = Math.round((h - hrs) * 60);
    return `${hrs}h ${mins}m`;
  };

  return (
    <div className="rounded-[10px] shadow-[0px_0px_2px_0px_#00000040] bg-white w-[1469px] h-[276px]">
      {/* Legend row */}
      <div className="flex items-start pt-[26px] pl-[23px]">
        <Legend color="bg-[#D9D9D9]" label="Total Working Hours" value={formatHours(total_working_hours)} />
        <Legend color="bg-[#02C95A]" label="Productive Hours" value={formatHours(productive_hours)} />
        <Legend color="bg-[#FFC107]" label="Break Hours" value={formatHours(break_hours)} />
        <Legend color="bg-[#2687F3]" label="Overtime Hours" value={formatHours(overtime_hours)} />
      </div>

      {/* Timeline bar */}
      <div className="pt-[77px] pl-[70px]">
        <div className="relative h-[50px] w-[1329px] rounded-md overflow-hidden">
          <div className="h-full w-full" style={{ background: gradient }} />
        </div>
      </div>

      {/* Time labels */}
      <div className="pl-[28px] pt-[20px]">
        <div className="flex leading-[16px] tracking-[0.08em] gap-[72px] text-[#4D4D4D] font-medium text-[14px]">
          {timeLabels.map((time, i) => (
            <span key={i}>{time}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

// ✅ Legend component
const Legend: React.FC<{ color: string; label: string; value: string }> = ({
  color,
  label,
  value,
}) => (
  <div className="flex flex-col pr-[58px]">
    <div className="flex items-center">
      <span className={`w-6 h-6 rounded-sm ${color}`} />
      <span className="text-[#4D4D4D] font-normal text-[18px] pl-2 leading-[16px] tracking-[0.08em]">
        {label}
      </span>
    </div>
    <span className="font-medium text-[24px] leading-[16px] tracking-[0.08em] pt-[21px] text-[#4D4D4D]">
      {value}
    </span>
  </div>
);

export default WorkHours;
