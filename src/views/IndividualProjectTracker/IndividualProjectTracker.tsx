import ImageAndFiles from "../../components/projectTaskTracker/Homepage";
import ProjectDetailsCard from "../../components/singleProjectAndTaskComponent/ProjectDetailsCard/ProjectDetailsCard";
import { AppViewModel } from "../../viewmodels/AppViewModel";
import Sidebar from "../../components/singleProjectAndTaskComponent/Sidebar";
import TaskList from "../../components/singleProjectAndTaskComponent/TaskList";
import { useEffect, useState } from "react";
import api from "../../Api/api";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const IndividualProjectTracker = ({ ID1 }) => {
  const [pData, setPdata] = useState(null);
  const [viewModel, setViewModel] = useState<AppViewModel | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const navigate = useNavigate();

  const fetchProjectDetails = async () => {
    try {
      const response = await api.get(`/api/project-details-by-id/${ID1}`);
      setPdata(response.data);
      setViewModel(new AppViewModel(response.data));
    } catch (error) {
      console.error("Error fetching project details:", error);
    }
  };

  useEffect(() => {
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
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="flex border px-4 py-1 items-center space-x-1 text-sm font-medium hover:text-gray-800 rounded bg-white mt-[30px]"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Back</span>
      </button>

      {/* Main content */}
      <div className="min-h-screen flex justify-center bg-[#F6F5FA] pt-[50px] pb-[48px]">
        <div className="flex flex-row bg-white rounded-[16px] shadow">
          <Sidebar
            ApiProject={pData}
            onEditProject={() => setShowEditModal(true)} // ✅ triggers modal open
          />
          <ProjectDetailsCard
            projectDetails={viewModel}
            ApiProject={pData}
            showEditModal={showEditModal} // ✅ pass state
            setShowEditModal={setShowEditModal} // ✅ pass setter
            refetchProject={fetchProjectDetails} // ✅ refresh after save
          />
        </div>
      </div>

      {/* Task list */}
      <div className="bg-white rounded-lg w-full">
        <TaskList ApiProject={pData} />
      </div>

      {/* Files */}
      <section className="w-full">
        <ImageAndFiles ApiProject={pData} id={ID1} />
      </section>
    </div>
  );
};

export default IndividualProjectTracker;
