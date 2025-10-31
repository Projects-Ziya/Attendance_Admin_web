import React, { useState, useEffect } from "react";
import RehireModal from "../../components/quickActionPanel/ReHireModal";
import NotificationSuccess from "./NotificationSuccess";
import type { Employee } from "../../models/quickActionPanel/Employee";
import api from "../../Api/api";

type ListProps = {
  searchTerm: string;
  statusFilter: string;
};

const List = ({ searchTerm = "", statusFilter = "" }: ListProps) => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [isRehireModalOpen, setIsRehireModalOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  // ✅ Fetch inactive employees (default)
  const fetchInactiveEmployees = async () => {
    try {
      const response = await api.get("/api/inactive-employees-list/");
      if (response.data?.success && Array.isArray(response.data.data)) {
        const mappedData: Employee[] = response.data.data.map((item: any) => ({
          id: item.employee_id || item.id, // 🔥 fixed here
          name: `${item.first_name} ${item.last_name}`,
          designation: item.designation,
          status: item.emp_status,
          exitDate: item.emp_exit_date,
          avatarUrl: item.profile_pic,
          description: item.department || "",
        }));
        setEmployees(mappedData);
      }
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  // ✅ Fetch employees by search API
  const fetchSearchedEmployees = async (letters: string) => {
    try {
      const response = await api.get(`/api/search-inactive-employees/?letters=${letters}`);
      if (response.data?.success && Array.isArray(response.data.data)) {
        const mappedData: Employee[] = response.data.data.map((item: any) => ({
          id: item.employee_id || item.id, // 🔥 fixed here
          name: `${item.first_name} ${item.last_name}`,
          designation: item.designation,
          status: item.emp_status,
          exitDate: item.emp_exit_date,
          avatarUrl: item.profile_pic,
          description: item.department || "",
        }));
        setEmployees(mappedData);
      } else {
        setEmployees([]);
      }
    } catch (error) {
      console.error("Error searching employees:", error);
      setEmployees([]);
    }
  };

  // ✅ Decide whether to use search API or normal API
  useEffect(() => {
    if (searchTerm.trim().length > 0) {
      fetchSearchedEmployees(searchTerm);
    } else {
      fetchInactiveEmployees();
    }
  }, [searchTerm]);

  const filteredEmployees = (employees || []).filter((emp) => {
    const matchesStatus = statusFilter ? emp?.status === statusFilter : true;
    return matchesStatus;
  });

  if (filteredEmployees.length === 0) {
    return (
      <div className="text-[#4D4D4D] text-[1.125rem] pt-4 pl-[2.5rem]">
        No employee found.
      </div>
    );
  }

  const handleOpenRehire = (employee: Employee) => {
    setSelectedEmployee(employee);
    setIsRehireModalOpen(true);
  };

  // ✅ Rehire API call
  const handleConfirmRehire = async () => {
    if (!selectedEmployee?.id) {
      alert("Employee ID not found.");
      return;
    }

    try {
      console.log("Sending rehire request for ID:", selectedEmployee.id);
      const response = await api.post("/api/employee-reactivate/", {
        employee_id: selectedEmployee.id,
      });

      console.log("Rehire response:", response.data);

      if (response.data?.success) {
        setEmployees((prev) => prev.filter((emp) => emp.id !== selectedEmployee.id));
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 3000);
      } else {
        console.error("Rehire failed:", response.data);
        alert("Failed to rehire employee. Please try again.");
      }
    } catch (error) {
      console.error("Error rehiring employee:", error);
      alert("Error rehiring employee. Please try again.");
    } finally {
      setIsRehireModalOpen(false);
    }
  };

  return (
    <div className="bg-[#FCFCFC] shadow-metrics w-[1469px]">
      <div className="overflow-x-auto w-full">
        <table className="min-w-[43.75rem] w-full border-collapse">
          <thead className="text-[#4D4D4D] bg-[#F4F4F4] h-[3.688rem] text-[1.125rem]">
            <tr>
              <th className="text-left pl-[2.438rem] py-3">Employee Name</th>
              <th className="text-left px-8 py-3">Exit Date</th>
              <th className="text-left px-7 py-3">Designation</th>
              <th className="text-left pl-[3.438rem] px-6 py-3">Status</th>
            </tr>
          </thead>

          <tbody>
            {filteredEmployees.map((emp) => (
              <tr key={emp?.id} className="border-t">
                <td className="pl-[2.5rem] px-10 py-4 text-[#4D4D4D] text-[1.125rem] font-semibold">
                  <div className="flex items-center gap-[1.75rem]">
                    {emp?.avatarUrl && (
                      <img
                        src={emp.avatarUrl}
                        alt={emp?.name}
                        className="w-8 h-8 rounded-full flex-shrink-0"
                      />
                    )}
                    <span className="whitespace-nowrap sm:whitespace-normal truncate block">
                      {emp?.name}
                    </span>
                  </div>
                </td>

                <td className="px-8 py-4 text-[#5B5B5B] text-[1.125rem]">
                  <span className="whitespace-nowrap sm:whitespace-normal">{emp?.exitDate}</span>
                </td>

                <td className="px-8 py-4 text-[#4D4D4D] text-[1.125rem]">
                  <span className="whitespace-nowrap sm:whitespace-normal">{emp?.designation}</span>
                </td>

                <td className="px-6 pl-[4.063rem] py-5">
                  <div className="flex items-center">
                    <span
                      className={`w-[17.375rem] flex-shrink-0 pt-[1.125rem] pl-4 rounded-md font-medium text-[1rem] ${
                        emp?.status === "Resigned"
                          ? "bg-[#E7F1FF] text-[#237EFF] h-[4.688rem]"
                          : emp?.status === "Terminated"
                          ? "bg-[#FFF5E7] text-[#FFB651] h-[4.688rem]"
                          : emp?.status === "Retired"
                          ? "bg-[#EEFFEE] text-[#45BB45] h-[6rem]"
                          : "bg-[#F6E7FF] text-[#BC53FF] h-[6rem]"
                      }`}
                    >
                      <div className="flex flex-col justify-between h-full">
                        <span className="block">{emp?.status}</span>
                        <span className="block pb-[1.125rem] text-[0.875rem] leading-[1.313rem] tracking-[0.09em] font-normal">
                          {emp?.description}
                        </span>
                      </div>
                    </span>

                    <div className="flex gap-[1.25rem] pl-[3.625rem]">
                      <button
                        onClick={() => handleOpenRehire(emp)}
                        className="bg-[#03C96F] text-white rounded h-[2.188rem] px-4 text-[1rem] font-medium tracking-[0.08em]"
                      >
                        Rehire
                      </button>
                      <button className="border border-[#D9D9D9] font-[400] tracking-[0.08em] text-[#909090] rounded h-[2.188rem] px-4 text-[1rem]">
                        View Records
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Rehire Modal */}
      {selectedEmployee && (
        <RehireModal
          isOpen={isRehireModalOpen}
          onClose={() => setIsRehireModalOpen(false)}
          onConfirm={handleConfirmRehire}
          employeeName={selectedEmployee?.name || ""}
          employeeRole={selectedEmployee?.designation || ""}
          employeeId={selectedEmployee?.id?.toString() || ""}
          employeeImage={selectedEmployee?.avatarUrl || "/default-avatar.png"}
        />
      )}

      {/* Notification */}
      {showNotification && (
        <NotificationSuccess
          message={`${selectedEmployee?.name} rehired successfully`}
          onClose={() => setShowNotification(false)}
        />
      )}
    </div>
  );
};

export default List;
