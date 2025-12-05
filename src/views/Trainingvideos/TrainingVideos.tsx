import React, { useEffect, useState } from "react";
import UploadForm from "../../components/trainingvideos/VideoTitle";
import VideoCard from "../../components/trainingvideos/VideoCards";
import MainLayout from "../../components/layout/MainLayout";
import api from "../../Api/api";
import type { Video } from "../../models/Video";
import toast from "react-hot-toast";

const TrainingVideo: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([]);

  const fetchVideos = async () => {
    try {
      const res = await api.get("/api/videos-view/");
      if (res.data?.data && Array.isArray(res.data.data)) {
        setVideos(res.data.data);
      }
    } catch (err) {
      console.error("Error fetching videos:", err);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const addVideo = (video: Video) => {
    fetchVideos();
  };

  const deleteVideo = async (id: string) => {
    try {
      await api.delete(`/api/trainingvideo-update-delete/${id}/`);
      toast.success("Video deleted successfully");
      fetchVideos();
    } catch (err) {
      console.error("Delete error:", err);
      toast.error("Error while deleting");
    }
  };

  const editVideo = () => {
    fetchVideos();
  };

  return (
    <MainLayout>
      <div className="w-[1469px] mx-auto p-6">
        <div className="w-full h-auto mt-[35px] shadow-[0px_0px_2px_0px_#00000040] bg-[#FCFCFC] pt-[50px] pb-[50px] px-[96px] flex flex-col gap-[40px]">
          <h1 className="text-[24px] font-bold text-[#4D4D4D]">Training Videos</h1>

          <UploadForm onUpload={addVideo} />

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
