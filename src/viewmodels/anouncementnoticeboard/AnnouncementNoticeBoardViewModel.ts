import { useState } from "react";
import type { Notice } from "../../models/anouncementnoticeboard/Notice";

export const useAnnouncementNoticeBoardViewModel = () => {
  const [notices, setNotices] = useState<Notice[]>([
    {
      title: "Holiday Notice - Christmas",
      date: "21-12-2023",
      content: "Office will be closed from Dec 24-26. Happy Holidays!",
      isPinned: true,
    },
    {
      title: "New Parking Policy",
      date: "19-12-2023",
      content:
        "Please note the new parking arrangements effective from Dec 1st. Refer to the attached document for details.",
      isPinned: false,
    },
    {
      title: "Team Building Event",
      date: "18-12-2023",
      content:
        "Join us for our annual team building event on Dec 15th at City Convention Center.",
      isPinned: false,
    },
  ]);

  const pinnedNotices = notices.filter((n) => n.isPinned);
  const recentNotices = notices.filter((n) => !n.isPinned);

  // Placeholder for future API integration
  const addNotice = (newNotice: Notice) => {
    setNotices((prev) => [...prev, newNotice]);
  };

  const deleteNotice = (title: string) => {
    setNotices((prev) => prev.filter((n) => n.title !== title));
  };

  const togglePin = (title: string) => {
    setNotices((prev) =>
      prev.map((n) =>
        n.title === title ? { ...n, isPinned: !n.isPinned } : n
      )
    );
  };

  return {
    pinnedNotices,
    recentNotices,
    addNotice,
    deleteNotice,
    togglePin,
  };
};
