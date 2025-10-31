import React from 'react';
import logo from '../../assets/images/logo.svg';
import overview from '../../assets/images/icons/overview.svg';
import attendance from '../../assets/images/icons/attendancesammery.svg';
import leave from '../../assets/images/icons/leaverequest.svg';
import task from '../../assets/images/icons/tasktracker.svg';
import productivity from '../../assets/images/icons/prodectivityandstatus.svg';
import quick from '../../assets/images/icons/quickactionpanal.svg';
import employee from '../../assets/images/icons/employee.svg';
import { useNavigate, useLocation } from 'react-router-dom';

interface SidebarItem {
  id: string;
  label: string;
  icon: string;
  path: string;
}

const Sidebar: React.FC = () => {
  const sidebarItems: SidebarItem[] = [
    { id: 'overview', label: 'Overview Cards', icon: overview, path: '/dashboard' },
    { id: 'employee', label: 'Employee Dashboard', icon: employee, path: '/Employee-Dashboard' },
    { id: 'attendance', label: 'Attendance Summary', icon: attendance, path: '/Attendancesummary' },
    { id: 'leave', label: 'Leave Requests', icon: leave, path: '/allLeaveRequests' },
    { id: 'task', label: 'Project/Task Tracker', icon: task, path: '/ProjectTaskTracker' },
    { id: 'productivity', label: 'Productivity & Stats', icon: productivity, path: '/ProductivityAndStatus' },
    { id: 'quick', label: 'Quick Action Panel', icon: quick, path: '/QuickAction' },
  ];

  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="h-screen bg-white border-r border-gray-200 flex flex-col w-[19.6vw] max-w-[377px] min-w-[220px]">
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 pt-6 pb-5">
        <img src={logo} className="w-[34px] h-[34px]" alt="Ziya Logo" />
        <h1 className="text-[18px] font-semibold text-ziyablue tracking-wide font-['Poppins']">
          ADMIN DASHBOARD
        </h1>
      </div>

      {/* Divider */}
      <div className="w-full h-[1px] bg-gray-200 mb-4" />

      {/* Sidebar Items */}
      <div className="flex flex-col gap-2 px-3">
        {sidebarItems.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <div
              key={item.id}
              onClick={() => navigate(item.path)}
              className={`flex items-center gap-3 px-3 py-3 rounded-md cursor-pointer transition-all duration-200 ${isActive ? 'bg-[#E1F1FF]' : 'hover:bg-[#E1F1FF]'
                }`}
            >
              <img
                src={item.icon}
                alt={item.label}
                className={`w-[24px] h-[24px] transition-all duration-200 ${isActive ? 'filter-blue' : ''
                  }`}
              />
              <span
                className={`text-[16px] leading-[40px] font-medium font-['Poppins'] ${isActive ? 'text-ziyablue' : 'text-gray-700'
                  }`}
              >
                {item.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Extra static item with margin at the bottom */}
      <div className="mt-auto mb-16 flex flex-col gap-2 px-3">
    {[
      { label: 'Profile Settings', icon: overview, path: '/profileSettings' },
      { label: 'Notifications', icon: overview, path: '/notifications' },
    ].map((item) => {
      const isActive = location.pathname === item.path;
      return (
        <div
          key={item.path}
          onClick={() => navigate(item.path)}
          className={`flex items-center gap-3 px-3 py-3 rounded-md cursor-pointer transition-all duration-200 ${
            isActive ? 'bg-[#E1F1FF]' : 'hover:bg-[#E1F1FF]'
          }`}
        >
          <img
            src={item.icon}
            alt={item.label}
            className={`w-[24px] h-[24px] transition-all duration-200 ${
              isActive ? 'filter-blue' : ''
            }`}
          />
          <span
            className={`text-[16px] leading-[40px] font-medium font-['Poppins'] ${
              isActive ? 'text-ziyablue' : 'text-gray-700'
            }`}
          >
            {item.label}
          </span>
        </div>
      );
    })}
  </div>

    </div>
  );
};

export default Sidebar;
