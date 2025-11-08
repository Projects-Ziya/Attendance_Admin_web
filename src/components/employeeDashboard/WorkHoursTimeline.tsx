import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../Api/api";


type WorkhoursData = {
  total_working_hours: number;
  break_hours: number;
  productive_hours: number;
  overtime_hours: number;
};

const formatDuration = (minutes: number) => {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h.toString().padStart(2, "0")}h ${m.toString().padStart(2, "0")}m`;
};

const WorkHoursTimeline: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const [data, setData] = useState<WorkhoursData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

 useEffect(() => {

  
  const fetchData = async () => {
    try {
      const response = await api.get(`/api/employee-todays-working-hour/${id}/`);
      if (response?.data?.data) {
        setData(response.data.data);
      } else {
        throw new Error("Invalid API response");
      }
    } catch (err: any) {
      console.error("Error fetching Work Hours:", err);
      setError(err.message || "Failed to fetch Work Hours");
    } finally {
      setLoading(false);
    }
  };

  if (id) fetchData();
}, [id]);

  if (loading)
    return <div className="bg-white rounded-md shadow p-6 text-center text-gray-500">Loading work hours...</div>;

  if (error)
    return <div className="bg-white rounded-md shadow p-6 text-center text-red-500">{error}</div>;

  if (!data)
    return <div className="bg-white rounded-md shadow p-6 text-center text-gray-500">No data available</div>;

  const total = data.total_working_hours || 1;
  const productive = data.productive_hours || 0;
  const breakTime = data.break_hours || 0;
  const overtime = data.overtime_hours || 0;

  const productivePct = (productive / total) * 100;
  const breakPct = (breakTime / total) * 100;
  const overtimePct = (overtime / total) * 100;
  const otherPct = Math.max(0, 100 - (productivePct + breakPct + overtimePct));

  const segments = [
    { label: "Productive Hours", color: "#22C55E", pct: productivePct, value: productive },
    { label: "Break Hours", color: "#FACC15", pct: breakPct, value: breakTime },
    { label: "Overtime Hours", color: "#3B82F6", pct: overtimePct, value: overtime },
    { label: "Other", color: "#D1D5DB", pct: otherPct, value: 0 },
  ];

  const fade = 2;
  let cursor = 0;
  const stops: string[] = [];

  segments.forEach((seg, idx) => {
    const start = cursor;
    const end = cursor + seg.pct;
    const halfFade = Math.min(fade / 2, seg.pct / 2);
    const leftPos = idx === 0 ? 0 : +(start + halfFade).toFixed(4);
    const rightPos = idx === segments.length - 1 ? 100 : +(end - halfFade).toFixed(4);
    stops.push(`${seg.color} ${leftPos}%`, `${seg.color} ${rightPos}%`);
    cursor = end;
  });

  const gradient = `linear-gradient(to right, ${stops.join(", ")})`;

  return (
    <div className="bg-white rounded-md shadow p-6">
      <div className="grid grid-cols-4 gap-4 text-center mb-6">
        {segments.map((seg, i) => (
          <div key={i} className="flex flex-col items-start">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 rounded" style={{ backgroundColor: seg.color }} />
              <p className="text-sm text-gray-500">{seg.label}</p>
            </div>
            <p className={`mt-1 font-semibold ${
              seg.label.includes("Productive")
                ? "text-green-600"
                : seg.label.includes("Break")
                ? "text-yellow-600"
                : seg.label.includes("Overtime")
                ? "text-blue-600"
                : "text-gray-900"
            }`}>
              {formatDuration(seg.value)}
            </p>
          </div>
        ))}
      </div>

      <div className="relative w-full h-12 rounded-md overflow-hidden shadow">
        <div className="w-full h-full" style={{ background: gradient }} />
      </div>

      <div className="flex justify-between mt-2 text-xs text-gray-500">
        <span>09:00</span><span>11:00</span><span>01:00</span>
        <span>03:00</span><span>05:00</span><span>07:00</span><span>09:00</span>
      </div>
    </div>
  );
};

export default WorkHoursTimeline;
