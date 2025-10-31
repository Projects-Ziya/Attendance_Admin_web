import React from 'react';
import TaskDetailsCard from './TaskDetailsCard';
import { AppViewModel } from "../../viewmodels/AppViewModel"
import TimeSpentCard from "../../components/singleProjectAndTaskComponent/TimeSpentCard";
import EditProjectButton from "../../components/singleProjectAndTaskComponent/EditProjectButton";
import CircleImage from "../../components/singleProjectAndTaskComponent/CircleImage";

const Sidebar: React.FC = () => {
  const viewModel = new AppViewModel();
  const taskData = viewModel.getTaskData();
  const timeSpentData = viewModel.getTimeSpentData();
  const avatarUrl = viewModel.getAvatarUrl();

  return (
    <div className="w-[290px] h-fit bg-white  flex flex-col items-center">
      {/* Logo */}
      <CircleImage
        src={avatarUrl}
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
          spentHours={timeSpentData.spentHours} 
          totalHours={timeSpentData.totalHours} 
        />

        {/* Task Details Card */}
        <TaskDetailsCard 
          completed={taskData.completed} 
          total={taskData.total} 
        />
      </div>
    </div>
  );
};

export default Sidebar;
