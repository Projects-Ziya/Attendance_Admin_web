import React, { useEffect, useState } from "react";
import { MdOutlineWorkHistory } from "react-icons/md";
import api from "../../../Api/api";
import { useNavigate } from "react-router-dom";

const WorkHistoryIcon = MdOutlineWorkHistory as React.FC<{
  size?: number;
  className?: string;
}>;

export default function PendingLeaveRequests() {
  const [count, setCount] = useState<number>(0);
  const [pendingApprovals, setPendingApprovals] = useState<number>(0);
  const [leaveRequests, setLeaveRequests] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate(); // ✅ FIXED: moved here

  useEffect(() => {
    const fetchPendingData = async () => {
      try {
        setLoading(true);

        const res = await api.get("/api/pending-approval-count/");

        const data = res.data.data;
        setPendingApprovals(data.pending_projects);
        setLeaveRequests(data.pending_leaves);
        setCount(data.pending_projects + data.pending_leaves);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch pending leave requests");
      } finally {
        setLoading(false);
      }
    };

    fetchPendingData();
  }, []);

  return (
    <div
      className="rounded-md border border-blue-100 bg-white p-[30px]  
                  w-[44vw] max-w-[840px] 
                  flex flex-col justify-between h-[206px]"
    >
      <div className="flex flex-col items-start">
        <div className="flex items-center justify-center p-2 bg-blue-100 rounded-full mb-2">
          <WorkHistoryIcon size={26} className="text-blue-500" />
        </div>
        <div className="flex items-center">
          <h2 className="font-poppins text-[24px] font-medium text-gray-800">
            Pending Leave Requests
          </h2>
          <span
            className="font-poppins text-[24px] font-medium text-gray-800"
            style={{ paddingLeft: "30px" }}
          >
            {loading ? "..." : error ? "Err" : count}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <p
          className="font-poppins text-[16px] font-normal"
          style={{ color: "#e89f36" }}
        >
          You have{" "}
          {loading ? "..." : error ? "Err" : pendingApprovals} Pending Approvals &{" "}
          {loading ? "..." : error ? "Err" : leaveRequests} Leave Requests
        </p>

        <button
          className="font-poppins text-[18px] font-medium text-gray-500 hover:text-ziyablue"
          onClick={() => navigate("/allLeaveRequests")} // ✅ Works now
        >
          View All
        </button>
      </div>
    </div>
  );
}
