import React, { useEffect, useState } from "react";
import tickIcon from "../../assets/leaveRequestAssets/tick.png";
import crossIcon from "../../assets/leaveRequestAssets/cross.png";
import attachIcon from "../../assets/leaveRequestAssets/attach.png";
import Tabs from "./Tabs";
import BlackModal from "./BlackModal";
import api from "../../Api/api";
import toast from "react-hot-toast";
import { BASE_URL } from "../../constants/urls";
interface LeaveRequestTableProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}


export default function LeaveRequestTable({ activeTab, setActiveTab }: LeaveRequestTableProps) {
  const [requests, setRequests] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState("");

  // ✅ Fetch All Leaves
  const fetchRequests = () => {
    api
      .get("/api/list-all-leaves/")
      .then((res) => {
        if (res.data && res.data.success) {
          const transformed = res.data.data.map((item: any) => ({
            id: item.id,
            date: item.requested_date,
            days: item.leave_days,
            employeeName: item.employee_name,
            leaveType: item.leave_type,
            reason: item.reason || "—",
            attachment: item.attachments ? item.attachments.split("/").pop() : "No File",
            attachmentUrl: item.attachments,
            avatar: item.employee_profile_pic
              ? `${BASE_URL}${item.employee_profile_pic}`
              : "https://via.placeholder.com/40",
            designation: item.employee_designation,
            workMode: item.employee_job_type,
            workModeColor: item.employee_job_type === "WFO" ? "#03C96F" : "#4D4D4D",
          }));
          setRequests(transformed);
        } else {
          setRequests([]);
        }
      })
      .catch((err) => {
        console.error("API Error:", err);
        setRequests([]);
      });
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  // ✅ Approve Handler
  const handleApprove = async (id: string) => {
    try {
      const res = await api.post(`/api/leave-accept/`, { leave_id: id });
      if (res.data.success) {
        toast.success("Leave approved successfully", { id: "unique-toast-id" });
        fetchRequests(); // Refresh the list
      } else {
        toast("⚠️ Failed to approve leave", { id: "unique-toast-id" });
      }
    } catch (err) {
      console.error("Approve Error:", err);
      toast.error("Something went wrong while approving", { id: "unique-toast-id" });
    }
  };

  // ❌ Reject Handler
  const handleReject = async (id: string) => {
    try {
      const res = await api.post(`/api/leave-reject/`, { leave_id: id });
      if (res.data.success) {
        toast.success("Leave rejected successfully", { id: "unique-toast-id" });
        fetchRequests(); // Refresh the list
      } else {
        toast("⚠️ Failed to reject leave", { id: "unique-toast-id" });
      }
    } catch (err) {
      console.error("Reject Error:", err);
      toast.error("Something went wrong while rejecting", { id: "unique-toast-id" });
    }
  };

  return (
    <div className="bg-white rounded-lg fixed max-h-[860px] shadow overflow-x-auto p-4 mb-6 ms-4">
      <div className="fixed top-0 w-full bg-white shadow z-50 p-6"></div>
      <Tabs activeTab={activeTab} onChange={setActiveTab} />
      <div className="bg-white rounded-lg max-h-[860px] scrollable shadow overflow-x-auto p-4 mb-6 ms-4">
        <table className="w-full min-w-[800px] text-left border-collapse mb-6 tracking-[1.28px]">
          <thead className="bg-myGray">
            <tr className="border-b border-[#D9D9D9]">
              <th className="py-3 px-4 text-[17px] font-[600] text-midGray whitespace-nowrap">
                Requested Date
              </th>
              <th className="py-3 px-4 text-[17px] font-[600] text-midGray whitespace-nowrap">
                Leave Days
              </th>
              <th className="py-3 px-4 text-[17px] font-[600] text-midGray w-[300px]">
                Employee Name
              </th>
              <th className="py-3 px-4 text-[17px] font-[600] text-midGray whitespace-nowrap">
                Leave Type
              </th>
              <th className="py-3 px-4 text-[17px] font-[600] text-midGray w-[140px]">
                Reason
              </th>
              <th className="py-3 px-4 text-[17px] font-[600] text-midGray">Attachment</th>
            </tr>
          </thead>

          <tbody className="text-[14px] font-[500] text-midGray tracking-[1.28px]">
            {requests.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-10 text-gray-500 text-[16px]">
                  No Data Found
                </td>
              </tr>
            ) : (
              requests.map((req, index) => (
                <tr
                  key={req.id}
                  className={`border-b border-[#D9D9D9] ${index === requests.length - 1 ? "mb-6" : ""}`}
                >
                  <td className="py-4 px-4">{req.date}</td>
                  <td className="py-4 px-4">{req.days}</td>

                  <td className="py-4 px-4">
                    <div className="flex items-center gap-4">
                      <img
                        src={req.avatar}
                        alt={req.employeeName}
                        className="w-10 h-10 rounded-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = "https://via.placeholder.com/40";
                        }}
                      />
                      <div>
                        <div className="font-[600] text-[16px] text-midGray">{req.employeeName}</div>
                        <div className="flex items-center gap-2">
                          {req.designation && (
                            <span className="font-[400] text-[13px] text-gray-500 whitespace-nowrap">
                              {req.designation}
                            </span>
                          )}
                          {req.workMode && (
                            <span className="flex items-center gap-1">
                              <span
                                className="w-1 h-1 rounded-full"
                                style={{ backgroundColor: req.workModeColor }}
                              ></span>
                              <span
                                className="text-[12px] font-[500]"
                                style={{ color: req.workModeColor }}
                              >
                                {req.workMode}
                              </span>
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="py-4 px-4">{req.leaveType}</td>
                  <td className="py-4 px-4">{req.reason}</td>

                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => {
                          if (req.attachmentUrl) {
                            setSelectedFile(req.attachmentUrl);
                            setShowModal(true);
                          }
                        }}
                        className={`inline-flex items-center gap-2 ${
                          req.attachmentUrl ? "bg-[#4D4D4D]" : "bg-gray-400 cursor-not-allowed"
                        } text-white h-[35px] px-3 rounded-md text-[15px] font-[500] w-[120px] truncate hover:brightness-110 transition hover:text-gray-100 transition-all duration-200 hover:scale-105 active:scale-90`}
                        disabled={!req.attachmentUrl}
                      >
                        <img src={attachIcon} alt="Attach" className="w-3 h-3 flex-shrink-0" />
                        <span className="truncate">{req.attachment}</span>
                      </button>

                      <button
                        onClick={() => handleApprove(req.id)}
                        className="inline-flex items-center gap-2 px-4 h-[35px] rounded-md text-[15px] font-[500] text-white hover:brightness-110 transition hover:text-gray-100 transition-all duration-200 hover:scale-105 active:scale-90"
                        style={{ backgroundColor: "#03C96F" }}
                      >
                        <img src={tickIcon} alt="Approve" className="w-4 h-4" />
                        Approve
                      </button>

                      <button
                        onClick={() => handleReject(req.id)}
                        className="inline-flex items-center gap-2 px-4 h-[35px] rounded-md text-[15px] font-[500] text-white hover:brightness-110 transition hover:text-gray-100 transition-all duration-200 hover:scale-105 active:scale-90"
                        style={{ backgroundColor: "#F11515" }}
                      >
                        <img src={crossIcon} alt="Reject" className="w-4 h-4" />
                        Reject
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {showModal && <BlackModal fileName={selectedFile} onClose={() => setShowModal(false)} />}
      </div>
    </div>
  );
}
