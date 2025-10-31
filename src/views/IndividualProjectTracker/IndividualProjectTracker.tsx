import ImageAndFiles from "../../components/projectTaskTracker/Homepage"
import ProjectDetailsCard from "../../components/singleProjectAndTaskComponent/ProjectDetailsCard/ProjectDetailsCard";
import { AppViewModel } from "../../viewmodels/AppViewModel";
import Sidebar from "../../components/singleProjectAndTaskComponent/Sidebar";
import TaskList from "../../components/singleProjectAndTaskComponent/TaskList";

const IndividualProjectTracker = () => {
  const viewModel = new AppViewModel();
  const projectData = viewModel.getProjectData();

  return (
    <div>
      <div className="min-h-screen  flex justify-center bg-[#F6F5FA] pt-[108px] pb-[48px] ">
        <div className=" flex flex-row bg-white rounded-[16px] shadow ">
          <div className="justify-center ">
            <Sidebar />
          </div>
          <div>
            <ProjectDetailsCard projectDetails={projectData} />
          </div>
        </div>
      </div>
      <div className="bg-white  rounded-lg  w-full ">
        <TaskList />
      </div>

      <ImageAndFiles />
    </div>
  )
}

export default IndividualProjectTracker
