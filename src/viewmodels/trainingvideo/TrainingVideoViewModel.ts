import { useState } from "react";
import type { Video } from "../../models/Video";

export const useTrainingVideoViewModel = () => {
  const [videos, setVideos] = useState<Video[]>([
    {
      id: "mock001",
      title: "Employee Onboarding Process",
      duration: "15:30",
      views: 46,
      description: "Complete guide for new employee onboarding procedures",
      uploadedBy: "HR Department",
      uploadDate: "2025-11-20",
    },
  ]);

  const addVideo = (video: Video) => {
    setVideos((prev) => [...prev, video]);
  };

  const deleteVideo = (id: string) => {
    setVideos((prev) => prev.filter((v) => v.id !== id));
  };

  const editVideo = (updated: Video) => {
    setVideos((prev) =>
      prev.map((v) => (v.id === updated.id ? updated : v))
    );
  };

  return {
    videos,
    addVideo,
    deleteVideo,
    editVideo,
  };
};
