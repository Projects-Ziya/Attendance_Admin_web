// src/viewmodels/useRequestDashboardVM.js
import { useEffect, useState } from "react";
import axios from "axios";

export default function useRequestDashboardVM() {
  const [activeTab, setActiveTab] = useState("leave");
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5000/leaveRequests")
      .then((res) => setLeaveRequests(res.data || []))
      .catch(() => setLeaveRequests([]))
      .finally(() => setLoading(false));
  }, []);

  return {
    activeTab,
    setActiveTab,
    leaveRequests,
    loading,
  };
}