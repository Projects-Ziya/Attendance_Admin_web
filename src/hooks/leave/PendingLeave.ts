import { useState, useEffect } from "react";
import axios from "axios";

interface PendingLeaveResponse {
  count: number;
  pendingApprovals: number;
  leaveRequests: number;
}

export function usePendingLeave(apiUrl: string) {
  const [count, setCount] = useState<number | null>(null);
  const [pendingApprovals, setPendingApprovals] = useState<number | null>(null);
  const [leaveRequests, setLeaveRequests] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axios.get<PendingLeaveResponse>(apiUrl);
        const data = res.data;
        setCount(data.count);
        setPendingApprovals(data.pendingApprovals);
        setLeaveRequests(data.leaveRequests);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [apiUrl]);

  return { count, pendingApprovals, leaveRequests, loading, error };
}
