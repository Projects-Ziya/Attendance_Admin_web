import React, { useEffect, useState } from "react";
// import type { DashStats } from "../../types/dashboard";
import { Clock } from "lucide-react";
import api from "../../Api/api";
import { useParams } from "react-router-dom";


const StatCard: React.FC<{ 
  value: number; 
  total: number; 
  label: string; 
  iconColor: string;
}> = ({ value, total, label, iconColor }) => (
  <div className="bg-white rounded-md shadow p-6 flex flex-col h-[150px] justify-center">
    <div className="flex justify-between items-center">
      <span className="text-xl font-semibold">
        <span className="text-[#00A0E3]">{value}/</span>
        <span className="text-gray-700">{total}hrs</span>
      </span>
      <Clock className={`w-6 h-6 ${iconColor}`} />
    </div>
    <span className="text-xs text-gray-500 mt-2 tracking-[0.18em]">{label}</span>
  </div>
);

const StatsCards: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    
  const [stats, setStats] = useState<{
    today: { value: number; total: number };
    week: { value: number; total: number };
    month: { value: number; total: number };
    overtime: { value: number; total: number };
  } | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get(`/api/employee-work-hour-summary/${id}/`);
        if (res.data && res.data.summary) {
          const summary = res.data.summary;

          const parseHours = (str: string, defaultTotal = 0) => {
            if (!str) return { value: 0, total: defaultTotal };
            const [val, total] = str.replace(" hrs", "").split("/");
            return {
              value: parseFloat(val) || 0,
              total: parseFloat(total) || defaultTotal,
            };
          };

          setStats({
            today: parseHours(summary.today, 8),
            week: parseHours(summary.week, 40),
            month: parseHours(summary.month, 88),
            overtime: { value: parseFloat(summary.overtime_month) || 0, total: 0 },
          });
        }
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchStats();
  }, []);

  if (!stats) return null;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      <StatCard value={stats.today.value} total={stats.today.total} label="Total Hours Today" iconColor="text-green-500" />
      <StatCard value={stats.week.value} total={stats.week.total} label="Total Hours Week" iconColor="text-red-800" />
      <StatCard value={stats.month.value} total={stats.month.total} label="Total Hours Month" iconColor="text-orange-500" />
      <StatCard value={stats.overtime.value} total={stats.overtime.total} label="Overtime Month" iconColor="text-red-500" />
    </div>
  );
};

export default StatsCards;
