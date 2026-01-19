import React, { useEffect, useState } from "react";
import UploadForm from "../../components/trainingvideos/VideoTitle";
import VideoCard from "../../components/trainingvideos/VideoCards";
import MainLayout from "../../components/layout/MainLayout";
import api from "../../Api/api";
import type { Video } from "../../models/Video";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import videoicon from "../../assets/icons/bluevideoicon.svg"
import EditVideoModal from "../../components/trainingvideos/EditVideoModal";

// Animation variants
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0, 0, 0.2, 1]
 } }
};

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
<motion.div
        className="bg-[#F6F5FA] px-4 sm:px-6 lg:pl-[37px] pr-[37px] "
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      ></motion.div>

 <div className="bg-[#F6F5FA] w-[1469px] sm:px-4 lg:px-6 mb-[40px] ">
        {/* Header */}
        <div className="mb-6 sm:mb-8 lg:mb-10 mt-8 sm:mt-12">
          <h1 className="flex items-center gap-2 text-midGray text-[16px] leading-[16px] font-[500]">
            <span className="bg-[#DAF1FB] rounded-full w-[40px] h-[40px] flex items-center justify-center">
              <img src={videoicon} alt="Section icon" className="w-5.5 h-5.5 filter-blue" />
            </span>
            Training Videos
          </h1>
        </div>

      <motion.div className="w-[1469px] mx-auto " variants={itemVariants}>
        <div className="w-full h-auto mt-[35px] shadow-[0px_0px_2px_0px_#00000040] bg-[#FCFCFC] pt-[50px] pb-[50px] flex flex-col gap-[40px]">
          <h1 className="text-[24px] font-bold  pl-[30px]  text-[#4D4D4D]">Training Videos</h1>

          <UploadForm onUpload={addVideo} />

          <div className="flex flex-wrap items-center justify-center gap-[45px] ">
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
        </motion.div>



        </div>
       
      
    </MainLayout>
  );
};

export default TrainingVideo;
