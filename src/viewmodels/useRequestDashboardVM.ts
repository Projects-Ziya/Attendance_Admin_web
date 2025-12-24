// src/viewmodels/useRequestDashboardVM.js
import { useEffect, useState } from "react";
import api from "../Api/api";

export default function useRequestDashboardVM() {
  const [activeTab, setActiveTab] = useState("leave");
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [loading, setLoading] = useState(true);
const [isOpen, setIsOpen] = useState(false); // ✅ chatbot visibility


  const openChatbot = () => setIsOpen(true);
   const closeChatbot = () => setIsOpen(false);

  const fetchLeaveRequests = () => {
    setLoading(true);
    api
      .get("/api/list-all-leaves/")
      .then((res) => setLeaveRequests(res.data || []))
      .catch(() => setLeaveRequests([]))
      .finally(() => setLoading(false));
  };

  // ✅ Fetch on initial load
  useEffect(() => {
    fetchLeaveRequests();
  }, []);

  // ✅ Fetch again whenever user switches back to Leave tab
  useEffect(() => {
    if (activeTab === "leave") {
      fetchLeaveRequests();
    }
  }, [activeTab]);

  return {
    activeTab,
    setActiveTab,
    leaveRequests,
    loading,
    isOpen,
    openChatbot,
    closeChatbot,
  };
}
