import React, { useEffect, useState } from 'react';
import TaskDetailsCard from './TaskDetailsCard';
import { AppViewModel } from "../../viewmodels/AppViewModel"
import TimeSpentCard from "../../components/singleProjectAndTaskComponent/TimeSpentCard";
import EditProjectButton from "../../components/singleProjectAndTaskComponent/EditProjectButton";
import CircleImage from "../../components/singleProjectAndTaskComponent/CircleImage";
import { BASE_URL } from '../../constants/urls';

const Sidebar: React.FC = ({ApiProject}) => {
  const viewModel = new AppViewModel();
  const taskData = viewModel.getTaskData();
  const timeSpentData = viewModel.getTimeSpentData();
  const avatarUrl = viewModel.getAvatarUrl();
 const [data, setData] = useState(ApiProject);

useEffect(() => {
  setData(ApiProject);
}, [ApiProject]);

  return (
    <div className="w-[290px] h-fit bg-white  flex flex-col items-center">
      {/* Logo */}
      <CircleImage
        src={`${BASE_URL}${data?.data.project_logo}`}
        size={90}
        border={false}
        className="mb-[39px] mt-[52px]"
      />

      {/* Edit Project Button */}
      <EditProjectButton />

      {/* Cards Section */}
      <div className="flex flex-col items-center gap-5 w-fit">
        {/* Time Spent Card */}
        <TimeSpentCard 
          spentHours={data?.data.time_spent} 
          totalHours={data?.data.total_working_hours} 
        />

        {/* Task Details Card */}
        <TaskDetailsCard 
          completed={data?.data.completed_tasks_count} 
          total={data?.data.tasks.length} 
        />
      </div>
    </div>
  );
};

export default Sidebar;
