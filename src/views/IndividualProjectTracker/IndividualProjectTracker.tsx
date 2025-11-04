import ImageAndFiles from "../../components/projectTaskTracker/Homepage"
import ProjectDetailsCard from "../../components/singleProjectAndTaskComponent/ProjectDetailsCard/ProjectDetailsCard";
import { AppViewModel } from "../../viewmodels/AppViewModel";
import Sidebar from "../../components/singleProjectAndTaskComponent/Sidebar";
import TaskList from "../../components/singleProjectAndTaskComponent/TaskList";
import { useEffect, useState } from "react";
import api from "../../Api/api";

const IndividualProjectTracker = ({ ID1 }) => {
  const [pData, setPdata]=useState()
  console.log(ID1)
  const viewModel = new AppViewModel();
  const projectData = viewModel.getProjectData();
  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const response = await api.get(`/api/project-details-by-id/${ID1.id}`);
        setPdata(response.data);

      } catch (error) {
        console.error("Error fetching project details:", error);
      }
    };

    fetchProjectDetails();
  }, [ID1]);
  return (
    <div>
      <div className="min-h-screen  flex justify-center bg-[#F6F5FA] pt-[108px] pb-[48px] ">
        <div className=" flex flex-row bg-white rounded-[16px] shadow ">
          <div className="justify-center ">
            <Sidebar ApiProject= {pData} />
          </div>
          <div>
            <ProjectDetailsCard projectDetails={projectData} ApiProject= {pData} />
          </div>
        </div>
      </div>
      <div className="bg-white  rounded-lg  w-full ">
        <TaskList ApiProject= {pData} />
      </div>

      <ImageAndFiles ApiProject= {pData} id={ID1} />
    </div>
  )
}

export default IndividualProjectTracker
