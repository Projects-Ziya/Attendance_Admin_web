import { useState, useEffect } from "react";
import type { Notice } from "../../models/anouncementnoticeboard/Notice";
import api from "../../Api/api";

export function useAnnouncementNoticeBoardViewModel() {
  const [pinnedNotices, setPinnedNotices] = useState<Notice[]>([]);
  const [recentNotices, setRecentNotices] = useState<Notice[]>([]);

  // --------------------------------------------------
  // ✅ FETCH NOTICES FROM BACKEND
  // --------------------------------------------------
  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await api.get("/api/create-view-notice/");
        const result = response.data;

        if (result.success && Array.isArray(result.data)) {
         const fetched = result.data.map((item: any) => ({
  id: item.id,   // <-- ADD THIS
  title: item.title,
  date: item.date?.split("T")[0],
  content: item.description,
  department: item.department,
  is_pinned: item.is_pinned,
}));


          // Separate pinned & non-pinned
          setPinnedNotices(fetched.filter((n) => n.is_pinned === true));
          setRecentNotices(fetched.filter((n) => n.is_pinned === false));
        }
      } catch (error) {
        console.error("Error fetching notices:", error);
      }
    };

    fetchNotices();
  }, []);

  // --------------------------------------------------
  // 🔵 Add new notice (local)
  // --------------------------------------------------
  const addNotice = (newNotice: Notice) => {
    setRecentNotices((prev) => [newNotice, ...prev]);
  };

  // --------------------------------------------------
  // 🔵 Delete notice (local)
  // --------------------------------------------------
  const deleteNotice = (title: string) => {
    setPinnedNotices((prev) => prev.filter((n) => n.title !== title));
    setRecentNotices((prev) => prev.filter((n) => n.title !== title));
  };


  const setNoticesFromApi = (notices: Notice[]) => {
  const pinned = notices.filter((n) => n.is_pinned);
  const recent = notices.filter((n) => !n.is_pinned);

  setPinnedNotices(pinned);
  setRecentNotices(recent);
};


  // --------------------------------------------------
  // 🔵 Toggle pin/unpin (local)
  // --------------------------------------------------
  const togglePin = (title: string) => {
    const notice = recentNotices.find((n) => n.title === title);
    if (notice) {
      setPinnedNotices((prev) => [...prev, notice]);
      setRecentNotices((prev) => prev.filter((n) => n.title !== title));
    } else {
      const pinned = pinnedNotices.find((n) => n.title === title);
      if (pinned) {
        setRecentNotices((prev) => [...prev, pinned]);
        setPinnedNotices((prev) => prev.filter((n) => n.title !== title));
      }
    }
  };

  return {
    pinnedNotices,
    recentNotices,
    addNotice,
    deleteNotice,
    togglePin,
    setNoticesFromApi
  };
}
