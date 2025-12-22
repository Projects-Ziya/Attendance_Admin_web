import { useState, useEffect } from "react";
import SearchBar from "../../components/SearchBar/SearchBar";
import StatsCard from "../../components/employee/StatsCard";
import EmployeeCard from "../../components/employee/EmployeeCard";
import { useEmployees } from "../../hooks/useEmployees";
import type { Employee } from "../../models/Employee";
import api from "../../Api/api";

// Icons
import HeadingIcon from "../../assets/images/icons/AE.svg";
import UsersIcon from "../../assets/images/icons/TE.svg";
import TrendingUpIcon from "../../assets/images/icons/AE.svg";
import TrendingDownIcon from "../../assets/images/icons/IE.svg";

const EmployeeListView = () => {
  const { employees, loading } = useEmployees();

  const [search, setSearch] = useState("");
  const [selectedDesignation, setSelectedDesignation] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [designations, setDesignations] = useState<any[]>([]);

  // ✅ Fetch designations (INSIDE component)
  useEffect(() => {
    const fetchDesignations = async () => {
      try {
        const res = await api.get("/api/list-designations/");
        setDesignations(res.data.data || []);
      } catch (err) {
        console.error("Failed to fetch designations:", err);
      }
    };
    fetchDesignations();
  }, []);

  if (loading) return <p>Loading...</p>;

  // ✅ SAFE FILTER (THIS FIXES BLANK LIST)
  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch =
      !search ||
      emp.name?.toLowerCase().includes(search.toLowerCase());

    const matchesDesignation =
      !selectedDesignation ||
      emp.designation?.trim() === selectedDesignation.trim();

    const matchesStatus =
      !selectedStatus || emp.status === selectedStatus;

    return matchesSearch && matchesDesignation && matchesStatus;
  });

  // Group by department
  const groupedByDepartment = filteredEmployees.reduce((acc, emp) => {
    const dept = emp.department || "Unknown";
    if (!acc[dept]) acc[dept] = [];
    acc[dept].push(emp);
    return acc;
  }, {} as Record<string, Employee[]>);

  const totalEmployees = employees.length;
  const activeEmployees = employees.filter(e => e.status === "Active").length;
  const inactiveEmployees = employees.filter(e => e.status === "Inactive").length;

  return (
    <div className="p-6 bg-[#F6F5FA] min-h-screen">

      {/* Heading */}
      <div className="flex items-center mb-7">
        <img src={HeadingIcon} className="w-6 h-6 mr-3" />
        <h2 className="text-lg font-semibold text-ziyablack">
          Total Active Members
        </h2>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-6 mb-6">
        <StatsCard title="Total Employees" value={totalEmployees} icon={<img src={UsersIcon} />} />
        <StatsCard title="Active Employees" value={activeEmployees} icon={<img src={TrendingUpIcon} />} />
        <StatsCard title="Inactive Employees" value={inactiveEmployees} icon={<img src={TrendingDownIcon} />} />
      </div>

      {/* Filters */}
      <div className="flex justify-between bg-white rounded-t-[10px] shadow-sm p-4">
        <SearchBar value={search} onSearch={setSearch} />
        <div className="flex gap-3">
          <select
            className="border rounded-lg px-3 py-2 w-60"
            value={selectedDesignation}
            onChange={(e) => setSelectedDesignation(e.target.value)}
          >
            <option value="">Designation</option>
            {designations.map((d) => (
              <option key={d.id} value={d.title}>
                {d.title}
              </option>
            ))}
          </select>

          <select
            className="border rounded-lg px-3 py-2 w-60"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value="">Select Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* ✅ TABLE HEADER (NOT REMOVED) */}
      <div className="grid grid-cols-[190px_1.4fr_1.4fr_1fr_115px] bg-[#F4F4F4] font-semibold px-4 py-4">
        <div>Employee ID</div>
        <div>Employee Name</div>
        <div>Email</div>
        <div>Phone Number</div>
        <div>Status</div>
      </div>

      {/* Employee List */}
      <div className="bg-white rounded-b-[10px] shadow">
        {Object.entries(groupedByDepartment).map(([dept, emps]) => (
          <div key={dept} className="px-4 pt-4">
            <h2 className="text-ziyablue font-medium">{dept}</h2>
            {emps.map((emp) => (
              <EmployeeCard key={emp.id} employee={emp} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployeeListView;
