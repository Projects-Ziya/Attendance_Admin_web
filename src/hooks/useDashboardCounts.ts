import { useEffect, useState } from "react";
import api from "../Api/api";

export default function useDashboardCounts() {
  const [pendingApprovals, setPendingApprovals] = useState(0);
  const [leaveRequests, setLeaveRequests] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCounts() {
      try {
        const { data } = await api.get("/api/pending-approval-count/");
        setPendingApprovals(data.data.pending_projects);
        setLeaveRequests(data.data.pending_leaves);
      } catch {
        setPendingApprovals(0);
        setLeaveRequests(0);
      } finally {
        setLoading(false);
      }
    }
    fetchCounts();
  }, []);

  return { pendingApprovals, leaveRequests, loading };
}
