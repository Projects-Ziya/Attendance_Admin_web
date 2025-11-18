import React, { useState } from "react";
<<<<<<< HEAD
import { Eye, ChevronDown, } from "lucide-react";

=======
import { Calendar } from "lucide-react";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

import MyPayrollSlip from "./MyPayrollSlip";
import UploadSalaryReport from "./UploadSalaryReport";
import UploadBundleReport from "./UploadBundleReport";
>>>>>>> 656a622a75ab16a843611c64e3bca5414531765b

const Management: React.FC = () => {
  const [activeTab, setActiveTab] = useState("My Payroll Slip");

  const tabs = [
    "My Payroll Slip",
    "Upload Salary Report",
    "Upload Bundle Report",
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "My Payroll Slip":
        return <MyPayrollSlip />;
      case "Upload Salary Report":
        return <UploadSalaryReport />;
      case "Upload Bundle Report":
        return <UploadBundleReport />;
      default:
        return null;
    }
  };

  const handleslip = () => {
    alert ("are you su")
  }

  return (
    <div className="min-h-screen bg-white px-12 py-8">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-lg font-semibold text-gray-800 leading-4 tracking-[0.08em]">
          Payroll Management System
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage salary reports and payroll information
        </p>
      </div>

      {/* Tabs */}
      <div className="flex bg-[#F4F1FF] rounded-md overflow-hidden mb-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 text-sm py-3 transition font-medium ${
              activeTab === tab
                ? "bg-white text-gray-900 shadow-sm rounded-[50px] w-[100px] mt-2 mb-2"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
<<<<<<< HEAD

      {/* Content Section */}
      <div className="bg-[#E8F5FF] rounded-md p-6 mb-10">
        <h2 className="text-[#007BFF] font-medium text-base mb-4 leading-4 tracking-[0.08em]">
          My Payroll Slip
        </h2>

        <div className="flex items-center gap-4">
          {/* Select Month Dropdown with inline arrow */}
          <div className="flex items-center bg-white border border-gray-200 rounded-full px-4 py-2 text-sm text-gray-700">
            <select
              className="bg-transparent focus:outline-none cursor-pointer text-sm"
              defaultValue=""
            >
              <option value="" disabled>
                Select Month
              </option>
              {months.map((month) => (
                <option key={month} value={month.toLowerCase()}>
                  {month}
                </option>
              ))}
            </select>
            <ChevronDown size={16} className="ml-2 text-gray-500" />
          </div>

          {/* View Payroll Slip Button */}
          <button className="flex items-center gap-2 bg-white border border-gray-200 rounded-full px-5 py-2 text-sm text-gray-700 hover:bg-gray-50" onClick={handleslip}>
            <Eye size={16} />
            <span>View Payroll Slip</span>
          </button>
        </div>
      </div>

      {/* Empty State */}
      ~
=======
      {/* Render Dynamic Content */}
      {renderContent()}
      {/* Empty Section */}
     {activeTab === "My Payroll Slip" && (
  <div className="flex flex-col items-center justify-center mt-[200px] text-center text-gray-600">
    <div className="">
 <DotLottieReact
      src="https://lottie.host/35807265-daaf-4811-af21-feff7c9dcd41/fWBisws4Js.lottie"
      loop
      autoplay 
      
    />  
>>>>>>> 656a622a75ab16a843611c64e3bca5414531765b
    </div>
      <span className="mt-3 text-sm">Select Month</span>
  </div>
)}


    </div>

  );
};

export default Management; 
