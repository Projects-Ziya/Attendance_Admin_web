import { useEffect, useState } from "react";
import Tabs from "../../components/LeaveRequest/Tabs";
import api from "../../Api/api";
import tickIcon from "../../assets/leaveRequestAssets/tick.png";
import crossIcon from "../../assets/leaveRequestAssets/cross.png";
import editIcon from "../../assets/leaveRequestAssets/edit.png";
import toast from "react-hot-toast";

function InitialAvatar({ name }) {
  const initials = name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E6F4FF] text-[#1E90FF] text-xs font-semibold border border-[#D9D9D9]">
      {initials || "?"}
    </div>
  );
}

function Avatar({ src, alt }) {
  return (
    <img
      src={src}
      alt={alt}
      className="w-8 h-8 rounded-full object-cover border border-[#D9D9D9]"
    />
  );
}

export default function ProjectApprovalTable({
  activeTab,
  setActiveTab,
  loading = false,
  onApprove = () => {},
  onReject = () => {},
  onEdit = () => {},
}) {
  const [data, setData] = useState([]);
  const [loadingState, setLoadingState] = useState(true);

  // ✅ Fetch projects
  const fetchRequests = async () => {
    try {
      setLoadingState(true);
      const res = await api.get("/api/new-list-projects/");
      if (res.data.success) {
        const mappedData = res.data.projects.map((p) => ({
          id: p.id,
          project: p.project_name,
          date: p.start_date,
          endDate: p.end_date,
          coordinatorName: p.coordinator?.name || "Unknown",
          coordinatorAvatar: p.coordinator?.profile_pic,
          designation: p.coordinator?.designation,
          coordinatorRole: p.status,
          members: p.members?.length || 0,
          memberAvatars:
            p.members
              ?.map(
                (m) =>
                  m.tags_details?.profile_pic ||
                  m.project_manager_details?.profile_pic ||
                  m.team_leader_details?.profile_pic
              )
              .filter(Boolean) || [],
          tasks: p.tasks?.length || 0,
          hours: p.tasks?.[0]?.task_hours || 0,
        }));
        setData(mappedData);
      } else {
        console.error("Failed to load projects");
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoadingState(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  // ✅ Approve Handler (fixed)
  const handleApprove = async (id) => {
    try {
      const res = await api.post("/api/projects-accept/", { project_id: id });
      if (res.data.success) {
        toast.success("✅ Project approved successfully");
        fetchRequests(); // Refresh the list
      } else {
        toast("⚠️ Failed to approve project");
      }
    } catch (err) {
      console.error("Approve Error:", err);
      toast.error("❌ Something went wrong while approving");
    }
  };

  // ❌ Reject Handler (includes reason prompt)
  const handleReject = async (id) => {
    try {
      const reason = prompt("Please enter the reason for rejection:");
      if (!reason) {
        toast("⚠️ Rejection reason is required!");
        return;
      }

      const res = await api.post("/api/projects-reject/", {
        project_id: id,
        reason_for_rejection: reason,
      });

      if (res.data.success) {
        toast.success("❌ Project was rejected successfully");
        fetchRequests(); // Refresh the list
      } else {
        toast("⚠️ Failed to reject project");
      }
    } catch (err) {
      console.error("Reject Error:", err);
      toast.error("❌ Something went wrong while rejecting");
    }
  };

  if (loading || loadingState) {
    return (
      <div className="bg-white rounded-lg shadow overflow-x-auto p-4 mb-6 ms-4">
        <Tabs activeTab={activeTab} onChange={setActiveTab} />
        <div className="p-6 text-[14px] text-midGray">Loading...</div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-4 mb-6 ms-4">
      <Tabs activeTab={activeTab} onChange={setActiveTab} />

      <div className="overflow-x-auto">
        {data.length === 0 ? (
          <div className="py-10 text-center text-gray-500 text-[16px] font-medium">
            No Data Found
          </div>
        ) : (
          <table className="w-full min-w-[950px] text-left border-collapse mb-6">
            <thead className="bg-myGray">
              <tr className="border-b border-[#D9D9D9]">
                <th className="py-3 px-4 text-[17px] font-[600] tracking-[1.28px] text-midGray">
                  Proj / Date
                </th>
                <th className="py-3 px-4 text-[17px] font-[600] tracking-[1.28px] text-midGray">
                  Coordinators
                </th>
                <th className="py-3 px-4 text-[17px] font-[600] tracking-[1.28px] text-midGray">
                  End Date
                </th>
                <th className="py-3 px-4 text-[17px] font-[600] tracking-[1.28px] text-midGray">
                  Members
                </th>
                <th className="py-3 px-4 text-[17px] font-[600] tracking-[1.28px] text-midGray">
                  Tasks / Hrs
                </th>
              </tr>
            </thead>
            <tbody className="text-sm text-midGray">
              {data.map((row) => (
                <tr key={row.id} className="border-b-[1px] border-[#D9D9D9]">
                  {/* Project / Date */}
                  <td className="py-3 px-4">
                    <div className="flex flex-col leading-[1.15]">
                      <span className="text-[16px] tracking-[1.28px] leading-[16px] font-[500] text-midGray">
                        {row.project}
                      </span>
                      {row.date && (
                        <span className="text-[13px] font-[500] tracking-[1.28px] leading-[16px] mt-1 text-[#909090]">
                          {row.date}
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Coordinators */}
                  <td className="py-3 px-3 align-top">
                    <div className="flex items-center gap-3">
                      {row.coordinatorAvatar ? (
                        <Avatar
                          src={row.coordinatorAvatar}
                          alt={row.coordinatorName}
                        />
                      ) : (
                        <InitialAvatar name={row.coordinatorName} />
                      )}
                      <div className="flex flex-col leading-[1.15]">
                        <span className="font-[600] text-[16px] tracking-[1.28px] text-midGray">
                          {row.coordinatorName}
                        </span>
                        {row.designation && (
                          <span className="text-[13px] font-[400] tracking-[1.28px]">
                            {row.designation}
                          </span>
                        )}
                        <span className="text-[13px] font-[400] tracking-[1.28px] mt-1">
                          {row.coordinatorRole}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* End Date */}
                  <td className="py-3 px-4 text-[14px] tracking-[1.28px] leading-[16px] text-[#5B5B5B] font-[500]">
                    {row.endDate}
                  </td>

                  {/* Members */}
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      {(row.memberAvatars || [])
                        .slice(0, 3)
                        .map((src, i) => (
                          <div
                            key={i}
                            className={`w-8 h-8 rounded-full border-2 border-white overflow-hidden ${
                              i === 0 ? "" : "-ml-4"
                            }`}
                          >
                            <img
                              src={src}
                              alt={`Member ${i + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))}
                      {row.members > (row.memberAvatars?.length || 0) && (
                        <div
                          className={`w-8 h-8 rounded-full bg-[#E8F8FF] text-[#00A0E3] text-[14px] font-[500] flex items-center justify-center border-2 border-white ${
                            row.memberAvatars?.length > 0 ? "-ml-4" : ""
                          }`}
                        >
                          +{row.members - (row.memberAvatars?.length || 0)}
                        </div>
                      )}
                    </div>
                  </td>

                  {/* Tasks / Hours */}
                  <td className="py-3 px-4">
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-[14px] font-[500] tracking-[1.28px] leading-[16px] text-[#5B5B5B]">
                        {row.tasks} / {row.hours}hrs
                      </span>
                      <button
                        onClick={() => onEdit(row)}
                        className="p-2 rounded hover:bg-gray-100 transition"
                        aria-label="Edit"
                        title="Edit"
                      >
                        <img
                          src={editIcon}
                          alt="Edit"
                          className="w-5 h-5 object-contain"
                        />
                      </button>
                      <div className="flex items-center gap-7">
                        <button
                          onClick={() => handleApprove(row.id)}
                          className="inline-flex items-center gap-2 px-3 h-[34px] rounded-md text-[16px] font-[500] tracking-[1.28px] text-white hover:brightness-110 transition"
                          style={{ backgroundColor: "#03C96F" }}
                        >
                          <img
                            src={tickIcon}
                            alt="Approve"
                            className="w-4 h-4"
                          />
                          Approve
                        </button>
                        <button
                          onClick={() => handleReject(row.id)}
                          className="inline-flex items-center gap-2 px-3 h-[34px] rounded-md text-[16px] font-[500] tracking-[1.28px] text-white hover:brightness-110 transition"
                          style={{ backgroundColor: "#F11515" }}
                        >
                          <img
                            src={crossIcon}
                            alt="Reject"
                            className="w-4 h-4"
                          />
                          Reject
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
