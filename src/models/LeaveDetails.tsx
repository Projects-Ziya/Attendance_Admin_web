import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../Api/api";

export type LeaveData = {
  name: string;
  value: number;
  color: string;
};

const LeaveDetails = () => {
  const { id } = useParams<{ id: string }>();

  const [data, setData] = useState<LeaveData[]>([]);
  const [employeeName, setEmployeeName] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch API data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/api/leave-details-diagram/${id}/`);
        const apiData = response.data?.data;

        if (!apiData) throw new Error("Invalid API response");

        // Transform API response to chart data
        const formattedData: LeaveData[] = [
          { name: "Absent", value: apiData.absent_count, color: "#E53935" },
          { name: "Sick Leave", value: apiData.sick_leave_count, color: "#FFA500" },
          { name: "Work From Home", value: apiData.wfh_count, color: "#4DB6AC" },
          { name: "On Time", value: apiData.on_time_count, color: "#28A745" },
          { name: "Late", value: apiData.late_count, color: "#607D8B" },
        ];

        setData(formattedData);
        setEmployeeName(response.data.employee_name || "");
      } catch (err: any) {
        console.error("Error fetching leave details:", err);
        setError(err.message || "Failed to load leave data");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchData();
  }, [id]);

  const inner = 58;
  const outer = 86;
  const thickness = outer - inner;

  // Custom arrow style for tooltip
  const getArrowStyle = (color: string) => ({
    top: "-8px",
    left: "10px",
    borderLeft: "8px solid transparent",
    borderRight: "8px solid transparent",
    borderBottom: `8px solid rgba(0,0,0,0.7)`,
  });

  // Custom Tooltip component
  const CustomTooltip = ({
    active,
    payload,
  }: {
    active?: boolean;
    payload?: Array<{ payload: { name: string; value: number; color: string } }>;
  }) => {
    const [pos, setPos] = useState({ x: 0, y: 0 });

    useEffect(() => {
      const handleMove = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
      window.addEventListener("mousemove", handleMove);
      return () => window.removeEventListener("mousemove", handleMove);
    }, []);

    if (active && payload && payload.length) {
      const { name, value, color } = payload[0].payload;
      return (
        <div
          className="absolute pointer-events-none shadow-md px-3 py-3"
          style={{
            position: "fixed",
            top: pos.y + 15,
            left: pos.x + 5,
            backgroundColor: "rgba(0,0,0,0.7)",
            border: `1px solid ${color}`,
            width: "180px",
            zIndex: 9999,
            transition: "top 0.05s ease, left 0.05s ease",
          }}
        >
          <span className="absolute w-0 h-0" style={getArrowStyle(color)} />
          <p className="font-bold text-white/50">Leave Applied</p>
          <div
            style={{
              height: "1px",
              backgroundColor: "lightgray",
              margin: "8px 0",
            }}
          />
          <div className="flex items-center justify-between">
            <span className="font-semibold text-white/50">
              {value} {name}
            </span>
            <span className="inline-block w-4 h-4" style={{ backgroundColor: color }} />
          </div>
        </div>
      );
    }
    return null;
  };

  // Loading & error states
  if (loading) return <div className="text-center p-4">Loading leave details...</div>;
  if (error) return <div className="text-center text-red-500 p-4">{error}</div>;

  // Main component render
  return (
    <div className="p-4 bg-white rounded-2xl shadow-md" style={{ width: "727px", height: "510px" }}>
      {/* Header */}
      <div className="relative font-[Poppins] mb-2" style={{ height: "52px" }}>
        <div className="flex justify-between items-center" style={{ gap: "17px" }}>
          <h2 className="text-lg font-semibold text-gray-700 ml-4">
            Leave Details {employeeName && `— ${employeeName}`}
          </h2>
        </div>
        <div
          className="absolute left-0 top-10 right-0"
          style={{ height: "1px", backgroundColor: "#43C8FF" }}
        />
      </div>

      {/* Content */}
      <div
        className="flex items-center ml-10"
        style={{ marginTop: "80px", width: "568.42px", height: "254.42px" }}
      >
        {/* Legend */}
        <ul className="space-y-3 text-lg text-gray-700 w-1/2 pr-3">
          {data.length > 0 ? (
            data.map((item, idx) => (
              <li key={idx} className="flex items-center space-x-2">
                <span
                  className="inline-block w-5 h-5 rounded-sm"
                  style={{ backgroundColor: item.color }}
                />
                <span className="font-poppins font-semibold">
                  {item.value} {item.name}
                </span>
              </li>
            ))
          ) : (
            <li className="text-gray-400">No data available</li>
          )}
        </ul>

        {/* Pie Chart */}
        <div className="w-[300px] h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                innerRadius={75}
                outerRadius={125}
                paddingAngle={5}
                minAngle={28}
                cornerRadius={thickness / 2}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} cursor={false} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default LeaveDetails;
