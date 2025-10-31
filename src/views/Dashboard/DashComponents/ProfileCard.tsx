import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import useProfileData from "../../../hooks/useProfileData";
import useDashboardCounts from "../../../hooks/useDashboardCounts";
import add from "../../../assets/images/icons/add.svg";
import addblue from "../../../assets/images/icons/addblue.svg";
import Button from "../../../../src/components/common/ui/Button";

const DashboardHeader: React.FC = () => {
  const navigate = useNavigate();

  const { profileImg, userName, role, loading: profileLoading } = useProfileData();
  const { pendingApprovals, leaveRequests, loading: countsLoading } = useDashboardCounts();

  const handleAddEmployee = useCallback(() => {
    navigate("/addemployee");
  }, [navigate]);
  const handleLeaveRequest = useCallback(() => {
    navigate("/addLeaveRequest");
  }, [navigate]);
  const handleAddProject = useCallback(() => {
    navigate("/AddProject");
  }, [navigate]);

  return (
    <div className="flex items-center justify-between rounded-md border border-blue-100  bg-white  px-6 sm:px-8 lg:px-10 py-6 sm:py-8 lg:py-9
                w-[76.90vw] max-w-[1479px]  ">
      {/* Left - User Info */}
      <div className="flex items-center space-x-6">
        <img
          src={profileImg}
          alt="User"
          className="w-[57px] h-[57px] rounded-full object-cover"
        />
        <div>
          <h2 className="text-[32px] font-bold text-[#4D4D4D] font-poppins">
            Welcome Back,{" "}
            <span className="text-[#4D4D4D]">
              {profileLoading ? "Loading..." : userName}
            </span>
          </h2>
          <p className="text-[16px] text-[#DE8D12] font-poppins font-normal pb-2">
            {role}
          </p>
          <p className="text-[18px] text-[#909090] font-poppins font-normal">
            You have{" "}
            <span className="text-[#00A0E3] font-semibold">
              {countsLoading ? "..." : pendingApprovals}
            </span>{" "}
            Pending Approvals &{" "}
            <span className="text-[#00A0E3] font-semibold">
              {countsLoading ? "..." : leaveRequests}
            </span>{" "}
            Leave Requests
          </p>
        </div>
      </div>

      {/* Right - Buttons */}
      <div className="flex justify-end">
        <div className="flex flex-col space-y-6">
          <div className="flex space-x-6">
            <Button onClick={handleAddProject}
              variant="primary"
              size="large"
              className="w-[219px] h-[62px] flex items-center justify-center bg-[#94C21A] hover:bg-[#59981A]"
            >
              <img src={add} alt="Add" className="mr-2" />
              Add Project
            </Button>
            <Button onClick={handleLeaveRequest}
              variant="primary"
              size="large"
              className="w-[219px] h-[62px] flex items-center justify-center bg-[#00A0E3]"
            >
              <img src={add} alt="Add" className="mr-2" />
              Add Requests
            </Button>
          </div>

          <button
            onClick={handleAddEmployee}
            className="flex items-center  justify-center border text-ziyablack px-4 py-2 rounded hover:bg-gray-100 w-[462px] h-[62px]"
          >
            <img src={addblue} alt="Add" className="mr-2" />
            Add New Employee
          </button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(DashboardHeader);
