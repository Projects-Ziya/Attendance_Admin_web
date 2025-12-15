import { useEffect, useState } from "react";
import api from "../../../Api/api";

import EditBasicDetails from "../../../components/modifyProfile/EditBasicDetails";
import EditPersonalDetails from "../../../components/modifyProfile/EditPersonalDetails";
import EditBankDetails from "../../../components/modifyProfile/EditBankDetails";
import MainLayout from "../../../components/layout/MainLayout";

const EditProfile = () => {
  const [activeTab, setActiveTab] = useState<"basic" | "personal" | "bank">("basic");
  const [employeeData, setEmployeeData] = useState<any>(null);
  const [employeeId, setEmployeeId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [updating, setUpdating] = useState<boolean>(false);

  // Fetch employee details once
  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      try {
        // Get current admin profile
        const meRes = await api.get("/api/adminprofile/");
        console.log("adminprofile response", meRes.data);

        const idFromApi = meRes.data?.data?.id as string | undefined;

        if (!idFromApi) {
          console.error("No data.${id} in /api/adminprofile/ response");
          return;
        }

        setEmployeeId(idFromApi);

        // Use that id to fetch editable details
        const res = await api.get(`/api/employeedetailedit/${idFromApi}/`);
        setEmployeeData(res.data);
      } catch (error) {
        console.error("Failed to fetch employee details", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployeeDetails();
  }, []);

  // This is the only place that controls tab navigation + save
  const handleContinue = async () => {
    // Not yet on bank tab: just move to the next step
    if (activeTab === "basic") {
      setActiveTab("personal");
      return;
    }
    if (activeTab === "personal") {
      setActiveTab("bank");
      return;
    }

    // On bank tab -> button label is "Make Changes" -> call API here
    if (activeTab === "bank") {
      if (!employeeId) {
        alert("Employee ID missing. Please re-login.");
        return;
      }

      try {
        setUpdating(true);

        const res = await api.put(
          `/api/employeedetailedit/${employeeId}/`,
          employeeData
        );

        alert("Changes saved successfully!");
        setEmployeeData(res.data);
      } catch (error) {
        console.error("Failed to update employee details", error);
        alert("Failed to save changes. Try again.");
      } finally {
        setUpdating(false);
      }
    }
  };

  const handleGoback = () => {
    if (activeTab === "bank") {
      setActiveTab("personal");
    } else if (activeTab === "personal") {
      setActiveTab("basic");
    } else if (activeTab === "basic") {
      alert("Employee Adding canceled");
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center h-[300px]">
          <p>Loading profile details...</p>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div
        className="w-[1469px] min-h-[500px] bg-white rounded-[10px] pt-[60px] mb-10 pb-[80px] pl-[40px] pr-[40px] mx-auto mt-[27px]"
        style={{ boxShadow: "0px 0px 2px 0px #00000040" }}
      >
        <h1 className="font-[600] pb-[60px] text-[24px] tracking-[0.08em]">
          Edit Profile
        </h1>

        {/* Tabs */}
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
                onClick={() =>
                  setActiveTab(tab.key as "basic" | "personal" | "bank")
                }
                className="flex flex-col items-center"
              >
                <span
                  className={`font-poppins font-medium text-[18px] leading-[16px] tracking-[0.08em] ${
                    isActive ? "text-[#00A0E3]" : "text-[#4D4D4D]"
                  }`}
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
          <EditBasicDetails
            data={employeeData}
            setEmployeeData={setEmployeeData}
          />
        )}
        {activeTab === "personal" && (
          <EditPersonalDetails
            data={employeeData}
            setEmployeeData={setEmployeeData}
          />
        )}
        {activeTab === "bank" && (
          <EditBankDetails
            data={employeeData}
            setEmployeeData={setEmployeeData}
          />
        )}

        {/* Footer Buttons */}
        <div className="flex justify-end gap-4 mt-10">
          <button
            className="px-6 py-2 border-[1px] border-[#D9D9D9] text-[#4D4D4D] rounded-md"
            onClick={handleGoback}
          >
            Cancel
          </button>
          <button
            className="px-6 py-2 bg-[#00A0E3] text-white rounded-md"
            onClick={handleContinue}
            disabled={updating}
          >
            {activeTab === "bank"
              ? updating
                ? "Saving..."
                : "Make Changes"
              : "Continue"}
          </button>
        </div>
      </div>
    </MainLayout>
  );
};

export default EditProfile;
