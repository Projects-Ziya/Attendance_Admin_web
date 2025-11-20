import {  useState } from "react";

import EditBasicDetails from "../../../components/modifyProfile/EditBasicDetails";
import EditPersonalDetails from "../../../components/modifyProfile/EditPersonalDetails";
import EditBankDetails from "../../../components/modifyProfile/EditBankDetails";
import MainLayout from "../../../components/layout/MainLayout";

const EditProfile = () => {
  const [activeTab, setActiveTab] = useState<"basic" | "personal" | "bank">("basic");
// const navigate = useNavigate();

  const handleContinue =() => {
    if (activeTab==="basic"){
        setActiveTab("personal")
    }else if (activeTab==="personal") {
          setActiveTab("bank")
    }else if(activeTab==="bank"){
        alert("Changes Saved!")
    }
  }

  const handleGoback= () =>{
    if(activeTab==="bank"){
        setActiveTab("personal")
    }else if(activeTab==="personal") {
     setActiveTab("basic")
    }else if(activeTab==="basic"){
        alert("Employee Adding canceled")
        // navigate( to the myprofile page)
    }
  }

  return (
    <MainLayout>
    <div
      className="w-[1469px] min-h-[500px] bg-white rounded-[10px] pt-[60px] mb-10 pb-[80px] pl-[40px] pr-[40px] mx-auto mt-[27px]"
      style={{ boxShadow: "0px 0px 2px 0px #00000040" }}
    >
      {/* Page Title */}
      <h1 className="font-[600] pb-[60px] text-[24px] tracking-[0.08em]">
        Edit Profile
      </h1>

      {/* Tabs */ }
      <div className="flex gap-[5px] mb-8">
        {[
          { key: "basic", label: "Basic Details" },
          { key: "personal", label: "Personal Details" },
          { key: "bank", label: "Bank Details" },
        ].map((tab) => {
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as "basic" | "personal" | "bank")}
              className="flex flex-col items-center"
            >
              <span
                className={`
                  font-poppins font-medium
                  text-[18px] leading-[16px] tracking-[0.08em]
                  ${isActive ? "text-[#00A0E3]" : "text-[#4D4D4D]"}
                `}
              >
                {tab.label}
              </span>
              <div
                className="mt-2 rounded-[5px]"
                style={{
                  width: "181px",
                  height: "2px",
                  backgroundColor: isActive ? "#00A0E3" : "#E5E7EB",
                }}
              />
            </button>
          );
        })}
      </div>

      {/* Content */}
        {activeTab === "basic" && (
     <EditBasicDetails/>
     )}

      {activeTab === "personal"&&(
        <EditPersonalDetails/>
      )}
      {activeTab === "bank"&&(
        <EditBankDetails/>
      )}

      {/* Footer Buttons */}
      <div className="flex justify-end gap-4 mt-10">
        <button className="px-6 py-2 border-[1px] border-[#D9D9D9] text-[#4D4D4D] rounded-md" onClick={handleGoback}>Cancel</button>
        <button className="px-6 py-2 bg-[#00A0E3] text-white rounded-md" onClick={handleContinue}>
            {activeTab=== "bank"?  "Make Changes" : " Continue"}</button>
      </div>
    </div>
    </MainLayout>
  );
};

export default EditProfile;