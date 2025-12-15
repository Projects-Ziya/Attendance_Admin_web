import React, { useEffect, useState } from "react";
import { FingerPrintIcon, PencilIcon } from "@heroicons/react/16/solid";
import { User2Icon } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../Api/api";

// ✅ Row Subcomponent
const Row: React.FC<{ label: string; value?: any }> = ({ label, value }) => {
  let displayValue: string;

  if (value === null || value === undefined || value === "") {
    displayValue = "—";
  } else if (typeof value === "object") {
    if (value.bank_name || value.acc_no) {
      displayValue = `${value.bank_name ?? "Unknown Bank"} • ${value.acc_no ?? "N/A"}`;
    } else {
      displayValue = JSON.stringify(value);
    }
  } else {
    displayValue = String(value);
  }


  

  return (
    <div className="grid grid-cols-[100px_15px_1fr] text-sm items-start leading-6">
      <span className="text-gray-700">{label}</span>
      <span className="text-gray-400">:</span>
      <span className="font-sm text-[13px] text-gray-400">{displayValue}</span>
    </div>
  );
};





const EmployeeProfileCard: React.FC = () => {
   const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // ✅ State Definitions
  const [data, setData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ✅ API Call
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/api/employee-detail-with-leave/${id}/`);
        if (response?.data?.data) {
          setData(response.data.data);
        } else {
          throw new Error("Invalid API response");
        }
      } catch (err: any) {
        console.error("Error fetching details:", err);
        setError(err.message || "Failed to fetch employee details");
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchData();
  }, [id]);

  // ✅ Render States
  if (loading)
    return (
      <div className="bg-white rounded-md shadow p-6 text-center text-gray-500">
        Loading employee details...
      </div>
    );

  if (error)
    return (
      <div className="bg-white rounded-md shadow p-6 text-center text-red-500">
        {error}
      </div>
    );

  if (!data)
    return (
      <div className="bg-white rounded-md shadow p-6 text-center text-gray-500">
        No data available
      </div>
    );

  // ✅ Main Render
  return (
    <div className="bg-white rounded-lg shadow p-5">
      <div className="flex flex-col md:flex-row gap-6 items-start">
        {/* Avatar Section */}
        <div>
          <div className="w-[170px] h-[170px] rounded-full overflow-hidden border">
            {data.profile_pic ? (
              <img
                src={`http://192.168.1.12:8000${data.profile_pic}`}
                alt="avatar"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-500 text-xl font-semibold">
                {data.first_name?.[0] ?? ""}
                {data.last_name?.[0] ?? ""}
              </div>
            )}
          </div>

          <div className="flex flex-col items-center justify-center mt-7">
            <div>
              <button className="px-4 py-1.5 text-xs flex items-center gap-2">
                <FingerPrintIcon className="h-4 w-4 text-[#00A0E3]" />
                Leave Today
              </button>
            </div>
           <button
    className="mt-3 px-5 py-1 text-xs rounded-md bg-[#00A0E3] text-white hover:bg-[#00A0F3] transition flex items-center gap-2"
    onClick={() => navigate(`/modifyprofile/Editprofile/${id}`)}
  >
    <div className="relative w-5 h-5">
      <User2Icon className="absolute top-0 left-0 h-5 w-5 text-white" />
      <PencilIcon className="absolute bottom-0 right-0 h-3 w-3 text-blue-300" />
    </div>
    Modify Profile
  </button>
          </div>
        </div>

        {/* Employee Details */}
        <div className="ml-4 w-full">
          <div className="mb-4">
            <h2 className="text-lg font-medium text-gray-700 flex mb-1 items-center">
              {data.first_name} {data.last_name}
              <span className="text-xs font-medium text-[#94C21A] px-2 py-0.5 rounded ml-2">
                {data.job_type || "WFO"}
              </span>
            </h2>

            <div className="flex gap-1 items-center">
              <p className="text-gray-700 text-md w-28">Employee ID</p>
              <span className="text-gray-700">:</span>
              <p className="text-gray-700 text-md ml-1">{data.employee_id}</p>
            </div>

            <div className="flex gap-1 items-center">
              <p className="text-gray-600 text-sm w-28">Email ID</p>
              <span className="text-gray-600">:</span>
              <p className="text-gray-500 text-sm ml-1">{data.email}</p>
            </div>
          </div>

          <hr className="border-[#43C8FF]" />

          <div className="grid grid-cols-3 gap-6 text-left mt-6">
            {/* Personal Info */}
            <div className="space-y-1">
              <Row label="Ph. No" value={data.phone} />
              <Row label="Emg. No" value={data.emergency_contact} />
              <Row label="Addr." value={data.address} />
              <Row label="Gen." value={data.gender} />
              <Row label="D.O.B." value={data.dob} />
              <Row label="Nat." value={data.nationality} />
              <Row label="BG" value={data.blood_group} />
            </div>

            {/* Job Info */}
            <div className="space-y-1">
              <Row label="Job Type" value={data.job_type} />
              <Row label="Designation" value={data.designation} />
              <Row label="Department" value={data.department} />
              <Row label="User Type" value={data.user_type} />
              <Row label="Salary" value={data.salary ? `₹${data.salary}` : "—"} />
              <Row label="Emp. Status" value={data.emp_status} />
            </div>

            {/* Bank Info */}
            <div className="space-y-1">
              <Row label="Bank" value={data.bank_details?.[0]?.bank_name ?? "—"} />
              <Row label="Attach. Docs" value="—" />
              <Row label="Worked Days" value={data.workeddays} />
              <Row label="Leaves Left" value={data.total_leaves} />
              <Row label="Loss of Pay" value={data.lossofpay} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeProfileCard;
