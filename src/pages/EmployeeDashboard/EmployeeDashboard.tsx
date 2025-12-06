import React from "react";
import { useEmployeeDashboardViewModel } from "../../viewmodels/useEmployeeDashboardViewModel";
import LeavesDetails from "../../components/employeeDashboard/LeavesDetails";
import StatsCards from "../../components/employeeDashboard/StatsCards";
import WorkHoursTimeline from "../../components/employeeDashboard/WorkHoursTimeline";
import EmployeeProfileCard from "../../components/employeeDashboard/EmployeeProfileCard";
import DashboardHeader from "../../components/employeeDashboard/DashboardHeader";
import LeaveDetailsChart from "../../components/employeeDashboard/LeaveDetailsChart";
import NotificationsPanel from "../../components/employeeDashboard/NotificationsPanel";
import { useNotificationViewModel } from "../../viewmodels/useNotificationViewModel";
import { useProjectsVM } from "../../viewmodels/EmployeeDashboard/useProjects";
import { useTasksVM } from "../../viewmodels/EmployeeDashboard/useTasks";
import ProjectsPanel from "../../components/employeeDashboard/ProjectsPanel";
import TasksPanel from "../../components/employeeDashboard/TasksPanel";
import { LeaveStatusPage } from "../../components/employeeDashboard/LeaveStatusPage";

interface EmployeeDashboardProps {
  employeeId: string;
}

const EmployeeDashboard: React.FC<EmployeeDashboardProps> = ({ employeeId }) => {
  const { employee, leaves, stats, loading, error } =
    useEmployeeDashboardViewModel(employeeId);

  const { notifications, hideNotification } = useNotificationViewModel();
  const { projects } = useProjectsVM();
  const { tasks } = useTasksVM();

  const handleActionClick = (id: number) => {
    hideNotification(id);
  };

  if (loading)
    return (
      <div className="min-h-screen p-6 bg-gray-50">Loading...</div>
    );

  if (error)
    return (
      <div className="min-h-screen p-6 bg-gray-50 text-red-600">{error}</div>
    );

  if (!employee) return null;

  return (
    <div className="space-y-12">
      <DashboardHeader />

      <EmployeeProfileCard employee={employee} />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-3">
        <div className="lg:col-span-1">
          <LeavesDetails leaves={leaves} />
        </div>

        <div className="lg:col-span-3 space-y-3">
          <StatsCards stats={stats} />
          <WorkHoursTimeline series={stats?.timeline ?? []} />
        </div>
      </div>

      <div className="flex gap-3">
        <LeaveDetailsChart />
        <NotificationsPanel
          notifications={notifications}
          onActionClick={handleActionClick}
        />
      </div>

      <div className="flex gap-3">
        <ProjectsPanel projects={projects} />
        <TasksPanel tasks={tasks} />
      </div>

      <LeaveStatusPage />
    </div>
  );
};

export default EmployeeDashboard;
