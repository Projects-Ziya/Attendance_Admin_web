import ImageAndFiles from "../../components/projectTaskTracker/Homepage";
import ProjectDetailsCard from "../../components/singleProjectAndTaskComponent/ProjectDetailsCard/ProjectDetailsCard";
import { AppViewModel } from "../../viewmodels/AppViewModel";
import Sidebar from "../../components/singleProjectAndTaskComponent/Sidebar";
import TaskList from "../../components/singleProjectAndTaskComponent/TaskList";
import { useEffect, useState } from "react";
import api from "../../Api/api";

const IndividualProjectTracker = ({ ID1 }) => {
  const [pData, setPdata] = useState(null);
  const [viewModel, setViewModel] = useState<AppViewModel | null>(null);

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const response = await api.get(`/api/project-details-by-id/${ID1}`);
        setPdata(response.data);
        setViewModel(new AppViewModel(response.data));
      } catch (error) {
        console.error("Error fetching project details:", error);
      }
    };

    if (ID1) fetchProjectDetails();
  }, [ID1]);

  if (!pData || !viewModel) {
    return (
      <div className="pt-[108px] text-center text-gray-500">
        Loading...
      </div>
    );
  }

  return (
    <div>
      <div className="min-h-screen flex justify-center bg-[#F6F5FA] pt-[108px] pb-[48px]">
        <div className="flex flex-row bg-white rounded-[16px] shadow">
          <Sidebar ApiProject={pData} />
          <ProjectDetailsCard projectDetails={viewModel} ApiProject={pData} />
        </div>
      </div>

      <div className="bg-white rounded-lg w-full">
        <TaskList ApiProject={pData} />
      </div>

      <ImageAndFiles ApiProject={pData} id={ID1} />
    </div>
  );
};

export default IndividualProjectTracker;
