import React from "react";
import MainLayout from "../../components/layout/MainLayout";
import headimg from "../../assets/head.svg";
import MetricsCard from "../../components/ProductivityAndStatus/MetricsCard";
import ProjectTaskCard from "../../components/ProductivityAndStatus/ProjectTaskCards";
import WorkHours from "../../components/ProductivityAndStatus/WorkHours";
import AttendanceLeaveChart from "../../components/ProductivityAndStatus/AttendanceLeaveChart";

function ProductivityStats() {
  return (
    <MainLayout>


      <div className="bg-[#F6F5FA]  w-[1469px]  sm:px-6  ">

        {/* Page Header */}
        <div className="mb-6 sm:mb-8 lg:mb-10 mt-8">
          <h1 className="flex items-center gap-2 text-gray-600 text-[15px] sm:text-[16px] font-[500] leading-[1.3] tracking-[1.28px]">
            <span className="bg-[#DAF1FB] rounded-full w-[36px] h-[36px] sm:w-[40px] sm:h-[40px] flex items-center justify-center">
              <img
                src={headimg}
                alt="Section icon"
                className="w-[27px] h-[25px] sm:w-[27px] sm:h-[25.64px] object-contain"
              />
            </span>
            Productivity & Stats
          </h1>
        </div>

        {/* Work Hours Sectoin  */}
        <section className=" mb-[15px]  ">
          <WorkHours />
        </section>

        {/* Metrics Section */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[15px] w-[1469px]">

          <MetricsCard description="Total Hours Today" />
          <MetricsCard description="Total Hours This Week" />
          <MetricsCard description="Total Hours This Month" />
          <MetricsCard description="Overtime Hours" />


        </section>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-[15px] mt-[60px] w-[1469px]">
          <ProjectTaskCard type="projects" />
          <ProjectTaskCard type="tasks" />
        </section>

        <section className=" gap-[15px] mt-[60px] mb-[95px] w-[1469px]">
          <AttendanceLeaveChart />
        </section>






      </div>
    </MainLayout>
  );
}

export default ProductivityStats;
