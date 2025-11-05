import React, { useEffect, useState } from "react";
import vector from "../../assets/Vector.svg";
import vectorr from "../../assets/vectorr.svg";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import api from "../../Api/api"; // ✅ using same instance as ProjectTaskCard

type ChartCardProps = {
  title: string;
  value: number;
  subtitle: string;
  color: string;
  gradientId: string;
  data: { name: string; value: number }[];
  legendLabel: string;
  icon: string;
};

const ChartCard: React.FC<ChartCardProps> = ({
  title,
  value,
  subtitle,
  color,
  gradientId,
  data,
  icon,
  legendLabel,
}) => {
  return (
    <div className="bg-[#FCFCFC] rounded-xl shadow-metrics w-[727px] h-[573px]">
      {/* Title */}
      <h2 className="font-semibold text-[22px] leading-[180%] tracking-[0.08em] text-[#4D4D4D] pl-10 pt-[45px]">
        {title}
      </h2>

      {/* Value + subtitle */}
      <p className="font-normal text-[32px] leading-[180%] tracking-[0.08em] text-[#4D4D4D] pl-10 pt-5">
        {value}
      </p>
      <p className="text-[14px] flex leading-[180%] tracking-[0.08em] text-[#4D4D4D] pl-10">
        {subtitle}
        <img src={icon} alt="" className="pl-[11px]" />
      </p>

      {/* Chart */}
      <div className="h-[350px] pl-10 pr-[100px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 20, right: 0, left: 20, bottom: 0 }}
          >
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.8} />
                <stop offset="95%" stopColor={color} stopOpacity={0} />
              </linearGradient>
            </defs>

            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              dx={22}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              domain={[0, "auto"]}
              allowDecimals={false}
              tickFormatter={(value) => value}
            />

            <Tooltip />

            {/* Custom Legend */}
            <Legend
              verticalAlign="top"
              align="right"
              wrapperStyle={{ top: -25 }}
              content={() => (
                <div className="flex items-center justify-end pr-6">
                  <span
                    className="w-[23px] h-3 rounded-sm"
                    style={{ backgroundColor: color }}
                  ></span>
                  <span className="text-[14px] pl-[11px] font-normal leading-[180%] tracking-[0.08em] text-[#4D4D4D]">
                    {legendLabel}
                  </span>
                </div>
              )}
            />

            <Area
              type="monotone"
              dataKey="value"
              stroke={color}
              strokeWidth={1}
              fill={`url(#${gradientId})`}
              name={legendLabel}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const AttendanceLeaveChart: React.FC = () => {
  const [attendanceData, setAttendanceData] = useState<
    { name: string; value: number }[]
  >([]);
  const [leaveData, setLeaveData] = useState<
    { name: string; value: number }[]
  >([]);
  const [attendanceTotal, setAttendanceTotal] = useState<number>(0);
  const [leaveTotal, setLeaveTotal] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // ✅ Fetch both endpoints simultaneously
        const [attendanceRes, leaveRes] = await Promise.all([
          api.get("/api/attendanceyearly/"),
          api.get("/api/leavesyearly/"),
        ]);

        

        const attendance = attendanceRes.data;
        const leave = leaveRes.data;

        // ✅ Attendance API mapping
        if (attendance.success) {
          setAttendanceTotal(attendance.overall_attendance || 0);
          setAttendanceData(
            attendance.monthly_attendance.map((m: any) => ({
              name: m.month,
              value: m.count,
            }))
          );
        }

        // ✅ Leave API mapping
        if (leave.success) {
          setLeaveTotal(leave.total_approved_leaves || 0);
          setLeaveData(
            leave.monthly_approved_leaves.map((m: any) => ({
              name: m.month,
              value: m.count,
            }))
          );
        }
      } catch (err: any) {
        console.error("Fetch error:", err?.response || err.message || err);
        setError("Failed to fetch attendance/leave data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center w-full h-[573px]">
        <p className="text-gray-500 text-lg">Loading charts...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center w-full h-[573px]">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  return (
    <div className="flex gap-[15px]">
      <ChartCard
        title="Attendance"
        value={attendanceTotal}
        subtitle="Overall Attendance"
        color="#00A0E3"
        gradientId="attendanceGradient"
        data={attendanceData}
        legendLabel="Attendance Rate"
        icon={vector}
      />

      <ChartCard
        title="Leave"
        value={leaveTotal}
        subtitle="Overall Leaves"
        color="#FD7F20"
        gradientId="leaveGradient"
        data={leaveData}
        legendLabel="Leave Rate"
        icon={vectorr}
      />
    </div>
  );
};

export default AttendanceLeaveChart;