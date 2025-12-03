import { useState } from "react";
import type { Notice } from "../../models/anouncementnoticeboard/Notice"; // ✅ make sure this matches your model file

export function useAnnouncementNoticeBoardViewModel() {
  const [pinnedNotices, setPinnedNotices] = useState<Notice[]>([
    {
      title: "Team Operation",
      date: "3-12-2025",
      content:
        "Lorem ipsum dolor sit amet consectetur. Odio semper mauris aliquet nec nibh mauris.",
    },
  ]);

  const [recentNotices, setRecentNotices] = useState<Notice[]>([
    {
      title: "Holiday Schedule",
      date: "2-12-2025",
      content: "Company will remain closed on 25th Dec for Christmas.",
    },
    {
      title: "New Policy Update",
      date: "1-12-2025",
      content: "Updated leave policy is now available in the HR portal.",
    },
  ]);

  // ✅ Add new notice
  const addNotice = (newNotice: Notice) => {
    setRecentNotices((prev) => [newNotice, ...prev]);
  };

  // ✅ Delete notice
  const deleteNotice = (title: string) => {
    setPinnedNotices((prev) => prev.filter((n) => n.title !== title));
    setRecentNotices((prev) => prev.filter((n) => n.title !== title));
  };

  // ✅ Toggle pin/unpin
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
  };
}
