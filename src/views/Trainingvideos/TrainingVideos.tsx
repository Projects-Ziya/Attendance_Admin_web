import React, { useEffect, useState } from "react";
import UploadVideo from "../../components/trainingvideos/UploadVideo";
import VideoCard from "../../components/trainingvideos/VideoCards";
import MainLayout from "../../components/layout/MainLayout";
import api from "../../Api/api";
import type { Video } from "../../models/Video";
import UploadForm from "../../components/trainingvideos/VideoTitle";

const TrainingVideo: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([]);

  // Fetch videos from backend on mount
  const fetchVideos = async () => {
    try {
      const res = await api.get("/api/videos-view/");
      if (res.data && Array.isArray(res.data)) {
        setVideos(res.data);
      }
    } catch (err) {
      console.error("Error fetching videos:", err);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const addVideo = (video: Video) => {
    setVideos((prev) => [video, ...prev]);
    fetchVideos(); // Refetch to sync with backend
  };

  const deleteVideo = (id: string) => {
    setVideos((prev) => prev.filter((v) => v.id !== id));
  };

  const editVideo = (updatedVideo: Video) => {
    setVideos((prev) =>
      prev.map((v) => (v.id === updatedVideo.id ? updatedVideo : v))
    );
  };

  return (
    <MainLayout>
      <div className="w-[1469px] mx-auto p-6">
        <div className="w-full h-auto mt-[35px] shadow-[0px_0px_2px_0px_#00000040] bg-[#FCFCFC] pt-[50px] pb-[50px] px-[96px] flex flex-col gap-[40px]">
          <h1 className="text-[24px] font-bold text-[#4D4D4D]">Training Videos</h1>

          {/* Upload */}
          <UploadVideo onUpload={addVideo} />
           

           <UploadForm/>
          {/* Video Cards */}
          <div className="grid grid-cols-2 gap-[40px]">
            {videos.map((video) => (
              <VideoCard
                key={video.id}
                videos={video}
                onDelete={deleteVideo}
                onEdit={editVideo}
              />
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default TrainingVideo;
