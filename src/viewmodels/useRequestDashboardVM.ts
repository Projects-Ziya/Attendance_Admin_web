// src/viewmodels/useRequestDashboardVM.js
import { useEffect, useState } from "react";
import api from "../Api/api";

export default function useRequestDashboardVM() {
  const [activeTab, setActiveTab] = useState("leave");
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api
      .get("/api/list-all-leaves/")
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