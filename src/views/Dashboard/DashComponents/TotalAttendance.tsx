import React, { useEffect, useState } from "react";
import { CalendarDays } from "lucide-react";
import api from "../../../Api/api";
import { Link } from "react-router-dom";
interface AttendanceItem {
  label: "Present" | "Late" | "Leave";
  count: number;
  color: string;
}

const TodayAttendanceCard: React.FC = () => {
  const [attendanceData, setAttendanceData] = useState<AttendanceItem[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [Percentagetotal, setPTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        setLoading(true);
        const response = await api.get("/api/todays-attendance-count/"); // Replace with your endpoint
        const data = response.data;
        const formattedData: AttendanceItem[] = [
          { label: "Present", count: data.present_count, color: "bg-green-600" },
          { label: "Late", count: data.late_count, color: "bg-orange-400" },
          { label: "Leave", count: data.leave_count, color: "bg-red-500" },
        ];

        setAttendanceData(formattedData);
        setTotal(data.present_count + data.late_count );
        setPTotal(data.present_count + data.late_count + data.leave_count);
      } catch (err) {
        console.error(err);
        setError("Failed to load attendance data.");
      } finally {
        setLoading(false);
      }
    };

    fetchAttendance();
  }, []);

  return (
    <div className="w-[26vw] max-w-[501px] rounded-md border border-blue-100 bg-white p-5 flex flex-col justify-between">
      {/* Heading */}
      <div className="flex flex-col items-start gap-5 mb-4 border-b border-b-[#43C8FF] pb-4">
        <div className="bg-[#E6F7FF] p-2 rounded-full">
          <CalendarDays className="text-[#00AEEF] w-6 h-6" />
        </div>
        <div className="flex items-center gap-2">
          <h2 className="text-[#4D4D4D] text-[20px] font-semibold">
            Today’s Attendance
          </h2>
          {!loading && !error && (
            <span className="text-[#4D4D4D] text-[20px] font-semibold">
              {total}
            </span>
          )}
        </div>
      </div>

      {/* Attendance Data */}
      {loading ? (
        <p className="text-gray-400">Loading attendance data...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="space-y-3 mb-4 text-[18px]">
          {attendanceData.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex gap-2 w-1/2">
                <span className="text-gray-500 w-20">{item.label}</span>
                <span className="text-gray-500 w-20">{item.count}</span>
              </div>
              <div className="w-1/2 h-2 bg-purple-100 rounded-full overflow-hidden">
                <div
                  className={`${item.color} h-full`}
                  style={{ width: `${(item.count / Percentagetotal) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      <Link to="/Attendancesummary">
      <button className="text-[#909090] text-[18px] font-medium hover:text-ziyablue mt-4 self-start">
        View All
      </button>
      </Link>
    </div>
  );
};

export default TodayAttendanceCard;
