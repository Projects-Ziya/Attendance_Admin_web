import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../Api/api";

// ✅ Reusable Stat box
const StatBox: React.FC<{ label: string; value: React.ReactNode }> = ({
  label,
  value,
}) => (
  <div className="flex flex-col items-left justify-center p-3 bg-white">
    <span className="text-xs text-gray-500">{label}</span>
    <span className="text-lg font-semibold text-[#00A0E3]">{value}</span>
  </div>
);

const LeavesDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ✅ Fetch employee details with leave info
  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const response = await api.get(`/api/employee-detail-with-leave/${id}/`);
        if (response?.data?.data) {
          setData(response.data.data);
        } else {
          throw new Error("Invalid API response");
        }
      } catch (err: any) {
        console.error("Error fetching leave details:", err);
        setError(err.message || "Failed to fetch leave details");
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchLeaves();
  }, [id]);

  // ✅ Loading & Error States
  if (loading)
    return (
      <div className="bg-white rounded-md shadow p-6 text-center text-gray-500">
        Loading leave details...
      </div>
    );

  if (error)
    return (
      <div className="bg-white rounded-md shadow p-6 text-center text-red-500">
        {error}
      </div>
    );

  if (!data)
    return (
      <div className="bg-white rounded-md shadow p-6 text-center text-gray-500">
        No data available
      </div>
    );

  // ✅ Data mapping based on API response
  const leaves = {
    totalAllowed: data.total_leaves,
    taken: data.taken,
    absentDays: data.absent,
    requests: data.request,
    workedDays: data.workeddays,
    lossOfPay: data.lossofpay,
  };

  return (
    <div className="bg-white rounded-md shadow p-6 h-full flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-base text-gray-700">Leaves Details</h3>
        <span className="px-2 py-0.5 border border-blue-200 rounded text-xs font-medium text-blue-400">
          2025
        </span>
      </div>
      <hr className="border-[#00A0E3]" />

      {/* Stats */}
      <div className="grid grid-cols-2 gap-1 mt-1 mb-4">
        <StatBox label="Total Leaves" value={leaves.totalAllowed ?? "—"} />
        <StatBox label="Taken" value={leaves.taken ?? "—"} />
        <StatBox label="Absent" value={leaves.absentDays ?? "—"} />
        <StatBox label="Request" value={leaves.requests ?? "—"} />
        <StatBox label="Worked Days" value={leaves.workedDays ?? "—"} />
        <StatBox label="Loss of Pay" value={leaves.lossOfPay ?? "—"} />
      </div>

      <button
        className="w-[140px] h-[30px] border m-auto border-[#00A0E3] rounded-[8px] 
             text-sm font-medium text-[#00A0E3] hover:border-[#00A0F3] transition"
      >
        Approve Leave
      </button>
    </div>
  );
};

export default LeavesDetails;
