import React, { useEffect, useState } from "react";
import api from "../../Api/api";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';


import MyPayrollSlip from "./MyPayrollSlip";
import UploadSalaryReport from "./UploadSalaryReport";
import UploadBundleReport from "./UploadBundleReport";

const Management: React.FC = () => {
  const [activeTab, setActiveTab] = useState("My Payroll Slip");
  const [showSlip, setShowSlip] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading , setLoading]= useState(true);
  const [data,setData] = useState (null);

  const tabs = [
    "My Payroll Slip",
    "Upload Salary Report",
    "Upload Bundle Report",
  ];

const renderContent = () => {
  switch (activeTab) {
    case "My Payroll Slip":
      return (
        <MyPayrollSlip
          showSlip={showSlip}
          setShowSlip={setShowSlip}
        />
      );
    case "Upload Salary Report":
      return <UploadSalaryReport />;
    case "Upload Bundle Report":
      return <UploadBundleReport />;
    default:
      return null;
  }
};

  const handleslip = () => {
    alert ("are you ok")
  }



  useEffect (() => {
      const fetchdata = async () => {
        try{
    setLoading(false);
    setError (null);
    
    
        const res = await api.get ("/api/salary-pdf/")
        setData (res.data);
      }catch(err:any){
        console.error("Fetch error :", err?.response|| err.message || err);
        setError("Failed to fetch payroll slip data")

      }finally{
        setLoading (false);
      }
    };
    fetchdata();
  },[]);

  if (loading) {
    return(
      <div className="flex items-center justify-center w-full h-[573px]">
        <p className="text-[#4D4D4D] text-[18px]">Loading Salary Slip..</p>
      </div>
    );
  }

  if (error) {
    return(
<div className="flex items-center justify-center w-full h-[573px]">
  <p className="text-red-500 text-lg">{error}</p>
</div>
    );
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

      {/* Render Dynamic Content */}
      {renderContent()}
      {/* Empty Section */}
     {activeTab === "My Payroll Slip" && !showSlip &&  (
  <div className="flex flex-col items-center justify-center mt-[200px] text-center text-gray-600">
    <div className="">
 <DotLottieReact
      src="https://lottie.host/35807265-daaf-4811-af21-feff7c9dcd41/fWBisws4Js.lottie"
      loop
      autoplay 
      
    />  
    </div>
      <span className="mt-3 text-sm">Select Month</span>
  </div>
)}


    </div>

  );
};

export default Management; 
