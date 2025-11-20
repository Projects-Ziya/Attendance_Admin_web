import React, { useState } from "react";
import { Eye, ChevronDown } from "lucide-react";
import PayrollSlip from "../../components/PayrollManagementSystem/PayrollSlip";
import toast from "react-hot-toast";
const months = [
  "All",
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const MyPayrollSlip = ({ showSlip, setShowSlip }) => {
  const [selectedMonth, setSelectedMonth] = useState("");

 const handleViewSlip = () => {
  if (!selectedMonth) {
    toast.error("Please select a month!",{id: "unique-toast-id",});
    
    return;               // ❗ Stop here — do NOT show the slip
  }

  setShowSlip(true);       // ✔ Show slip only if month selected
};


  return (
    <>
      <div className="bg-[#E8F5FF] rounded-md p-6 mb-10">
        <h2 className="text-[#00A0E3] font-medium text-base mb-4 leading-4 tracking-[0.08em]">
          My Payroll Slip
        </h2>

        <div className="flex items-center gap-4">
          <div className="flex items-center bg-white border border-gray-200 rounded-full px-4 py-2 text-sm text-gray-700">
            <select
              className="bg-transparent focus:outline-none cursor-pointer text-sm appearance-none [-moz-appearance:none] [-webkit-appearance:none]"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
            >
              <option value="" disabled>
                Select Month
              </option>

              {months.map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>

            <ChevronDown size={16} className="ml-2 text-gray-500" />
          </div>

          <button
            className="flex items-center gap-2 bg-white border border-gray-200 rounded-full px-5 py-2 text-sm text-gray-700 hover:bg-gray-50"
            onClick={handleViewSlip}
          >
            <Eye size={16} />
            <span>View Payroll Slip</span>
          </button>
        </div>
      </div>

      {/* Show slip only when parent showSlip = true */}
      {showSlip && (
        <div className="mt-4">
          <PayrollSlip month={selectedMonth} />
        </div>
      )}
    </>
  );
};

export default MyPayrollSlip;
