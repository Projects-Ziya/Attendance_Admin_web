import React from "react";
import UploadVideo from "../../components/trainingvideos/UploadVideo";
import VideoCards from "../../components/trainingvideos/VideoCards";
import videoicon from '../../assets/icons/videoicon.svg'
import { useTrainingVideoViewModel } from "../../viewmodels/trainingvideo/TrainingVideoViewModel";
import MainLayout from "../../components/layout/MainLayout";


const TrainingVideo: React.FC = () => {
  const vm = useTrainingVideoViewModel();

  return (
    <MainLayout>

      <div className="w-[1469px] mx-auto p-6">
      {/* Your header and go-back button */}
        <div className="flex items-center mb-[35px]">
          <button className="text-[18px] font-[500] text-gray-500 border bg-[#FCFCFC] h-[40px] w-[130px] hover:text-gray-700">
            ← Back
          </button>
          <img className="h-[26px] w-[26px] ml-[19px]" src={videoicon} alt="" />
          <p className="ml-[17px] font-[500]">Training Videos</p>
        </div>

    <div className="w-full h-auto mt-[170px]  shadow-[0px_0px_2px_0px_#00000040]  bg-[#FCFCFC] pt-[50px] pb-[50px] px-[96px] flex flex-col gap-[40px]">
      {/* Header */}
      <div className="mb-[30px]">
        <h1 className="text-[24px] font-bold text-[#4D4D4D]">Training Videos</h1>
        <p className="text-[16px] text-[#7D7D7D]">
          Manage training and educational content
        </p>
      </div>

      {/* Upload Section */}
      <UploadVideo onUpload={vm.addVideo} />

      {/* Video Cards */}
      <div className="grid grid-cols-2 gap-[40px]">
      <VideoCards
        videos={vm.videos}          // ✅ pass the array directly
        onDelete={vm.deleteVideo}
        onEdit={vm.editVideo}
      />
      <VideoCards
        videos={vm.videos}          // ✅ pass the array directly
        onDelete={vm.deleteVideo}
        onEdit={vm.editVideo}
      />
      </div>
    </div>
    </div>
  
    </MainLayout>
  );
};

export default TrainingVideo;
